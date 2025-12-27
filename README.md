# BiasGuard

<div align="center">
  <img src="logo.png" alt="Bias and Disinformation Detector" width="200"/>
  <h1>BiasGuard</h1>
  <p>
    <strong>An intelligent Chrome extension that detects biases, verifies facts, and suggests reliable sources in online text.</strong>
  </p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">How to Use</a> •
    <a href="#-technologies">Technologies</a> •
    <a href="#-contributing">Contributing</a> •
    <a href="#-license">License</a>
  </p>
</div>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🧠 AI Bias Analysis</h3>
      <p>Uses GPT-4o mini to identify biases in selected text.</p>
    </td>
    <td width="50%">
      <h3>✅ Fact Checking</h3>
      <p>Integration with Google Fact Check Tools API to verify information.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📚 Trusted Sources</h3>
      <p>Suggestions of reliable journalistic outlets related to the topic.</p>
    </td>
    <td width="50%">
      <h3>⚡ Fast Analysis</h3>
      <p>Select text and analyze instantly with just one click.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Intuitive Interface</h3>
      <p>Modern and easy-to-use design, integrated into the browser.</p>
    </td>
    <td width="50%">
      <h3>📊 Statistics</h3>
      <p>Track your analysis history and usage trends.</p>
    </td>
  </tr>
</table>

## 🚀 Installation

### Prerequisites

- Google Chrome (version 88+)
- OpenAI API Key (Required)
- Google API Key (Optional, for advanced fact-checking)

### Installation Steps

<details>
<summary>Click to expand installation steps</summary>

1. **Clone or download this repository**
   bash
   git clone https://github.com/dougdotcon/detector-vies-desinformacao.git
   cd detector-vies-desinformacao
   

2. **Open Chrome and navigate to extensions**
   - Type `chrome://extensions/` in the address bar
   - Enable "Developer mode" in the top right corner

3. **Load the extension**
   - Click "Load unpacked"
   - Select the project folder

4. **Configure APIs**
   - Click the extension icon
   - Go to "Settings"
   - Add your OpenAI API key
   - (Optional) Add your Google API key
</details>

## 🔑 API Configuration

<details>
<summary><b>OpenAI API</b> (Required)</summary>

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or log in
3. Generate a new API key
4. Paste the key into the extension settings
</details>

<details>
<summary><b>Google Fact Check Tools API</b> (Optional)</summary>

1. Visit [Google Cloud Console](https://console.developers.google.com/)
2. Create a project or select an existing one
3. Enable the "Fact Check Tools API"
4. Create credentials (API key)
5. Paste the key into the extension settings
</details>

## 🛠 Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: OpenAI API (GPT-4o mini)
- **Fact Checking**: Google Fact Check Tools API
- **Build Tool**: Webpack / Vite (Assumed based on modern structure)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
