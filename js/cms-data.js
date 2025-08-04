// CMS Data Loader
class CMSDataLoader {
    constructor() {
        this.cache = new Map();
    }

    async loadJSON(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.set(path, data);
            return data;
        } catch (error) {
            console.warn(`Failed to load ${path}:`, error);
            return null;
        }
    }

    // Carrega dados do site
    async loadSiteData() {
        return await this.loadJSON('/_data/site.json');
    }

    // Carrega dados da página inicial
    async loadHomeData() {
        return await this.loadJSON('/_data/home.json');
    }

    // Carrega dados dos editais
    async loadEditaisData() {
        return await this.loadJSON('/_data/editais.json');
    }

    // Carrega dados de contato
    async loadContactData() {
        return await this.loadJSON('/_data/contact.json');
    }

    // Carrega notícias
    async loadNewsData() {
        try {
            // Em produção, isso seria uma API ou listagem automática
            // Por enquanto, vamos carregar a notícia de exemplo
            const response = await fetch('/_data/news/2025-01-04-inscricoes-abertas.md');
            if (response.ok) {
                const content = await response.text();
                return this.parseMarkdownNews(content);
            }
            return [];
        } catch (error) {
            console.warn('Failed to load news:', error);
            return [];
        }
    }

    parseMarkdownNews(content) {
        // Parser simples para o frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (!frontmatterMatch) return null;

        const [, frontmatter, body] = frontmatterMatch;
        const metadata = {};
        
        frontmatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // Remove aspas
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                
                metadata[key] = value;
            }
        });

        return {
            ...metadata,
            body: body.trim()
        };
    }
}

// Funções para atualizar o DOM
class CMSUpdater {
    constructor() {
        this.loader = new CMSDataLoader();
    }

    // Atualiza informações de contato em toda página
    async updateContactInfo() {
        const siteData = await this.loader.loadSiteData();
        if (!siteData) return;

        // Atualizar WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.href = `https://wa.me/${siteData.whatsapp}`;
            const phoneText = link.querySelector('p, span');
            if (phoneText && phoneText.textContent.includes('99999-9999')) {
                const formatted = siteData.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '($2) $3-$4');
                phoneText.textContent = formatted;
            }
        });

        // Atualizar emails
        const emailLinks = document.querySelectorAll('a[href*="mailto"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${siteData.email}`;
            const emailText = link.querySelector('p, span') || link;
            if (emailText.textContent.includes('@')) {
                emailText.textContent = siteData.email;
            }
        });

        // Atualizar endereços
        const addressElements = document.querySelectorAll('p:contains("Rua da Educação")');
        addressElements.forEach(element => {
            if (element.innerHTML.includes('Rua da Educação')) {
                element.innerHTML = `${siteData.address_line1}<br>${siteData.address_line2}`;
            }
        });
    }

    // Atualiza página inicial
    async updateHomePage() {
        if (!document.querySelector('#inicio')) return;

        const homeData = await this.loader.loadHomeData();
        if (!homeData) return;

        // Atualizar hero section
        const heroTitle = document.querySelector('.hero-text h2');
        if (heroTitle && homeData.hero) {
            const highlightMatch = homeData.hero.title.match(/^(.*?)(\*\*(.*?)\*\*)(.*?)$/);
            if (highlightMatch) {
                const [, before, , highlight, after] = highlightMatch;
                heroTitle.innerHTML = `${before}<span class="highlight">${highlight}</span>${after}`;
            } else {
                heroTitle.textContent = homeData.hero.title;
            }
        }

        const heroSubtitle = document.querySelector('.hero-text p');
        if (heroSubtitle && homeData.hero) {
            heroSubtitle.innerHTML = homeData.hero.subtitle.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        const heroButton = document.querySelector('.hero-text .cta-button');
        if (heroButton && homeData.hero) {
            heroButton.textContent = homeData.hero.button_text;
        }

        // Atualizar seção sobre
        const aboutTitle = document.querySelector('#sobre .section-title');
        if (aboutTitle && homeData.about) {
            aboutTitle.textContent = homeData.about.title;
        }

        const aboutSubtitle = document.querySelector('#sobre .section-subtitle');
        if (aboutSubtitle && homeData.about) {
            aboutSubtitle.textContent = homeData.about.subtitle;
        }

        // Atualizar cards da seção sobre
        const aboutCards = document.querySelectorAll('#sobre .card');
        if (aboutCards.length && homeData.about?.cards) {
            aboutCards.forEach((card, index) => {
                const cardData = homeData.about.cards[index];
                if (cardData) {
                    const icon = card.querySelector('.card-icon');
                    const title = card.querySelector('h3');
                    const description = card.querySelector('p');
                    
                    if (icon) icon.textContent = cardData.icon;
                    if (title) title.textContent = cardData.title;
                    if (description) description.textContent = cardData.description;
                }
            });
        }
    }

    // Atualiza dados dos editais
    async updateEditaisData() {
        const editaisData = await this.loader.loadEditaisData();
        if (!editaisData) return;

        // Atualizar informações do edital atual
        const currentEdital = editaisData.current;
        if (currentEdital) {
            // Atualizar título do edital
            const editalTitle = document.querySelector('h3:contains("Edital 2025.1")');
            if (editalTitle) {
                editalTitle.innerHTML = `<span aria-hidden="true">📄</span> ${currentEdital.name}`;
            }

            // Atualizar informações do edital
            const editalInfo = document.querySelectorAll('#editais .card p');
            editalInfo.forEach(p => {
                if (p.innerHTML.includes('Período:')) {
                    p.innerHTML = `<strong>Período:</strong> ${currentEdital.period}`;
                } else if (p.innerHTML.includes('Vagas:')) {
                    p.innerHTML = `<strong>Vagas:</strong> ${currentEdital.vacancies}`;
                } else if (p.innerHTML.includes('Inscrições:')) {
                    p.innerHTML = `<strong>Inscrições:</strong> ${currentEdital.registration_period}`;
                } else if (p.innerHTML.includes('Resultado:')) {
                    p.innerHTML = `<strong>Resultado:</strong> ${currentEdital.result_date}`;
                }
            });
        }
    }

    // Inicializa todas as atualizações
    async init() {
        await this.updateContactInfo();
        await this.updateHomePage();
        await this.updateEditaisData();
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const updater = new CMSUpdater();
    updater.init().catch(console.error);
});

// Exportar para uso em outras páginas
window.CMSDataLoader = CMSDataLoader;
window.CMSUpdater = CMSUpdater;