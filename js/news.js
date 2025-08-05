// News Page JavaScript
class NewsManager {
    constructor() {
        this.currentNews = [];
        this.filteredNews = [];
        this.currentCategory = 'all';
        this.newsPerPage = 6;
        this.currentPage = 1;
        this.init();
    }

    async init() {
        console.log('Inicializando gerenciador de notícias...');
        
        // Carregar dados das notícias
        await this.loadNewsData();
        
        // Configurar filtros
        this.setupFilters();
        
        // Renderizar notícias
        this.renderNews();
        
        // Configurar modal
        this.setupModal();
        
        console.log('Gerenciador de notícias inicializado com sucesso!');
    }

    async loadNewsData() {
        try {
            const loader = new CMSDataLoader();
            this.currentNews = await loader.loadNewsData() || [];
            this.filteredNews = [...this.currentNews];
            
            console.log('Notícias carregadas:', this.currentNews);
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            this.currentNews = [];
            this.filteredNews = [];
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adicionar classe active no botão clicado
                button.classList.add('active');
                
                // Filtrar notícias
                this.currentCategory = button.dataset.category;
                this.filterNews();
                this.currentPage = 1;
                this.renderNews();
            });
        });
    }

    filterNews() {
        if (this.currentCategory === 'all') {
            this.filteredNews = [...this.currentNews];
        } else {
            this.filteredNews = this.currentNews.filter(news => 
                news.category && news.category.toLowerCase() === this.currentCategory.toLowerCase()
            );
        }
        console.log(`Notícias filtradas por "${this.currentCategory}":`, this.filteredNews);
    }

    renderNews() {
        this.renderFeaturedNews();
        this.renderNewsGrid();
        this.updateLoadMoreButton();
    }

    renderFeaturedNews() {
        const featuredNews = this.currentNews.find(news => news.featured === true || news.featured === "true");
        const featuredCard = document.querySelector('.featured-news-card');
        
        if (!featuredNews || !featuredCard) {
            console.warn('Notícia em destaque ou elemento não encontrado');
            return;
        }

        // Mostrar o card
        featuredCard.style.display = 'grid';

        // Atualizar imagem
        const image = featuredCard.querySelector('.featured-news-image img');
        if (image && featuredNews.image) {
            image.src = featuredNews.image;
            image.alt = featuredNews.imageAlt || featuredNews.title;
        }

        // Atualizar metadados
        const dateEl = featuredCard.querySelector('.news-date');
        const authorEl = featuredCard.querySelector('.news-author');
        const readTimeEl = featuredCard.querySelector('.news-read-time');

        if (dateEl && featuredNews.date) {
            const formattedDate = new Date(featuredNews.date).toLocaleDateString('pt-BR');
            dateEl.textContent = formattedDate;
        }

        if (authorEl && featuredNews.author) {
            authorEl.textContent = featuredNews.author;
        }

        if (readTimeEl && featuredNews.readTime) {
            readTimeEl.textContent = featuredNews.readTime;
        }

        // Atualizar título e resumo
        const title = featuredCard.querySelector('.featured-news-title');
        const summary = featuredCard.querySelector('.featured-news-summary');

        if (title) {
            title.textContent = featuredNews.title;
        }

        if (summary) {
            summary.textContent = featuredNews.summary || this.truncateText(featuredNews.body, 150);
        }

        // Atualizar tags
        this.renderTags(featuredCard.querySelector('.news-tags'), featuredNews.tags);

        // Adicionar dados para o modal
        const readMoreBtn = featuredCard.querySelector('.news-read-more-btn');
        if (readMoreBtn) {
            readMoreBtn.dataset.news = JSON.stringify(featuredNews);
        }

        console.log('Notícia em destaque renderizada:', featuredNews.title);
    }

    renderNewsGrid() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        // Filtrar notícias não destacadas
        const regularNews = this.filteredNews.filter(news => !news.featured || news.featured === false || news.featured === "false");
        
        // Paginação
        const startIndex = (this.currentPage - 1) * this.newsPerPage;
        const endIndex = startIndex + this.newsPerPage;
        const newsToShow = regularNews.slice(0, endIndex);

        // Limpar grid
        newsGrid.innerHTML = '';

        // Renderizar cards
        newsToShow.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });

        console.log(`Renderizados ${newsToShow.length} cards de notícias`);
    }

    createNewsCard(news) {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.onclick = () => this.openNewsModal(news);

        const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjdGQUZDIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDE4MCA4MEgyMjBMMjAwIDEwMFoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2Zz4K';

        const formattedDate = new Date(news.date).toLocaleDateString('pt-BR');
        
        card.innerHTML = `
            <div class="news-card-image">
                <img src="${news.image || defaultImage}" alt="${news.imageAlt || news.title}" onerror="this.src='${defaultImage}'">
                <div class="news-badge">${(news.category || 'Notícia').toUpperCase()}</div>
            </div>
            <div class="news-card-content">
                <div class="news-card-meta">
                    <span class="news-date">${formattedDate}</span>
                    <span class="news-read-time">${news.readTime || '2 min'}</span>
                </div>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-summary">${news.summary || this.truncateText(news.body, 120)}</p>
            </div>
        `;

        return card;
    }

    renderTags(container, tags) {
        if (!container || !tags || !Array.isArray(tags)) return;

        container.innerHTML = '';
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'news-tag';
            tagEl.textContent = tag;
            container.appendChild(tagEl);
        });
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-news');
        const regularNews = this.filteredNews.filter(news => !news.featured || news.featured === false || news.featured === "false");
        const totalPages = Math.ceil(regularNews.length / this.newsPerPage);

        if (this.currentPage < totalPages) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.onclick = () => {
                this.currentPage++;
                this.renderNewsGrid();
            };
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    setupModal() {
        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeNewsModal();
            }
        });
    }

    openNewsModal(news) {
        const modal = document.getElementById('newsModal');
        if (!modal) return;

        // Atualizar conteúdo do modal
        this.populateModal(news);
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll do body

        console.log('Modal aberto para:', news.title);
    }

    populateModal(news) {
        const modal = document.getElementById('newsModal');
        
        // Imagem
        const image = modal.querySelector('.news-modal-image');
        if (image) {
            image.src = news.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjdGQUZDIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDE4MCA4MEgyMjBMMjAwIDEwMFoiIGZpbGw9IiNFMkU4RjAiLz4KPHN2Zz4K';
            image.alt = news.imageAlt || news.title;
        }

        // Badge
        const badge = modal.querySelector('.news-badge');
        if (badge) {
            badge.textContent = (news.category || 'NOTÍCIA').toUpperCase();
        }

        // Metadados
        const dateEl = modal.querySelector('.news-modal-date');
        const authorEl = modal.querySelector('.news-modal-author');
        const readTimeEl = modal.querySelector('.news-modal-read-time');

        if (dateEl && news.date) {
            const formattedDate = new Date(news.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            dateEl.textContent = formattedDate;
        }

        if (authorEl && news.author) {
            authorEl.textContent = news.author;
        }

        if (readTimeEl && news.readTime) {
            readTimeEl.textContent = news.readTime;
        }

        // Título
        const title = modal.querySelector('.news-modal-title');
        if (title) {
            title.textContent = news.title;
        }

        // Tags
        this.renderTags(modal.querySelector('.news-modal-tags'), news.tags);

        // Conteúdo
        const contentBody = modal.querySelector('.news-modal-content-body');
        if (contentBody) {
            // Converter markdown básico para HTML
            const htmlContent = this.markdownToHtml(news.body || '');
            contentBody.innerHTML = htmlContent;
        }
    }

    closeNewsModal() {
        const modal = document.getElementById('newsModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll do body
        }
    }

    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    markdownToHtml(markdown) {
        if (!markdown) return '';
        
        let html = markdown;
        
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Line breaks
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><h/g, '<h');
        html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
        html = html.replace(/<p><ul>/g, '<ul>');
        html = html.replace(/<\/ul><\/p>/g, '</ul>');
        
        return html;
    }
}

// Funções globais para compatibilidade com eventos inline
function openNewsModal(element) {
    try {
        const newsData = JSON.parse(element.dataset.news);
        if (window.newsManager) {
            window.newsManager.openNewsModal(newsData);
        }
    } catch (error) {
        console.error('Erro ao abrir modal:', error);
    }
}

function closeNewsModal() {
    if (window.newsManager) {
        window.newsManager.closeNewsModal();
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Só inicializar se estivermos na página de notícias
    if (window.location.pathname.includes('noticias') || 
        document.querySelector('.news-grid')) {
        window.newsManager = new NewsManager();
    }
});