# 🌐 URLContainer

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-11.1.2-black?style=for-the-badge&logo=next.js"/>
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/TypeScript-4.4.3-3178C6?style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/badge/MUI-5.0.3-007FFF?style=for-the-badge&logo=mui"/>
  <img src="https://img.shields.io/badge/styled--components-5.3.1-DB7093?style=for-the-badge&logo=styled-components"/>
  <img src="https://img.shields.io/badge/Axios-0.22.0-5A29E4?style=for-the-badge&logo=axios"/>
</p>

<div align="center">
  <b>🇧🇷 Português | <a href="#english-version">🇺🇸 English below</a></b>
</div>

---

## 📑 Sumário | Table of Contents
- [Sobre o Projeto | About](#sobre-o-projeto--about)
- [Tecnologias | Technologies](#tecnologias--technologies)
- [Estrutura | Structure](#estrutura--structure)
- [Instalação e Execução | Setup & Run](#instalação-e-execução--setup--run)
- [Autor | Author](#autor--author)

---

## Sobre o Projeto | About

**PT-BR:**
> Um container Electron que abre uma URL em modo quiosque (fullscreen, sem bordas, sem menu), lendo o endereço do arquivo `C:\temp\url.txt`. Ideal para aplicações de totens, painéis ou navegação restrita.

**EN:**
> An Electron container that opens a URL in kiosk mode (fullscreen, borderless, no menu), reading the address from the file `C:\temp\url.txt`. Ideal for kiosk, dashboard, or restricted browsing applications.

---

## 🚀 Tecnologias | Technologies

**PT-BR:**
- **Este projeto não utiliza Java.**
- **Electron 15+**: Framework para criar aplicações desktop multiplataforma usando tecnologias web (HTML, CSS, JS).
- **Node.js 16+**: Ambiente de execução JavaScript para backend e integração com o sistema operacional.
- **Electron Forge**: Ferramenta para empacotamento, distribuição e scaffolding de projetos Electron.

**EN:**
- **This project does not use Java.**
- **Electron 15+**: Framework for building cross-platform desktop applications using web technologies (HTML, CSS, JS).
- **Node.js 16+**: JavaScript runtime environment for backend and OS integration.
- **Electron Forge**: Tool for packaging, distribution, and scaffolding of Electron projects.

---

## 🗂️ Estrutura | Structure
```
electron_url_container/
├── index.html
├── main.js
├── package.json
├── package-lock.json
├── preload.js
├── url.txt
└── README.md
```

---

## ⚙️ Instalação e Execução | Setup & Run

**PT-BR:**
1. **Pré-requisitos:** Node.js 16+ e npm
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Crie o arquivo de URL:**
   - Crie o arquivo `C:\temp\url.txt` com a URL desejada na primeira linha.
4. **Inicie o aplicativo:**
   ```bash
   npm start
   ```
   O app abrirá a URL em modo quiosque.

**EN:**
1. **Prerequisites:** Node.js 16+ and npm
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create the URL file:**
   - Create the file `C:\temp\url.txt` with the desired URL on the first line.
4. **Start the app:**
   ```bash
   npm start
   ```
   The app will open the URL in kiosk mode.

---

## 👨‍💻 Autor | Author

**PT-BR:**

<div align="center">

**Rodolfo M. F. Abreu**
Desenvolvedor de software apaixonado por tecnologia, aprendizado contínuo e boas práticas de programação. Sempre em busca de novos desafios e oportunidades para colaborar em projetos inovadores.

[![GitHub](https://img.shields.io/badge/GitHub-rodolfomfabreu-black?style=for-the-badge&logo=github)](https://github.com/salamandery)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rodolfo%20Abreu-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rodolfo-marques-ferreira-de-abreu/)

Sinta-se à vontade para entrar em contato para dúvidas, sugestões ou colaborações!

</div>

**EN:**

<div align="center">

**Rodolfo M. F. Abreu**
Software developer passionate about technology, continuous learning, and best programming practices. Always looking for new challenges and opportunities to collaborate on innovative projects.

[![GitHub](https://img.shields.io/badge/GitHub-rodolfomfabreu-black?style=for-the-badge&logo=github)](https://github.com/salamandery)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rodolfo%20Abreu-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rodolfo-marques-ferreira-de-abreu/)

Feel free to get in touch for questions, suggestions, or collaborations!

</div>

---

<div align="center">
  <b>Feito com 💙 para estudos de Electron, Node.js e aplicações desktop multiplataforma.<br/>
  Made with 💙 for Electron, Node.js and cross-platform desktop application studies.</b>
</div>

---

<div align="center" id="english-version">
  <b>🇺🇸 English version above | <a href="#top">🇧🇷 Versão em português acima</a></b>
</div>
