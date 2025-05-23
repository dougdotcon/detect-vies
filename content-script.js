// Content Script - Detector de Viés e Desinformação
// Injected into all web pages to detect text selection

class BiasDetectorContent {
    constructor() {
        this.selectedText = '';
        this.selectionButton = null;
        this.init();
    }

    init() {
        this.createSelectionButton();
        this.setupEventListeners();
        console.log('🔍 Detector de Viés - Content Script carregado');
    }

    createSelectionButton() {
        this.selectionButton = document.createElement('div');
        this.selectionButton.id = 'bias-detector-button';
        this.selectionButton.innerHTML = '🔍 Analisar';
        this.selectionButton.style.cssText = `
            position: absolute;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 2px solid white;
            display: none;
            font-family: 'Segoe UI', sans-serif;
            transition: transform 0.2s;
        `;
        
        this.selectionButton.addEventListener('mouseenter', () => {
            this.selectionButton.style.transform = 'scale(1.05)';
        });
        
        this.selectionButton.addEventListener('mouseleave', () => {
            this.selectionButton.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(this.selectionButton);
    }

    setupEventListeners() {
        // Detectar seleção de texto
        document.addEventListener('mouseup', (e) => {
            setTimeout(() => this.handleTextSelection(e), 100);
        });

        // Esconder botão ao clicar fora
        document.addEventListener('mousedown', (e) => {
            if (e.target !== this.selectionButton) {
                this.hideSelectionButton();
            }
        });

        // Esconder botão ao rolar a página
        document.addEventListener('scroll', () => {
            this.hideSelectionButton();
        });

        // Clique no botão de análise
        this.selectionButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.analyzeSelectedText();
        });

        // Escutar mensagens do popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getSelectedText') {
                sendResponse({ text: this.selectedText });
            }
        });
    }

    handleTextSelection(e) {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length > 10) { // Mínimo de 10 caracteres
            this.selectedText = selectedText;
            this.showSelectionButton(e);
        } else {
            this.hideSelectionButton();
        }
    }

    showSelectionButton(e) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Posicionar o botão próximo à seleção
            const buttonX = rect.left + (rect.width / 2) - 40; // Centralizar
            const buttonY = rect.bottom + window.scrollY + 10; // Abaixo da seleção
            
            this.selectionButton.style.left = `${Math.max(10, buttonX)}px`;
            this.selectionButton.style.top = `${buttonY}px`;
            this.selectionButton.style.display = 'block';
            
            // Animação de entrada
            this.selectionButton.style.opacity = '0';
            this.selectionButton.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                this.selectionButton.style.transition = 'all 0.2s ease';
                this.selectionButton.style.opacity = '1';
                this.selectionButton.style.transform = 'scale(1)';
            }, 10);
        }
    }

    hideSelectionButton() {
        this.selectionButton.style.display = 'none';
        this.selectedText = '';
    }

    analyzeSelectedText() {
        if (!this.selectedText) return;

        // Enviar texto para análise
        chrome.runtime.sendMessage({
            action: 'analyzeText',
            text: this.selectedText,
            url: window.location.href,
            title: document.title
        });

        // Abrir popup
        chrome.runtime.sendMessage({
            action: 'openPopup'
        });

        this.hideSelectionButton();
    }

    // Método para destacar texto suspeito (futuro)
    highlightSuspiciousText(elements) {
        elements.forEach(element => {
            element.style.backgroundColor = 'rgba(255, 193, 7, 0.3)';
            element.style.borderLeft = '3px solid #ffc107';
            element.title = 'Texto com possível viés detectado';
        });
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new BiasDetectorContent();
    });
} else {
    new BiasDetectorContent();
}

// Prevenir conflitos com outros scripts
window.biasDetectorContent = BiasDetectorContent;
