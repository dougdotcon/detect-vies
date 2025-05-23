<div align="center">
  <img src="logo.png" alt="Detector de Viés e Desinformação" width="200"/>
  <h1>Detector de Viés e Desinformação</h1>
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
      <p>Usa GPT-4o mini para identificar vieses em textos selecionados</p>
    </td>
    <td width="50%">
      <h3>✅ Verificação de Fatos</h3>
      <p>Integração com Google Fact Check Tools API para verificar informações</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📚 Fontes Confiáveis</h3>
      <p>Sugestões de veículos jornalísticos confiáveis relacionados ao tema</p>
    </td>
    <td width="50%">
      <h3>⚡ Análise Rápida</h3>
      <p>Selecione texto e analise instantaneamente com apenas um clique</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Interface Intuitiva</h3>
      <p>Design moderno e fácil de usar, integrado ao navegador</p>
    </td>
    <td width="50%">
      <h3>📊 Estatísticas</h3>
      <p>Acompanhe suas análises realizadas e evolução no uso</p>
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
   ```bash
   git clone https://github.com/dougdotcon/detector-vies-desinformacao.git
   cd detector-vies-desinformacao
   ```

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

## 📖 Como Usar

1. **Selecione um texto** em qualquer página web
2. **Clique no botão "🔍 Analisar"** que aparece próximo à seleção
3. **Visualize os resultados** no popup da extensão:
   - Nível de viés detectado
   - Verificação de fatos
   - Sugestões de fontes confiáveis

### Métodos de Análise

| Método | Descrição |
|--------|-----------|
| **Seleção de texto** | Destaque qualquer texto na página |
| **Menu de contexto** | Clique com botão direito → "Analisar viés e fatos" |
| **Popup da extensão** | Clique no ícone da extensão na barra |

## 📊 Níveis de Análise

### Viés
- 🟢 **Baixo**: Texto neutro e equilibrado
- 🟡 **Médio**: Alguns indicadores de viés
- 🔴 **Alto**: Viés significativo detectado

### Credibilidade
- **Pontuação 0-10**: Baseada em múltiplos fatores
- **Palavras suspeitas**: Termos que indicam possível desinformação
- **Verificações encontradas**: Links para fact-checks existentes

## 🛠️ Tecnologias

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Frontend</strong></td>
      <td align="center"><strong>Backend</strong></td>
      <td align="center"><strong>APIs</strong></td>
    </tr>
    <tr>
      <td>
        • JavaScript ES6+<br/>
        • CSS3<br/>
        • Manifest V3
      </td>
      <td>
        • Chrome Extension APIs<br/>
        • Local Storage<br/>
        • Async/Await
      </td>
      <td>
        • OpenAI GPT-4o mini<br/>
        • Google Fact Check Tools<br/>
        • RESTful Pattern
      </td>
    </tr>
  </table>
</div>

## 🔒 Privacidade e Segurança

- ✅ **Dados locais**: Configurações armazenadas apenas no seu navegador
- ✅ **APIs seguras**: Comunicação criptografada com OpenAI e Google
- ✅ **Sem tracking**: Nenhum dado pessoal é coletado ou enviado
- ✅ **Código aberto**: Transparência total do funcionamento

## 📝 Roadmap

<div align="center">
  <table>
    <tr>
      <td><strong>v1.1</strong></td>
      <td>Análise automática de páginas completas</td>
      <td>⏳ Em desenvolvimento</td>
    </tr>
    <tr>
      <td><strong>v1.2</strong></td>
      <td>Integração com mais APIs de fact-checking</td>
      <td>📅 Planejado</td>
    </tr>
    <tr>
      <td><strong>v1.3</strong></td>
      <td>Modo offline com análise local</td>
      <td>📅 Planejado</td>
    </tr>
    <tr>
      <td><strong>v1.4</strong></td>
      <td>Relatórios detalhados de análise</td>
      <td>📅 Planejado</td>
    </tr>
    <tr>
      <td><strong>v1.5</strong></td>
      <td>Integração com redes sociais</td>
      <td>📅 Planejado</td>
    </tr>
  </table>
</div>

## 🐛 Problemas Conhecidos

- Algumas páginas com CSP restritivo podem não funcionar
- APIs podem ter limites de uso (verifique seus planos)
- Análise pode ser mais lenta em textos muito longos

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/dougdotcon/detector-vies-desinformacao/issues)
- **Email**: suporte@detectorvies.com
- **Documentação**: [Wiki do projeto](https://github.com/dougdotcon/detector-vies-desinformacao/wiki)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- OpenAI pela API GPT-4o mini
- Google pelo Fact Check Tools API
- Comunidade de desenvolvedores de extensões Chrome
- Jornalistas e pesquisadores que inspiraram este projeto

---

<div align="center">
  <p><strong>⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!</strong></p>
  <p>Criado com ❤️ por <a href="https://github.com/dougdotcon">Douglas</a></p>
</div>
