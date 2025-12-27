# BiasGuard

<div align="center">
  <img src="logo.png" alt="Detector de Viés e Desinformação" width="200"/>
  <h1>BiasGuard</h1>
  <p>
    <strong>Uma extensão Chrome inteligente que detecta vieses, verifica fatos e sugere fontes confiáveis em textos online.</strong>
  </p>
  <p>
    <a href="#-funcionalidades">Funcionalidades</a> •
    <a href="#-instalação">Instalação</a> •
    <a href="#-como-usar">Como Usar</a> •
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-contribuindo">Contribuir</a> •
    <a href="#-licença">Licença</a>
  </p>
</div>

---

## ✨ Funcionalidades

<table>
  <tr>
    <td width="50%">
      <h3>🧠 Análise de Viés com IA</h3>
      <p>Usa GPT-4o mini para identificar vieses em textos selecionados.</p>
    </td>
    <td width="50%">
      <h3>✅ Verificação de Fatos</h3>
      <p>Integração com Google Fact Check Tools API para verificar informações.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📚 Fontes Confiáveis</h3>
      <p>Sugestões de veículos jornalísticos confiáveis relacionados ao tema.</p>
    </td>
    <td width="50%">
      <h3>⚡ Análise Rápida</h3>
      <p>Selecione texto e analise instantaneamente com apenas um clique.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Interface Intuitiva</h3>
      <p>Design moderno e fácil de usar, integrado ao navegador.</p>
    </td>
    <td width="50%">
      <h3>📊 Estatísticas</h3>
      <p>Acompanhe suas análises realizadas e evolução no uso.</p>
    </td>
  </tr>
</table>

## 🚀 Instalação

### Pré-requisitos

- Google Chrome (versão 88+)
- Chave da API OpenAI (obrigatória)
- Chave da API Google (opcional, para fact-checking avançado)

### Passos para Instalação

<details>
<summary>Clique para expandir os passos de instalação</summary>

1. **Clone ou baixe este repositório**
   bash
   git clone https://github.com/dougdotcon/detector-vies-desinformacao.git
   cd detector-vies-desinformacao
   

2. **Abra o Chrome e vá para as extensões**
   - Digite `chrome://extensions/` na barra de endereços
   - Ative o "Modo do desenvolvedor" no canto superior direito

3. **Carregue a extensão**
   - Clique em "Carregar sem compactação"
   - Selecione a pasta do projeto

4. **Configure as APIs**
   - Clique no ícone da extensão
   - Vá em "Configurações"
   - Adicione sua chave da API OpenAI
   - (Opcional) Adicione sua chave da API Google
</details>

## 🔑 Configuração das APIs

<details>
<summary><b>OpenAI API</b> (Obrigatória)</summary>

1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma conta ou faça login
3. Gere uma nova chave API
4. Cole a chave nas configurações da extensão
</details>

<details>
<summary><b>Google Fact Check Tools API</b> (Opcional)</summary>

1. Acesse [Google Cloud Console](https://console.developers.google.com/)
2. Crie um projeto ou selecione um existente
3. Ative a "Fact Check Tools API"
4. Crie credenciais (chave API)
5. Cole a chave nas configurações da extensão
</details>

## 🛠 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Integração de IA**: OpenAI API (GPT-4o mini)
- **Verificação de Fatos**: Google Fact Check Tools API
- **Ferramenta de Build**: Webpack / Vite (Baseado na estrutura moderna)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch de funcionalidade (`git checkout -b feature/FeatureIncrivel`)
3. Commit suas alterações (`git commit -m 'Adiciona FeatureIncrivel'`)
4. Push para a branch (`git push origin feature/FeatureIncrivel`)
5. Abra um Pull Request

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
