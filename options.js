// Options Script - Página de configurações
// Gerencia configurações da extensão

class BiasDetectorOptions {
    constructor() {
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.loadStatistics();
        console.log('⚙️ Detector de Viés - Configurações carregadas');
    }

    setupEventListeners() {
        // Salvar configurações
        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });

        // Testar APIs
        document.getElementById('test-apis').addEventListener('click', () => {
            this.testAPIs();
        });

        // Restaurar padrões
        document.getElementById('reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });

        // Validação em tempo real
        document.getElementById('openai-api-key').addEventListener('input', (e) => {
            this.validateApiKey(e.target, 'openai');
        });

        document.getElementById('google-api-key').addEventListener('input', (e) => {
            this.validateApiKey(e.target, 'google');
        });
    }

    async loadSettings() {
        try {
            const settings = await this.getStoredSettings();
            
            // Carregar valores nos campos
            document.getElementById('openai-api-key').value = settings.openaiApiKey || '';
            document.getElementById('google-api-key').value = settings.googleApiKey || '';
            document.getElementById('analysis-level').value = settings.analysisLevel || 'medium';
            document.getElementById('auto-highlight').checked = settings.autoHighlight || false;
            document.getElementById('show-notifications').checked = settings.showNotifications || false;

        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            this.showStatus('Erro ao carregar configurações', 'error');
        }
    }

    async saveSettings() {
        try {
            const settings = {
                openaiApiKey: document.getElementById('openai-api-key').value.trim(),
                googleApiKey: document.getElementById('google-api-key').value.trim(),
                analysisLevel: document.getElementById('analysis-level').value,
                autoHighlight: document.getElementById('auto-highlight').checked,
                showNotifications: document.getElementById('show-notifications').checked,
                lastUpdated: new Date().toISOString()
            };

            // Validar chave OpenAI obrigatória
            if (!settings.openaiApiKey) {
                this.showStatus('Chave da API OpenAI é obrigatória', 'error');
                return;
            }

            // Salvar no storage
            await chrome.storage.sync.set(settings);
            
            this.showStatus('Configurações salvas com sucesso!', 'success');
            
            // Atualizar estatísticas
            this.updateStatistic('settings_saved');

        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            this.showStatus('Erro ao salvar configurações', 'error');
        }
    }

    async testAPIs() {
        this.showStatus('Testando APIs...', 'info');
        
        try {
            const settings = await this.getStoredSettings();
            
            if (!settings.openaiApiKey) {
                this.showStatus('Configure a chave da API OpenAI primeiro', 'error');
                return;
            }

            // Testar OpenAI API
            const openaiTest = await this.testOpenAI(settings.openaiApiKey);
            
            // Testar Google API (se configurada)
            let googleTest = { success: true, message: 'Não configurada (opcional)' };
            if (settings.googleApiKey) {
                googleTest = await this.testGoogleAPI(settings.googleApiKey);
            }

            // Mostrar resultados
            let message = `OpenAI: ${openaiTest.message}\nGoogle: ${googleTest.message}`;
            let type = (openaiTest.success && googleTest.success) ? 'success' : 'error';
            
            this.showStatus(message, type);

        } catch (error) {
            console.error('Erro ao testar APIs:', error);
            this.showStatus('Erro ao testar APIs', 'error');
        }
    }

    async testOpenAI(apiKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (response.ok) {
                return { success: true, message: '✅ Conectada' };
            } else {
                return { success: false, message: '❌ Chave inválida' };
            }

        } catch (error) {
            return { success: false, message: '❌ Erro de conexão' };
        }
    }

    async testGoogleAPI(apiKey) {
        try {
            const response = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=test&key=${apiKey}`);
            
            if (response.ok) {
                return { success: true, message: '✅ Conectada' };
            } else {
                return { success: false, message: '❌ Chave inválida' };
            }

        } catch (error) {
            return { success: false, message: '❌ Erro de conexão' };
        }
    }

    async resetSettings() {
        if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
            try {
                await chrome.storage.sync.clear();
                
                // Recarregar valores padrão
                document.getElementById('openai-api-key').value = '';
                document.getElementById('google-api-key').value = '';
                document.getElementById('analysis-level').value = 'medium';
                document.getElementById('auto-highlight').checked = false;
                document.getElementById('show-notifications').checked = false;

                this.showStatus('Configurações restauradas para o padrão', 'success');

            } catch (error) {
                console.error('Erro ao restaurar configurações:', error);
                this.showStatus('Erro ao restaurar configurações', 'error');
            }
        }
    }

    validateApiKey(input, type) {
        const value = input.value.trim();
        
        // Remover classes anteriores
        input.classList.remove('valid', 'invalid');
        
        if (!value) {
            return;
        }

        // Validação básica do formato
        let isValid = false;
        
        if (type === 'openai') {
            isValid = value.startsWith('sk-') && value.length > 20;
        } else if (type === 'google') {
            isValid = value.startsWith('AIza') && value.length > 20;
        }

        // Aplicar classe visual
        input.classList.add(isValid ? 'valid' : 'invalid');
    }

    async loadStatistics() {
        try {
            const stats = await this.getStoredStatistics();
            
            document.getElementById('total-analyses').textContent = stats.totalAnalyses || 0;
            document.getElementById('bias-detected').textContent = stats.biasDetected || 0;
            document.getElementById('facts-checked').textContent = stats.factsChecked || 0;

        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }

    async updateStatistic(type) {
        try {
            const stats = await this.getStoredStatistics();
            
            switch (type) {
                case 'analysis_completed':
                    stats.totalAnalyses = (stats.totalAnalyses || 0) + 1;
                    break;
                case 'bias_detected':
                    stats.biasDetected = (stats.biasDetected || 0) + 1;
                    break;
                case 'fact_checked':
                    stats.factsChecked = (stats.factsChecked || 0) + 1;
                    break;
                case 'settings_saved':
                    stats.settingsSaved = (stats.settingsSaved || 0) + 1;
                    break;
            }

            await chrome.storage.local.set({ statistics: stats });
            this.loadStatistics(); // Recarregar display

        } catch (error) {
            console.error('Erro ao atualizar estatística:', error);
        }
    }

    showStatus(message, type) {
        const statusElement = document.getElementById('status-message');
        
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        statusElement.classList.remove('hidden');

        // Auto-esconder após 5 segundos
        setTimeout(() => {
            statusElement.classList.add('hidden');
        }, 5000);
    }

    async getStoredSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get({
                openaiApiKey: '',
                googleApiKey: '',
                analysisLevel: 'medium',
                autoHighlight: false,
                showNotifications: false
            }, resolve);
        });
    }

    async getStoredStatistics() {
        return new Promise((resolve) => {
            chrome.storage.local.get({
                statistics: {
                    totalAnalyses: 0,
                    biasDetected: 0,
                    factsChecked: 0,
                    settingsSaved: 0
                }
            }, (result) => {
                resolve(result.statistics);
            });
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new BiasDetectorOptions();
});

// CSS adicional para validação
const style = document.createElement('style');
style.textContent = `
    input.valid {
        border-color: #28a745 !important;
        background-color: #f8fff9;
    }
    
    input.invalid {
        border-color: #dc3545 !important;
        background-color: #fff8f8;
    }
`;
document.head.appendChild(style);
