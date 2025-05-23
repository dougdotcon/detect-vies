// Padrões e indicadores de viés para análise local
// Usado como fallback quando APIs não estão disponíveis

const BiasPatterns = {
    // Palavras que indicam possível viés ou sensacionalismo
    suspiciousWords: [
        // Sensacionalismo
        'exclusivo', 'bombástico', 'chocante', 'inacreditável', 'surpreendente',
        'revolucionário', 'histórico', 'sem precedentes', 'nunca visto',
        
        // Teorias conspiratórias
        'mídia não mostra', 'eles não querem que você saiba', 'verdade oculta',
        'conspiração', 'fake news', 'mídia mainstream', 'grande mídia',
        'elite global', 'nova ordem mundial',
        
        // Linguagem polarizada
        'sempre', 'nunca', 'todos', 'ninguém', 'obviamente', 'claramente',
        'sem dúvida', 'é óbvio que', 'todo mundo sabe',
        
        // Apelos emocionais excessivos
        'terrível', 'horrível', 'devastador', 'catastrófico', 'apocalíptico',
        'milagroso', 'fantástico', 'incrível',
        
        // Linguagem não científica
        'cientistas descobriram', 'estudos mostram', 'pesquisas comprovam',
        'especialistas afirmam', 'médicos recomendam'
    ],

    // Padrões de linguagem que indicam viés
    biasPatterns: [
        {
            pattern: /\b(sempre|nunca|todos|ninguém)\b/gi,
            type: 'generalization',
            severity: 'medium',
            description: 'Generalizações absolutas'
        },
        {
            pattern: /\b(obviamente|claramente|é óbvio que|sem dúvida)\b/gi,
            type: 'assumption',
            severity: 'medium',
            description: 'Apresentação de opiniões como fatos'
        },
        {
            pattern: /\b(dizem que|alguns afirmam|há quem diga)\b/gi,
            type: 'vague_attribution',
            severity: 'high',
            description: 'Atribuições vagas sem fontes específicas'
        },
        {
            pattern: /\b(exclusivo|bombástico|chocante|inacreditável)\b/gi,
            type: 'sensationalism',
            severity: 'high',
            description: 'Linguagem sensacionalista'
        },
        {
            pattern: /\b(fake news|mídia mainstream|grande mídia)\b/gi,
            type: 'media_distrust',
            severity: 'medium',
            description: 'Desconfiança generalizada da mídia'
        }
    ],

    // Indicadores de credibilidade positiva
    credibilityIndicators: [
        {
            pattern: /\b(segundo|de acordo com|conforme|baseado em)\b/gi,
            type: 'attribution',
            score: 2,
            description: 'Atribuição adequada de fontes'
        },
        {
            pattern: /\b(estudo publicado|pesquisa da|dados do|relatório)\b/gi,
            type: 'data_reference',
            score: 3,
            description: 'Referência a dados e estudos'
        },
        {
            pattern: /\b(professor|doutor|especialista em|pesquisador)\b/gi,
            type: 'expert_source',
            score: 2,
            description: 'Citação de especialistas qualificados'
        },
        {
            pattern: /\b(universidade|instituto|ministério|secretaria)\b/gi,
            type: 'institutional_source',
            score: 2,
            description: 'Fontes institucionais'
        }
    ],

    // Análise de estrutura do texto
    structureAnalysis: {
        // Proporção ideal de diferentes elementos
        idealRatios: {
            facts: 0.6,      // 60% fatos
            opinions: 0.3,   // 30% opiniões
            speculation: 0.1 // 10% especulação
        },
        
        // Indicadores de estrutura problemática
        redFlags: [
            'Muitas exclamações (!!!)',
            'Uso excessivo de maiúsculas',
            'Parágrafos muito longos sem quebras',
            'Ausência de fontes citadas',
            'Linguagem muito informal para notícia'
        ]
    },

    // Categorias de viés
    biasTypes: {
        'confirmation': {
            name: 'Viés de Confirmação',
            description: 'Apresenta apenas informações que confirmam uma visão pré-existente'
        },
        'selection': {
            name: 'Viés de Seleção',
            description: 'Escolhe seletivamente fatos que apoiam uma narrativa'
        },
        'framing': {
            name: 'Viés de Enquadramento',
            description: 'Apresenta informações de forma a influenciar a interpretação'
        },
        'emotional': {
            name: 'Apelo Emocional',
            description: 'Usa linguagem emocional para influenciar em vez de informar'
        },
        'false_balance': {
            name: 'Falso Equilíbrio',
            description: 'Apresenta lados "iguais" quando há consenso científico'
        }
    },

    // Função para analisar texto localmente
    analyzeText: function(text) {
        const analysis = {
            suspiciousWords: [],
            biasPatterns: [],
            credibilityScore: 5, // Base: 5/10
            biasLevel: 'low',
            detectedBiases: []
        };

        // Verificar palavras suspeitas
        this.suspiciousWords.forEach(word => {
            if (text.toLowerCase().includes(word.toLowerCase())) {
                analysis.suspiciousWords.push(word);
                analysis.credibilityScore -= 0.5;
            }
        });

        // Verificar padrões de viés
        this.biasPatterns.forEach(pattern => {
            const matches = text.match(pattern.pattern);
            if (matches) {
                analysis.biasPatterns.push({
                    type: pattern.type,
                    severity: pattern.severity,
                    matches: matches.length,
                    description: pattern.description
                });
                
                // Reduzir pontuação baseado na severidade
                const reduction = pattern.severity === 'high' ? 1 : 0.5;
                analysis.credibilityScore -= reduction * matches.length;
            }
        });

        // Verificar indicadores positivos
        this.credibilityIndicators.forEach(indicator => {
            const matches = text.match(indicator.pattern);
            if (matches) {
                analysis.credibilityScore += indicator.score * 0.1;
            }
        });

        // Normalizar pontuação (0-10)
        analysis.credibilityScore = Math.max(0, Math.min(10, analysis.credibilityScore));

        // Determinar nível de viés
        if (analysis.credibilityScore >= 7) {
            analysis.biasLevel = 'low';
        } else if (analysis.credibilityScore >= 4) {
            analysis.biasLevel = 'medium';
        } else {
            analysis.biasLevel = 'high';
        }

        // Identificar tipos de viés detectados
        analysis.biasPatterns.forEach(pattern => {
            if (!analysis.detectedBiases.includes(pattern.type)) {
                analysis.detectedBiases.push(pattern.type);
            }
        });

        return analysis;
    },

    // Sugestões para melhorar o texto
    getSuggestions: function(analysis) {
        const suggestions = [];

        if (analysis.suspiciousWords.length > 0) {
            suggestions.push('Considere usar linguagem mais neutra e menos sensacionalista');
        }

        if (analysis.biasPatterns.some(p => p.type === 'generalization')) {
            suggestions.push('Evite generalizações absolutas como "sempre", "nunca", "todos"');
        }

        if (analysis.biasPatterns.some(p => p.type === 'vague_attribution')) {
            suggestions.push('Cite fontes específicas em vez de usar atribuições vagas');
        }

        if (analysis.credibilityScore < 5) {
            suggestions.push('Adicione mais fontes confiáveis e dados verificáveis');
        }

        return suggestions;
    }
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BiasPatterns;
} else if (typeof window !== 'undefined') {
    window.BiasPatterns = BiasPatterns;
}
