# Prompt para Claude Code - Site Cursinho Comunitário

## Objetivo do Projeto

Criar um site para cursinho comunitário com as seguintes características:

1. **Informativo** - Site para cursinho comunitário da cidade, visando informar aos alunos sobre vagas e editais de forma simples
2. **Contatos da instituição** - Email, telefone, WhatsApp, endereço e redes sociais
3. **Fácil manutenção** - Usando ferramentas simples para que futuros programadores possam aprimorar ou corrigir
4. **Design baseado em referência** - Seguir fielmente o design do site: https://comunicaufmg.soaresgabriel.com/

## Tecnologias Recomendadas

### Frontend:
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização com Flexbox/Grid para layouts responsivos
- **JavaScript Vanilla** - Funcionalidades básicas (menu mobile, formulários, etc.)

### Ferramentas de Desenvolvimento:
- **Git** - Controle de versão para facilitar manutenção
- **Live Server (VS Code)** - Servidor local para desenvolvimento
- **Prettier + ESLint** - Formatação e padronização de código

## Estrutura de Arquivos Necessária

```
cursinho-site/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── components.css
│   └── main.css
├── js/
│   ├── main.js
│   └── utils.js
├── images/
│   ├── logo/
│   ├── icons/
│   └── backgrounds/
├── assets/
│   └── documents/ (para PDFs de editais)
├── pages/
│   ├── sobre.html
│   ├── contato.html
│   └── editais.html
├── README.md
└── .gitignore
```

## Design de Referência - Especificações Visuais

