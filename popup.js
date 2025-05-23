// Popup Script - Interface do usuário
// Gerencia a interface e comunicação com background script

class BiasDetectorPopup {
    constructor() {
        this.currentResults = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSelectedText();
        console.log('🔍 Detector de Viés - Popup carregado');
    }

    setupEventListeners() {
        // Botão de análise
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.analyzeText();
        });

        // Botão de configurações
        document.getElementById('settings-btn').addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });

        // Botão de limpar
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearResults();
        });

        // Escutar mensagens do background
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'analysisComplete') {
                this.displayResults(request.results);
            }
        });
    }

    async loadSelectedText() {
        try {
            // Tentar obter texto do background primeiro
            const response = await chrome.runtime.sendMessage({ action: 'getSelectedText' });
            
            if (response && response.text) {
                this.showAnalysisSection(response.text);
                return;
            }

            // Se não houver texto no background, tentar obter da aba ativa
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const response2 = await chrome.tabs.sendMessage(tab.id, { action: 'getSelectedText' });
            
            if (response2 && response2.text) {
                this.showAnalysisSection(response2.text);
            } else {
                this.showNoSelection();
            }

        } catch (error) {
            console.log('Nenhum texto selecionado');
            this.showNoSelection();
        }
    }

    showAnalysisSection(text) {
        document.getElementById('no-selection').classList.add('hidden');
        document.getElementById('analysis-section').classList.remove('hidden');
        
        const textContent = document.getElementById('selected-text-content');
        textContent.textContent = text.length > 200 ? text.substring(0, 200) + '...' : text;
    }

    showNoSelection() {
        document.getElementById('no-selection').classList.remove('hidden');
        document.getElementById('analysis-section').classList.add('hidden');
    }

    async analyzeText() {
        const textContent = document.getElementById('selected-text-content').textContent;
        
        if (!textContent) {
            alert('Nenhum texto selecionado para análise');
            return;
        }

        // Mostrar loading
        this.showLoading(true);
        
        try {
            // Obter informações da aba atual
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Enviar para análise
            const results = await chrome.runtime.sendMessage({
                action: 'analyzeText',
                text: textContent,
                url: tab.url,
                title: tab.title
            });

            this.showLoading(false);
            
            if (results) {
                this.displayResults(results);
            }

        } catch (error) {
            console.error('Erro na análise:', error);
            this.showLoading(false);
            this.showError('Erro ao analisar o texto. Tente novamente.');
        }
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const analyzeBtn = document.getElementById('analyze-btn');
        
        if (show) {
            loading.classList.remove('hidden');
            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analisando...';
        } else {
            loading.classList.add('hidden');
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = '🔍 Analisar Viés e Fatos';
        }
    }

    displayResults(results) {
        this.currentResults = results;
        
        if (results.error) {
            this.showError(results.message);
            return;
        }

        // Mostrar seção de resultados
        document.getElementById('results').classList.remove('hidden');
        
        // Exibir análise de viés
        this.displayBiasAnalysis(results.biasAnalysis);
        
        // Exibir verificação de fatos
        this.displayFactCheck(results.factCheck);
        
        // Exibir fontes confiáveis
        this.displayReliableSources(results.reliableSources);
    }

    displayBiasAnalysis(analysis) {
        const container = document.getElementById('bias-analysis');
        
        if (analysis.error) {
            container.innerHTML = `<p class="error">❌ ${analysis.message}</p>`;
            return;
        }

        let html = '';
        
        // Nível de viés
        if (analysis.level) {
            const levelClass = `bias-${analysis.level}`;
            const levelText = {
                'low': 'Baixo',
                'medium': 'Médio',
                'high': 'Alto'
            }[analysis.level] || analysis.level;
            
            html += `<div class="bias-level ${levelClass}">Viés: ${levelText}</div>`;
        }

        // Pontuação de credibilidade
        if (analysis.credibilityScore !== undefined) {
            html += `<p><strong>Credibilidade:</strong> ${analysis.credibilityScore}/10</p>`;
        }

        // Análise detalhada
        if (analysis.analysis) {
            html += `<p>${analysis.analysis}</p>`;
        }

        // Tipos de viés
        if (analysis.biasTypes && analysis.biasTypes.length > 0) {
            html += `<p><strong>Tipos de viés:</strong> ${analysis.biasTypes.join(', ')}</p>`;
        }

        // Palavras suspeitas
        if (analysis.suspiciousWords && analysis.suspiciousWords.length > 0) {
            html += `<p><strong>Palavras que indicam viés:</strong> ${analysis.suspiciousWords.join(', ')}</p>`;
        }

        container.innerHTML = html || '<p>Análise de viés não disponível.</p>';
    }

    displayFactCheck(factCheck) {
        const container = document.getElementById('fact-check');
        
        if (factCheck.error) {
            container.innerHTML = `<p class="error">❌ ${factCheck.message}</p>`;
            return;
        }

        let html = '';

        if (factCheck.status === 'found' && factCheck.claims) {
            html += '<div class="fact-status fact-true">✅ Verificações encontradas</div>';
            
            factCheck.claims.forEach(claim => {
                html += `
                    <div class="fact-claim">
                        <p><strong>Alegação:</strong> ${claim.text}</p>
                        <p><strong>Avaliação:</strong> ${claim.rating}</p>
                        ${claim.url ? `<a href="${claim.url}" target="_blank">Ver verificação completa</a>` : ''}
                    </div>
                `;
            });
        } else if (factCheck.status === 'local_analysis') {
            if (factCheck.suspiciousWords && factCheck.suspiciousWords.length > 0) {
                html += '<div class="fact-status fact-mixed">⚠️ Palavras suspeitas detectadas</div>';
                html += `<p><strong>Palavras suspeitas:</strong> ${factCheck.suspiciousWords.join(', ')}</p>`;
            } else {
                html += '<div class="fact-status fact-unknown">ℹ️ Nenhum indicador óbvio</div>';
            }
            html += `<p>${factCheck.message}</p>`;
        } else {
            html += '<div class="fact-status fact-unknown">ℹ️ Não verificado</div>';
            html += '<p>Nenhuma verificação de fato encontrada para este texto.</p>';
        }

        container.innerHTML = html;
    }

    displayReliableSources(sources) {
        const container = document.getElementById('reliable-sources');
        
        if (!sources) {
            container.innerHTML = '<p>Fontes não disponíveis.</p>';
            return;
        }

        let html = '';

        // Status da fonte atual
        if (sources.current && sources.current.domain) {
            const status = sources.current.isReliable ? '✅ Fonte confiável' : '⚠️ Verificar credibilidade';
            html += `<p><strong>Fonte atual (${sources.current.domain}):</strong> ${status}</p>`;
        }

        // Sugestões de fontes
        if (sources.suggestions && sources.suggestions.length > 0) {
            html += '<p><strong>Fontes confiáveis sugeridas:</strong></p>';
            
            sources.suggestions.forEach(source => {
                html += `
                    <a href="https://${source.domain}" target="_blank" class="source-item">
                        📰 ${source.name} (${source.category})
                    </a>
                `;
            });
        }

        container.innerHTML = html || '<p>Nenhuma sugestão de fonte disponível.</p>';
    }

    showError(message) {
        const container = document.getElementById('results');
        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
            </div>
        `;
    }

    clearResults() {
        document.getElementById('results').classList.add('hidden');
        document.getElementById('analysis-section').classList.add('hidden');
        document.getElementById('no-selection').classList.remove('hidden');
        this.currentResults = null;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new BiasDetectorPopup();
});
