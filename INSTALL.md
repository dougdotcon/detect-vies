# 📦 Guia de Instalação - Detector de Viés e Desinformação

## 🚀 Instalação Rápida

### 1. Preparação
Certifique-se de ter:
- Google Chrome versão 88 ou superior
- Chave da API OpenAI (obrigatória)
- Chave da API Google (opcional)

### 2. Download
```bash
# Opção 1: Clone o repositório
git clone https://github.com/seu-usuario/detector-vies-desinformacao.git
cd detector-vies-desinformacao

# Opção 2: Baixe o ZIP
# Baixe e extraia o arquivo ZIP do projeto
```

### 3. Instalação no Chrome

1. **Abra o Chrome** e digite na barra de endereços:
   ```
   chrome://extensions/
   ```

2. **Ative o Modo Desenvolvedor**
   - No canto superior direito, ative a opção "Modo do desenvolvedor"

3. **Carregue a Extensão**
   - Clique em "Carregar sem compactação"
   - Selecione a pasta do projeto `detector-vies-desinformacao`
   - A extensão aparecerá na lista

4. **Fixe a Extensão** (Recomendado)
   - Clique no ícone de quebra-cabeça na barra do Chrome
   - Encontre "Detector de Viés e Desinformação"
   - Clique no ícone de alfinete para fixar

## 🔑 Configuração das APIs

### OpenAI API (Obrigatória)

1. **Acesse o OpenAI Platform**
   - Vá para: https://platform.openai.com/api-keys
   - Faça login ou crie uma conta

2. **Crie uma Chave API**
   - Clique em "Create new secret key"
   - Dê um nome para a chave (ex: "Detector Viés")
   - Copie a chave (começa com `sk-`)

3. **Configure na Extensão**
   - Clique no ícone da extensão
   - Vá em "⚙️ Configurações"
   - Cole a chave no campo "OpenAI API Key"
   - Clique em "💾 Salvar Configurações"

### Google Fact Check Tools API (Opcional)

1. **Acesse o Google Cloud Console**
   - Vá para: https://console.developers.google.com/

2. **Crie ou Selecione um Projeto**
   - Clique em "Selecionar projeto" → "Novo projeto"
   - Dê um nome (ex: "Detector Viés")

3. **Ative a API**
   - No menu lateral: "APIs e serviços" → "Biblioteca"
   - Pesquise por "Fact Check Tools API"
   - Clique em "Ativar"

4. **Crie Credenciais**
   - Vá em "APIs e serviços" → "Credenciais"
   - Clique em "Criar credenciais" → "Chave de API"
   - Copie a chave (começa com `AIza`)

5. **Configure na Extensão**
   - Nas configurações da extensão
   - Cole a chave no campo "Google API Key"
   - Salve as configurações

## ✅ Teste da Instalação

1. **Teste Básico**
   - Vá para qualquer site de notícias
   - Selecione um parágrafo de texto
   - Clique no botão "🔍 Analisar" que aparece
   - O popup deve abrir com a análise

2. **Teste das APIs**
   - Nas configurações, clique em "🧪 Testar APIs"
   - Verifique se ambas as APIs estão funcionando

3. **Teste Completo**
   - Selecione um texto controverso
   - Analise e verifique se aparecem:
     - Análise de viés
     - Verificação de fatos
     - Sugestões de fontes

## 🔧 Solução de Problemas

### Extensão não aparece
- Verifique se o "Modo desenvolvedor" está ativado
- Recarregue a extensão em `chrome://extensions/`
- Verifique se todos os arquivos estão na pasta

### Erro "Chave da API OpenAI não configurada"
- Vá nas configurações e adicione sua chave OpenAI
- Verifique se a chave está correta (começa com `sk-`)
- Teste a chave no botão "Testar APIs"

### Botão de análise não aparece
- Verifique se o texto selecionado tem mais de 10 caracteres
- Alguns sites podem bloquear scripts (CSP)
- Tente em outro site

### Análise muito lenta
- Verifique sua conexão com a internet
- APIs podem ter limites de uso
- Textos muito longos demoram mais para analisar

### Erro "Erro ao analisar o texto"
- Verifique se as chaves das APIs estão corretas
- Verifique se você tem créditos nas APIs
- Tente novamente em alguns minutos

## 📱 Uso em Diferentes Sites

### Sites Compatíveis
- ✅ Portais de notícias (G1, Folha, etc.)
- ✅ Redes sociais (Twitter, Facebook)
- ✅ Blogs e sites pessoais
- ✅ Wikipedia e sites educacionais

### Sites com Limitações
- ⚠️ Sites com CSP muito restritivo
- ⚠️ Aplicações single-page complexas
- ⚠️ Sites que carregam conteúdo dinamicamente

## 🔄 Atualizações

### Atualização Manual
1. Baixe a nova versão
2. Substitua os arquivos antigos
3. Vá em `chrome://extensions/`
4. Clique no ícone de recarregar da extensão

### Verificar Versão
- Nas configurações da extensão
- Seção "Sobre" mostra a versão atual

## 🆘 Suporte

### Problemas Comuns
- Consulte a seção "Solução de Problemas" acima
- Verifique o [README.md](README.md) para mais detalhes

### Reportar Bugs
- Abra uma issue no GitHub
- Inclua:
  - Versão do Chrome
  - Versão da extensão
  - Passos para reproduzir o erro
  - Mensagens de erro (se houver)

### Contato
- **GitHub Issues**: [Link para issues]
- **Email**: suporte@detectorvies.com
- **Documentação**: [Wiki do projeto]

## 🎯 Próximos Passos

Após a instalação:
1. **Explore as configurações** para personalizar a experiência
2. **Teste em diferentes tipos de texto** para entender o funcionamento
3. **Verifique as estatísticas** para acompanhar seu uso
4. **Compartilhe feedback** para melhorarmos a extensão

---

**🎉 Parabéns! Sua extensão está pronta para detectar vieses e verificar fatos!**