### Cabeçalho:
- **Barra superior vermelha** (#c53030) com ícones sociais no canto direito
- **Logo principal** com:
  - Ícone de livro/educação à esquerda
  - Texto "ComunICA" (onde "mun" deve estar destacado em vermelho)
  - Subtítulo "Cursinho Comunitário" em cinza
- **Menu horizontal** com links: home, Sobre, Blog, FAQ, Avaliação, Edital, Contato
- **Link ativo** deve ter sublinhado vermelho

### Hero Section:
- **Layout diagonal** - fundo branco do lado esquerdo, vermelho do lado direito
- **Texto principal**: "Oferecer aulas **preparatórias gratuitas** para vestibulares e Enem"
- **Subtítulo**: "Visando contribuir com a comunidade, este projeto irá preparar alunos da rede pública para o Enem de forma gratuita, democratizando o acesso ao ensino superior"
- **Botão CTA vermelho**: "Edital Aqui"
- **Imagem/ilustração** de estudante do lado direito

### Rodapé:
- **Fundo rosa claro** (#fed7d7)
- **Seção esquerda** com:
  - Logo repetido
  - Texto explicativo do projeto
  - Ícones sociais circulares vermelhos (WhatsApp, Twitter, Instagram)
- **Três caixas brancas de contato** centralizadas com:
  - 📞 **Telefone**: "38 9 9999-9999"
  - 💬 **Whatsap**: "38 9 9999-9999"
  - 📍 **Endereço**: "Av. universitária 10000"
- **Rodapé inferior vermelho** com:
  - "© 2025 Comunica ICA UFMG — Todos os direitos reservados"
  - Link "Políticas de Privacidade"

## Paleta de Cores

```css
:root {
    --primary-red: #c53030;
    --dark-red: #9b2c2c;
    --light-pink: #fed7d7;
    --text-dark: #2d3748;
    --text-gray: #4a5568;
    --white: #ffffff;
    --light-gray: #f7fafc;
    --border-gray: #e2e8f0;
}
```

## Conteúdo do Site

### Seções Principais:
1. **Hero** - Apresentação principal com call-to-action
2. **Sobre o Cursinho** - Cards com informações:
   - 🎯 Foco no ENEM
   - 👥 Turmas Reduzidas  
   - 📚 Material Didático
   - ⭐ Professores Qualificados
   - 💡 Orientação Vocacional
   - 🏆 Resultados Comprovados

3. **Informações Importantes**:
   - 📅 Período de Inscrições: Janeiro a Março
   - 🎓 Público-Alvo: Estudantes da rede pública
   - ⏰ Horários: Segunda a sexta 19h-22h, Sábados 8h-12h
   - 💰 Investimento: Totalmente gratuito

4. **Editais e Vagas**:
   - Edital 2025.1 com 200 vagas
   - Processo seletivo por renda familiar
   - Disciplinas oferecidas (Matemática, Linguagens, Ciências, Redação)

### Informações de Contato:
- **Telefone**: (38) 99999-9999
- **Email**: contato@cursinhocomunitario.com
- **WhatsApp**: (38) 99999-9999
- **Endereço**: Rua da Educação, 123 - Centro - Montes Claros/MG
- **Instagram**: @cursinhocomunitario
- **Facebook**: Cursinho Comunitário

## Funcionalidades Necessárias

### JavaScript:
- **Menu mobile responsivo** com hamburger
- **Navegação suave** entre seções
- **Scroll spy** para destacar seção ativa no menu  
- **Botão flutuante do WhatsApp**
- **Animações simples** ao rolar a página
- **Validação de formulários** (se houver)

### Responsividade:
- **Mobile first** design
- **Breakpoints**: 768px para tablet, 1024px para desktop
- **Menu mobile** colapsável
- **Imagens responsivas**
- **Cards em grid** que se adapta ao tamanho da tela

## Arquivo HTML Base Já Desenvolvido

[O HTML completo já foi criado e testado - ver artifact anterior com todo o código funcional]

## Instruções para Claude Code

1. **Crie a estrutura de pastas** conforme especificado
2. **Separe o CSS** do HTML atual em arquivos organizados:
   - `reset.css` - Reset básico
   - `variables.css` - Variáveis CSS
   - `components.css` - Componentes reutilizáveis
   - `main.css` - Estilos principais
3. **Separe o JavaScript** em:
   - `main.js` - Funcionalidades principais
   - `utils.js` - Funções utilitárias
4. **Crie as páginas adicionais** (sobre.html, contato.html, editais.html)
5. **Configure o .gitignore** apropriado
6. **Crie um README.md** com instruções de instalação e desenvolvimento
7. **Adicione placeholder para imagens** nas pastas corretas
8. **Implemente melhorias de acessibilidade** (alt tags, ARIA labels, etc.)
9. **Otimize o código** para produção
10. **Teste a responsividade** em diferentes dispositivos

## Prioridades de Desenvolvimento

1. ✅ **Estrutura HTML semântica**
2. ✅ **CSS organizado e responsivo** 
3. ✅ **JavaScript funcional**
4. 🔄 **Separação em arquivos organizados**
5. 🔄 **Páginas adicionais**
6. 🔄 **Otimização e acessibilidade**
7. 🔄 **Documentação completa**

## Observações Importantes

- O design deve seguir **exatamente** o layout do site de referência
- Manter **código limpo e bem comentado** para fácil manutenção
- Priorizar **performance e acessibilidade**
- Implementar **SEO básico** (meta tags, structured data)
- Preparar para **fácil customização** futura

---

**Nota**: Todo o código HTML/CSS/JS já foi desenvolvido e testado. Agora precisa ser organizado na estrutura de arquivos especificada e otimizado para produção.

## Códigos já feitos anteriormente pelo claude:
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cursinho Comunitário - Preparação Gratuita para ENEM e Vestibulares</title>
    <meta name="description" content="Cursinho preparatório gratuito para ENEM e vestibulares. Democratizando o acesso ao ensino superior para estudantes da rede pública.">
    
    <style>
        /* Reset CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Variables CSS */
        :root {
            --primary-red: #c53030;
            --dark-red: #9b2c2c;
            --light-pink: #fed7d7;
            --text-dark: #2d3748;
            --text-gray: #4a5568;
            --white: #ffffff;
            --light-gray: #f7fafc;
            --border-gray: #e2e8f0;
        }

        /* Base Styles */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            background-color: var(--white);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Top Bar */
        .top-bar {
            background-color: var(--primary-red);
            padding: 0.5rem 0;
        }

        .top-bar-content {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1rem;
        }

        .social-icons {
            display: flex;
            gap: 0.5rem;
        }

        .social-icons a {
            color: var(--white);
            font-size: 1.2rem;
            padding: 0.3rem;
            text-decoration: none;
            transition: opacity 0.3s ease;
        }

        .social-icons a:hover {
            opacity: 0.8;
        }

        /* Header */
        header {
            background-color: var(--white);
            padding: 1rem 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .logo-icon {
            width: 60px;
            height: 60px;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20 80 L50 20 L80 80 M30 65 L70 65" stroke="%23000" stroke-width="3" fill="none"/></svg>') no-repeat center;
            background-size: contain;
        }

        .logo-text h1 {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 0.2rem;
        }

        .logo-text h1 .highlight {
            color: var(--primary-red);
        }

        .logo-text p {
            font-size: 0.9rem;
            color: var(--text-gray);
            font-weight: 400;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-menu a {
            color: var(--text-dark);
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-menu a:hover,
        .nav-menu a.active {
            color: var(--primary-red);
        }

        .nav-menu a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 2px;
            background-color: var(--primary-red);
        }

        .menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--white) 0%, var(--white) 60%, var(--primary-red) 60%, var(--primary-red) 100%);
            padding: 4rem 0;
            min-height: 500px;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
            height: 100%;
        }

        .hero-text h2 {
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            color: var(--text-dark);
        }

        .hero-text h2 .highlight {
            color: var(--primary-red);
        }

        .hero-text p {
            font-size: 1.1rem;
            color: var(--text-gray);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .hero-text p strong {
            color: var(--text-dark);
        }

        .cta-button {
            background-color: var(--primary-red);
            color: var(--white);
            padding: 1rem 2rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: var(--dark-red);
        }

        .hero-image {
            text-align: center;
            position: relative;
        }

        .hero-image::before {
            content: '👩‍🎓';
            font-size: 15rem;
            opacity: 0.8;
        }

        /* Main Content */
        main {
            padding: 4rem 0;
        }

        .section {
            margin-bottom: 4rem;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
            color: var(--text-dark);
        }

        .section-subtitle {
            font-size: 1.2rem;
            color: var(--text-gray);
            text-align: center;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Cards */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .card {
            background: var(--white);
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-gray);
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
        }

        .card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .card p {
            color: var(--text-gray);
            line-height: 1.6;
        }

        /* Info Section */
        .info-section {
            background: var(--light-gray);
            padding: 4rem 0;
            margin: 2rem 0;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .info-item {
            text-align: center;
            padding: 1.5rem;
            background: var(--white);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .info-item h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--primary-red);
        }

        /* Footer */
        footer {
            background: var(--light-pink);
            padding: 3rem 0 1rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 3rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .footer-section p {
            color: var(--text-gray);
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .footer-social {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .footer-social a {
            background-color: var(--primary-red);
            color: var(--white);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .footer-social a:hover {
            background-color: var(--dark-red);
        }

        .contact-info {
            background: var(--white);
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .contact-item {
            margin-bottom: 1.5rem;
        }

        .contact-item:last-child {
            margin-bottom: 0;
        }

        .contact-icon {
            font-size: 2rem;
            color: var(--primary-red);
            margin-bottom: 0.5rem;
            display: block;
        }

        .contact-item h5 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 0.3rem;
        }

        .contact-item p {
            color: var(--text-gray);
            font-size: 0.95rem;
        }

        .contact-item a {
            color: var(--text-gray);
            text-decoration: none;
        }

        .contact-item a:hover {
            color: var(--primary-red);
        }

        .footer-bottom {
            background-color: var(--primary-red);
            color: var(--white);
            text-align: center;
            padding: 1rem 0;
            margin-top: 2rem;
        }

        .footer-bottom-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-bottom a {
            color: var(--white);
            text-decoration: none;
        }

        .footer-bottom a:hover {
            text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .top-bar {
                display: none;
            }

            .header-content {
                flex-direction: column;
                gap: 1rem;
            }

            .nav-menu {
                display: none;
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--white);
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            }

            .nav-menu.active {
                display: flex;
                transform: translateY(0);
            }

            .menu-toggle {
                display: block;
            }

            .hero-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .hero-text h2 {
                font-size: 2.5rem;
            }

            .hero-image::before {
                font-size: 10rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .cards-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .footer-bottom-content {
                flex-direction: column;
                gap: 1rem;
            }
        }

        /* WhatsApp Float Button */
        .whatsapp-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #25d366;
            color: white;
            border-radius: 50%;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            text-decoration: none;
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        .whatsapp-float:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-content">
                <div class="social-icons">
                    <a href="https://wa.me/5538999999999" target="_blank">📱</a>
                    <a href="https://twitter.com/cursinhocomunitario" target="_blank">🐦</a>
                    <a href="https://instagram.com/cursinhocomunitario" target="_blank">📷</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <div class="logo-icon"></div>
                    <div class="logo-text">
                        <h1>Co<span class="highlight">mun</span>ICA</h1>
                        <p>Cursinho Comunitário</p>
                    </div>
                </div>
                <nav>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="#inicio" class="active">home</a></li>
                        <li><a href="#sobre">Sobre</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#avaliacao">Avaliação</a></li>
                        <li><a href="#editais">Edital</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                    <button class="menu-toggle" id="menuToggle">☰</button>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="inicio">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h2>Oferecer aulas <span class="highlight">preparatórias gratuitas</span> para vestibulares e Enem</h2>
                    <p><strong>Visando contribuir com</strong> a comunidade, este projeto irá preparar alunos da rede pública para o <strong>Enem de forma gratuita, democratizando o acesso ao ensino superior</strong></p>
                    <a href="#editais" class="cta-button">Edital Aqui</a>
                </div>
                <div class="hero-image">
                    <!-- Student illustration would go here -->
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main>
        <!-- About Section -->
        <section class="section" id="sobre">
            <div class="container">
                <h2 class="section-title">Sobre o Cursinho</h2>
                <p class="section-subtitle">Nosso compromisso é oferecer educação de qualidade e gratuita, preparando estudantes da rede pública para conquistar seus sonhos no ensino superior.</p>
                
                <div class="cards-grid">
                    <div class="card">
                        <span class="card-icon">🎯</span>
                        <h3>Foco no ENEM</h3>
                        <p>Preparação específica para o Exame Nacional do Ensino Médio, com simulados e aulas direcionadas para o formato da prova.</p>
                    </div>
                    <div class="card">
                        <span class="card-icon">👥</span>
                        <h3>Turmas Reduzidas</h3>
                        <p>Grupos pequenos que permitem acompanhamento individualizado e melhor aproveitamento do conteúdo.</p>
                    </div>
                    <div class="card">
                        <span class="card-icon">📚</span>
                        <h3>Material Didático</h3>
                        <p>Apostilas e materiais de estudo fornecidos gratuitamente, além de acesso a plataformas digitais.</p>
                    </div>
                    <div class="card">
                        <span class="card-icon">⭐</span>
                        <h3>Professores Qualificados</h3>
                        <p>Equipe de professores experientes e comprometidos com o sucesso dos alunos.</p>
                    </div>
                    <div class="card">
                        <span class="card-icon">💡</span>
                        <h3>Orientação Vocacional</h3>
                        <p>Apoio para escolha de curso e universidade, além de orientações sobre processos seletivos.</p>
                    </div>
                    <div class="card">
                        <span class="card-icon">🏆</span>
                        <h3>Resultados Comprovados</h3>
                        <p>Alto índice de aprovação em universidades públicas e privadas através do ENEM.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Info Section -->
        <section class="info-section">
            <div class="container">
                <h2 class="section-title">Informações Importantes</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>📅 Período de Inscrições</h4>
                        <p>Janeiro a Março de cada ano</p>
                    </div>
                    <div class="info-item">
                        <h4>🎓 Público-Alvo</h4>
                        <p>Estudantes da rede pública concluintes ou formados</p>
                    </div>
                    <div class="info-item">
                        <h4>⏰ Horários</h4>
                        <p>Segunda a sexta: 19h às 22h<br>Sábados: 8h às 12h</p>
                    </div>
                    <div class="info-item">
                        <h4>💰 Investimento</h4>
                        <p>Totalmente gratuito</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Editais Section -->
        <section class="section" id="editais">
            <div class="container">
                <h2 class="section-title">Editais e Vagas</h2>
                <p class="section-subtitle">Confira os editais vigentes e as vagas disponíveis para o próximo período letivo.</p>
                
                <div class="cards-grid">
                    <div class="card">
                        <h3>📄 Edital 2025.1</h3>
                        <p><strong>Período:</strong> Março a Dezembro 2025</p>
                        <p><strong>Vagas:</strong> 200 vagas disponíveis</p>
                        <p><strong>Inscrições:</strong> 15/01 a 28/02/2025</p>
                        <p style="margin-top: 1rem;">
                            <a href="#" style="color: var(--primary-red); font-weight: 600;">📥 Baixar Edital Completo</a>
                        </p>
                    </div>
                    <div class="card">
                        <h3>📋 Processo Seletivo</h3>
                        <p><strong>Critérios:</strong> Renda familiar e histórico escolar</p>
                        <p><strong>Documentos:</strong> RG, CPF, comprovante de residência e renda</p>
                        <p><strong>Resultado:</strong> 15/03/2025</p>
                        <p style="margin-top: 1rem;">
                            <a href="#" style="color: var(--primary-red); font-weight: 600;">📝 Fazer Inscrição Online</a>
                        </p>
                    </div>
                    <div class="card">
                        <h3>📚 Disciplinas Oferecidas</h3>
                        <p>• Matemática e suas Tecnologias</p>
                        <p>• Linguagens e Códigos</p>
                        <p>• Ciências da Natureza</p>
                        <p>• Ciências Humanas</p>
                        <p>• Redação</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <div class="logo-text">
                            <h1>Co<span class="highlight">mun</span>ICA</h1>
                            <p>Cursinho Comunitário</p>
                        </div>
                    </div>
                    <p>Visando contribuir com a comunidade, este projeto irá preparar alunos da rede pública para o Enem de forma gratuita, democratizando o acesso ao ensino superior.</p>
                    <div class="footer-social">
                        <a href="https://wa.me/5538999999999" target="_blank">📱</a>
                        <a href="https://twitter.com/cursinhocomunitario" target="_blank">🐦</a>
                        <a href="https://instagram.com/cursinhocomunitario" target="_blank">📷</a>
                    </div>
                </div>

                <div class="contact-info">
                    <div class="contact-item">
                        <span class="contact-icon">📞</span>
                        <h5>Telefone</h5>
                        <p><a href="tel:+5538999999999">38 9 9999-9999</a></p>
                    </div>
                </div>

                <div class="contact-info">
                    <div class="contact-item">
                        <span class="contact-icon">💬</span>
                        <h5>Whatsap</h5>
                        <p><a href="https://wa.me/5538999999999" target="_blank">38 9 9999-9999</a></p>
                    </div>
                </div>

                <div class="contact-info">
                    <div class="contact-item">
                        <span class="contact-icon">📍</span>
                        <h5>Endereço</h5>
                        <p>Av. universitária 10000</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p>© 2025 Comunica ICA UFMG — Todos os direitos reservados</p>
                    <a href="#">Políticas de Privacidade</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Float Button -->
    <a href="https://wa.me/5538999999999" class="whatsapp-float" target="_blank" title="Fale conosco no WhatsApp">
        💬
    </a>

    <script>
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add active class to navigation based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    </script>
</body>
</html>