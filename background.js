// Background Script - Service Worker para APIs
// Gerencia chamadas para OpenAI e Google Fact Check Tools

class BiasDetectorBackground {
    constructor() {
        this.selectedText = '';
        this.analysisResults = {};
        this.init();
    }

    init() {
        this.setupMessageListeners();
        this.setupContextMenu();
        console.log('🔍 Detector de Viés - Background Script carregado');
    }

    setupMessageListeners() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'analyzeText':
                    this.handleTextAnalysis(request, sendResponse);
                    return true; // Manter canal aberto para resposta assíncrona
                
                case 'getAnalysisResults':
                    sendResponse(this.analysisResults);
                    break;
                
                case 'openPopup':
                    chrome.action.openPopup();
                    break;
                
                case 'getSelectedText':
                    sendResponse({ text: this.selectedText });
                    break;
            }
        });
    }

    setupContextMenu() {
        chrome.contextMenus.create({
            id: 'analyze-bias',
            title: '🔍 Analisar viés e fatos',
            contexts: ['selection']
        });

        chrome.contextMenus.onClicked.addListener((info, tab) => {
            if (info.menuItemId === 'analyze-bias' && info.selectionText) {
                this.selectedText = info.selectionText;
                this.handleTextAnalysis({
                    text: info.selectionText,
                    url: tab.url,
                    title: tab.title
                });
                chrome.action.openPopup();
            }
        });
    }

    async handleTextAnalysis(request, sendResponse) {
        try {
            this.selectedText = request.text;
            
            // Iniciar análises em paralelo
            const [biasAnalysis, factCheck, reliableSources] = await Promise.all([
                this.analyzeBias(request.text),
                this.checkFacts(request.text),
                this.getReliableSources(request.text, request.url)
            ]);

            this.analysisResults = {
                text: request.text,
                url: request.url,
                title: request.title,
                timestamp: new Date().toISOString(),
                biasAnalysis,
                factCheck,
                reliableSources
            };

            if (sendResponse) {
                sendResponse(this.analysisResults);
            }

            // Notificar popup se estiver aberto
            chrome.runtime.sendMessage({
                action: 'analysisComplete',
                results: this.analysisResults
            }).catch(() => {
                // Popup pode não estar aberto, ignorar erro
            });

        } catch (error) {
            console.error('Erro na análise:', error);
            const errorResult = {
                error: true,
                message: 'Erro ao analisar o texto. Verifique sua conexão e tente novamente.'
            };
            
            if (sendResponse) {
                sendResponse(errorResult);
            }
        }
    }

    async analyzeBias(text) {
        try {
            const settings = await this.getSettings();
            
            if (!settings.openaiApiKey) {
                return {
                    error: true,
                    message: 'Chave da API OpenAI não configurada. Acesse as configurações.'
                };
            }

            const prompt = `Analise o seguinte texto em português brasileiro para detectar possíveis vieses:

"${text}"

Forneça uma análise estruturada incluindo:
1. Nível de viés (baixo/médio/alto)
2. Tipos de viés identificados
3. Palavras ou frases que indicam viés
4. Sugestões para uma linguagem mais neutra
5. Pontuação de credibilidade (0-10)

Responda em formato JSON estruturado.`;

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é um especialista em análise de discurso e detecção de vieses em textos jornalísticos e posts de redes sociais. Seja preciso e objetivo.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.3
                })
            });

            if (!response.ok) {
                throw new Error(`Erro da API OpenAI: ${response.status}`);
            }

            const data = await response.json();
            const analysisText = data.choices[0].message.content;
            
            // Tentar parsear JSON, se falhar, retornar texto simples
            try {
                return JSON.parse(analysisText);
            } catch {
                return {
                    level: 'medium',
                    analysis: analysisText,
                    credibilityScore: 5
                };
            }

        } catch (error) {
            console.error('Erro na análise de viés:', error);
            return {
                error: true,
                message: 'Erro ao analisar viés. Verifique sua chave da API.'
            };
        }
    }

    async checkFacts(text) {
        try {
            const settings = await this.getSettings();
            
            // Usar Google Fact Check Tools API
            const query = encodeURIComponent(text.substring(0, 200)); // Limitar query
            const apiKey = settings.googleApiKey || 'demo'; // Usar demo se não configurado
            
            const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                // Se API falhar, usar análise local básica
                return this.basicFactCheck(text);
            }

            const data = await response.json();
            
            if (data.claims && data.claims.length > 0) {
                return {
                    status: 'found',
                    claims: data.claims.slice(0, 3).map(claim => ({
                        text: claim.text,
                        claimant: claim.claimant,
                        rating: claim.claimReview?.[0]?.textualRating || 'Não avaliado',
                        url: claim.claimReview?.[0]?.url
                    }))
                };
            } else {
                return {
                    status: 'not_found',
                    message: 'Nenhuma verificação de fato encontrada para este texto.'
                };
            }

        } catch (error) {
            console.error('Erro na verificação de fatos:', error);
            return this.basicFactCheck(text);
        }
    }

    basicFactCheck(text) {
        // Análise básica local quando APIs não estão disponíveis
        const suspiciousWords = [
            'exclusivo', 'bombástico', 'chocante', 'inacreditável',
            'mídia não mostra', 'eles não querem que você saiba',
            'verdade oculta', 'conspiração', 'fake news'
        ];

        const foundSuspicious = suspiciousWords.filter(word => 
            text.toLowerCase().includes(word.toLowerCase())
        );

        return {
            status: 'local_analysis',
            suspiciousWords: foundSuspicious,
            message: foundSuspicious.length > 0 
                ? 'Texto contém palavras que podem indicar desinformação'
                : 'Nenhum indicador óbvio de desinformação detectado'
        };
    }

    async getReliableSources(text, currentUrl) {
        // Carregar lista de fontes confiáveis
        const reliableSources = await this.loadReliableSources();
        
        // Extrair domínio da URL atual
        let currentDomain = '';
        try {
            currentDomain = new URL(currentUrl).hostname;
        } catch (e) {
            // Ignorar erro de URL inválida
        }

        // Filtrar fontes relevantes
        const relevantSources = reliableSources.filter(source => 
            source.domain !== currentDomain
        ).slice(0, 5);

        return {
            current: {
                domain: currentDomain,
                isReliable: reliableSources.some(s => s.domain === currentDomain)
            },
            suggestions: relevantSources
        };
    }

    async loadReliableSources() {
        // Lista básica de fontes confiáveis (pode ser expandida)
        return [
            { name: 'BBC Brasil', domain: 'bbc.com', category: 'internacional' },
            { name: 'Folha de S.Paulo', domain: 'folha.uol.com.br', category: 'nacional' },
            { name: 'G1', domain: 'g1.globo.com', category: 'nacional' },
            { name: 'Reuters', domain: 'reuters.com', category: 'internacional' },
            { name: 'Associated Press', domain: 'apnews.com', category: 'internacional' },
            { name: 'Estadão', domain: 'estadao.com.br', category: 'nacional' },
            { name: 'UOL', domain: 'uol.com.br', category: 'nacional' },
            { name: 'Agência Lupa', domain: 'lupa.news', category: 'fact-check' },
            { name: 'Aos Fatos', domain: 'aosfatos.org', category: 'fact-check' },
            { name: 'Comprova', domain: 'projetocomprova.com.br', category: 'fact-check' }
        ];
    }

    async getSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get({
                openaiApiKey: '',
                googleApiKey: '',
                analysisLevel: 'medium'
            }, resolve);
        });
    }
}

// Inicializar background script
new BiasDetectorBackground();
