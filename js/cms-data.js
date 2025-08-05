// CMS Data Loader
class CMSDataLoader {
    constructor() {
        this.cache = new Map();
        this.baseUrl = window.location.origin;
    }

    async loadJSON(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const fullPath = path.startsWith('/') ? path : `/${path}`;
            const response = await fetch(`${this.baseUrl}${fullPath}`);
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
            // Tentar carregar uma lista de notícias ou a notícia de exemplo
            const response = await fetch('/_data/news/2025-01-04-inscricoes-abertas.md');
            if (response.ok) {
                const content = await response.text();
                const newsItem = this.parseMarkdownNews(content);
                return newsItem ? [newsItem] : [];
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

        // Formatação do telefone
        const formatPhone = (phone) => {
            return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '($2) $3-$4');
        };

        // Atualizar WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.href = `https://wa.me/${siteData.whatsapp}`;
            
            // Atualizar texto do link
            const textElement = link.querySelector('p') || link.parentElement?.querySelector('p');
            if (textElement && textElement.textContent.includes('99999-9999')) {
                textElement.textContent = formatPhone(siteData.whatsapp);
            }
        });

        // Atualizar emails
        const emailLinks = document.querySelectorAll('a[href*="mailto"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${siteData.email}`;
            
            // Atualizar texto do email
            const textElement = link.querySelector('p') || link.parentElement?.querySelector('p');
            if (textElement && textElement.textContent.includes('@')) {
                textElement.textContent = siteData.email;
            }
        });

        // Atualizar endereços
        const addressTexts = document.querySelectorAll('p');
        addressTexts.forEach(element => {
            if (element.innerHTML.includes('Rua da Educação')) {
                element.innerHTML = `${siteData.address_line1}<br>${siteData.address_line2}`;
            }
        });

        // Atualizar redes sociais
        const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="facebook"], a[href*="twitter"]');
        socialLinks.forEach(link => {
            if (link.href.includes('instagram') && siteData.instagram) {
                link.href = siteData.instagram;
            } else if (link.href.includes('facebook') && siteData.facebook) {
                link.href = siteData.facebook;
            } else if (link.href.includes('twitter') && siteData.twitter) {
                link.href = siteData.twitter;
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
        if (heroTitle && homeData.hero?.title) {
            // Procurar por texto em destaque (entre aspas ou asteriscos)
            const text = homeData.hero.title;
            const highlightPatterns = [
                /preparatórias gratuitas/gi,
                /gratuitas/gi,
                /\*\*(.*?)\*\*/g
            ];
            
            let processedText = text;
            highlightPatterns.forEach(pattern => {
                processedText = processedText.replace(pattern, '<span class="highlight">$1</span>');
            });
            
            heroTitle.innerHTML = processedText;
        }

        const heroSubtitle = document.querySelector('.hero-text p');
        if (heroSubtitle && homeData.hero?.subtitle) {
            heroSubtitle.innerHTML = homeData.hero.subtitle.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        const heroButton = document.querySelector('.hero-text .cta-button');
        if (heroButton && homeData.hero?.button_text) {
            heroButton.textContent = homeData.hero.button_text;
        }

        // Atualizar seção sobre
        const aboutTitle = document.querySelector('#sobre .section-title');
        if (aboutTitle && homeData.about?.title) {
            aboutTitle.textContent = homeData.about.title;
        }

        const aboutSubtitle = document.querySelector('#sobre .section-subtitle');
        if (aboutSubtitle && homeData.about?.subtitle) {
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

        // Atualizar informações importantes
        const infoTitle = document.querySelector('.info-section .section-title');
        if (infoTitle && homeData.info?.title) {
            infoTitle.textContent = homeData.info.title;
        }

        const infoItems = document.querySelectorAll('.info-section .info-item');
        if (infoItems.length && homeData.info?.items) {
            infoItems.forEach((item, index) => {
                const itemData = homeData.info.items[index];
                if (itemData) {
                    const title = item.querySelector('h4');
                    const description = item.querySelector('p');
                    
                    if (title) {
                        title.innerHTML = `<span aria-hidden="true">${itemData.icon}</span> ${itemData.title}`;
                    }
                    if (description) {
                        description.innerHTML = itemData.description.replace(/\n/g, '<br>');
                    }
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
            const editalTitles = document.querySelectorAll('h3');
            editalTitles.forEach(title => {
                if (title.textContent.includes('Edital')) {
                    title.innerHTML = `<span aria-hidden="true">📄</span> ${currentEdital.name}`;
                }
            });

            // Atualizar informações do edital
            const editalInfo = document.querySelectorAll('#editais .card p, .card p');
            editalInfo.forEach(p => {
                const text = p.innerHTML;
                if (text.includes('Período:')) {
                    p.innerHTML = `<strong>Período:</strong> ${currentEdital.period}`;
                } else if (text.includes('Vagas:')) {
                    p.innerHTML = `<strong>Vagas:</strong> ${currentEdital.vacancies}`;
                } else if (text.includes('Inscrições:')) {
                    p.innerHTML = `<strong>Inscrições:</strong> ${currentEdital.registration_period}`;
                } else if (text.includes('Resultado:')) {
                    p.innerHTML = `<strong>Resultado:</strong> ${currentEdital.result_date}`;
                }
            });

            // Atualizar link do arquivo do edital
            const editalLinks = document.querySelectorAll('a[href*="edital"]');
            editalLinks.forEach(link => {
                if (currentEdital.file) {
                    link.href = currentEdital.file;
                }
            });

            // Atualizar status das inscrições
            const statusElements = document.querySelectorAll('.alert, .status');
            statusElements.forEach(element => {
                if (element.textContent.includes('INSCRIÇÕES')) {
                    element.innerHTML = element.innerHTML.replace(/INSCRIÇÕES.*?!/g, `${currentEdital.status.toUpperCase()}!`);
                }
            });
        }

        // Atualizar informações do processo seletivo
        if (editaisData.process) {
            const processInfo = editaisData.process;
            const infoLists = document.querySelectorAll('ul li, .info-item');
            
            infoLists.forEach(item => {
                const text = item.textContent;
                if (text.includes('Público-alvo')) {
                    item.innerHTML = `<strong>Público-alvo:</strong> ${processInfo.target}`;
                } else if (text.includes('Renda familiar')) {
                    item.innerHTML = `<strong>Renda familiar:</strong> ${processInfo.income}`;
                } else if (text.includes('Escolaridade')) {
                    item.innerHTML = `<strong>Escolaridade:</strong> ${processInfo.education}`;
                } else if (text.includes('Idade')) {
                    item.innerHTML = `<strong>Idade:</strong> ${processInfo.age}`;
                } else if (text.includes('Documentos')) {
                    item.innerHTML = `<strong>Documentos:</strong> ${processInfo.documents}`;
                }
            });
        }

        // Atualizar lista de disciplinas
        if (editaisData.subjects) {
            const subjectLists = document.querySelectorAll('ul');
            subjectLists.forEach(list => {
                if (list.textContent.includes('Matemática') || list.textContent.includes('Linguagens')) {
                    list.innerHTML = editaisData.subjects.map(subject => `<li>• ${subject}</li>`).join('');
                }
            });
        }

        // Atualizar horários
        if (editaisData.schedule) {
            const scheduleTexts = document.querySelectorAll('p');
            scheduleTexts.forEach(p => {
                if (p.innerHTML.includes('Segunda a sexta:')) {
                    p.innerHTML = `<strong>Segunda a sexta:</strong><br>${editaisData.schedule.weekdays}`;
                } else if (p.innerHTML.includes('Sábados:')) {
                    p.innerHTML = `<strong>Sábados:</strong><br>${editaisData.schedule.saturdays}`;
                } else if (p.innerHTML.includes('Simulados:')) {
                    p.innerHTML = `<strong>Simulados:</strong><br>${editaisData.schedule.tests}`;
                }
            });
        }
    }

    // Atualiza página de contato
    async updateContactPage() {
        if (!window.location.pathname.includes('contato')) return;
        
        const contactData = await this.loader.loadContactData();
        if (!contactData) return;

        // Atualizar título e subtítulo
        const pageTitle = document.querySelector('.section-title');
        if (pageTitle && contactData.title) {
            pageTitle.textContent = contactData.title;
        }

        const pageSubtitle = document.querySelector('.section-subtitle');
        if (pageSubtitle && contactData.subtitle) {
            pageSubtitle.textContent = contactData.subtitle;
        }

        // Atualizar informações de contato
        const contactCards = document.querySelectorAll('.contact-info');
        if (contactCards.length && contactData.info) {
            contactData.info.forEach((info, index) => {
                const card = contactCards[index];
                if (card) {
                    const icon = card.querySelector('.contact-icon');
                    const title = card.querySelector('h3, h5');
                    const content = card.querySelector('p');
                    const link = card.querySelector('a');
                    const extra = card.querySelector('small');

                    if (icon) icon.textContent = info.icon;
                    if (title) title.textContent = info.title;
                    if (content && link) {
                        link.textContent = info.content;
                        if (info.link) link.href = info.link;
                    }
                    if (extra && info.extra) extra.textContent = info.extra;
                }
            });
        }
    }

    // Atualiza FAQ
    async updateFAQPage() {
        if (!window.location.pathname.includes('faq')) return;
        
        const faqData = await this.loader.loadJSON('/_data/faq.json');
        if (!faqData) return;

        // Atualizar título e subtítulo
        const pageTitle = document.querySelector('.section-title');
        if (pageTitle && faqData.title) {
            pageTitle.textContent = faqData.title;
        }

        const pageSubtitle = document.querySelector('.section-subtitle');
        if (pageSubtitle && faqData.subtitle) {
            pageSubtitle.textContent = faqData.subtitle;
        }

        // Atualizar categorias e perguntas
        if (faqData.categories) {
            const faqSections = document.querySelector('.faq-sections');
            if (faqSections) {
                faqSections.innerHTML = faqData.categories.map(category => `
                    <div class="faq-category" id="${category.id}">
                        <h2 class="faq-category-header">${category.icon} ${category.name}</h2>
                        ${category.questions.map(q => `
                            <div class="faq-item">
                                <button class="faq-question" aria-expanded="false">
                                    ${q.question}
                                    <span class="faq-icon">+</span>
                                </button>
                                <div class="faq-answer">
                                    ${q.answer}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('');

                // Reinicializar funcionalidade do FAQ
                if (window.initializeFAQ) {
                    window.initializeFAQ();
                }
            }
        }
    }

    // Atualiza página de notícias
    async updateNewsPage() {
        if (!window.location.pathname.includes('noticias')) return;
        
        const newsData = await this.loader.loadNewsData();
        if (!newsData || newsData.length === 0) return;

        // Atualizar notícia em destaque
        const featuredNews = newsData.find(news => news.featured) || newsData[0];
        if (featuredNews) {
            const featuredSection = document.querySelector('.featured-news, [style*="light-pink"]');
            if (featuredSection) {
                const title = featuredSection.querySelector('h2');
                const content = featuredSection.querySelector('p');
                const date = featuredSection.querySelector('small');

                if (title) title.textContent = featuredNews.title;
                if (content) content.innerHTML = featuredNews.summary || featuredNews.body.substring(0, 200) + '...';
                if (date && featuredNews.date) {
                    const formattedDate = new Date(featuredNews.date).toLocaleDateString('pt-BR');
                    date.textContent = `📅 ${formattedDate}`;
                }
            }
        }

        // Atualizar grid de notícias
        const newsGrid = document.querySelector('.cards-grid');
        if (newsGrid && newsData.length > 0) {
            // Manter as notícias existentes mas atualizar a primeira com dados dinâmicos
            const firstCard = newsGrid.querySelector('.card');
            if (firstCard && newsData[0]) {
                const news = newsData[0];
                const title = firstCard.querySelector('h3');
                const content = firstCard.querySelector('p:last-of-type');
                const category = firstCard.querySelector('span');

                if (title) title.textContent = news.title;
                if (content) content.textContent = news.summary || news.body.substring(0, 150) + '...';
                if (category && news.category) category.textContent = news.category.toUpperCase();
            }
        }
    }

    // Inicializa todas as atualizações
    async init() {
        await this.updateContactInfo();
        await this.updateHomePage();
        await this.updateEditaisData();
        await this.updateContactPage();
        await this.updateFAQPage();
        await this.updateNewsPage();
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