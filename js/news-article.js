// News Article Page JavaScript
class NewsArticleManager {
    constructor() {
        this.newsData = null;
        this.init();
    }

    async init() {
        console.log('Inicializando página de artigo...');
        
        // Obter ID da notícia da URL
        const newsId = this.getNewsIdFromUrl();
        if (!newsId) {
            console.error('ID da notícia não encontrado na URL');
            this.showError('Notícia não encontrada');
            return;
        }

        // Carregar dados da notícia
        await this.loadNewsData(newsId);
        
        // Renderizar artigo
        this.renderArticle();
        
        console.log('Página de artigo inicializada');
    }

    getNewsIdFromUrl() {
        // Extrair ID da notícia da URL (ex: noticia.html?id=2025-01-04-inscricoes-abertas)
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async loadNewsData(newsId) {
        try {
            const loader = new CMSDataLoader();
            const allNews = await loader.loadNewsData();
            
            // Encontrar a notícia pelo ID (baseado no nome do arquivo)
            this.newsData = allNews.find(news => {
                // Criar ID baseado no título e data para correspondência
                const newsIdFromData = this.createNewsId(news);
                return newsIdFromData === newsId;
            });

            if (!this.newsData) {
                console.error('Notícia não encontrada:', newsId);
                this.showError('Notícia não encontrada');
                return;
            }

            console.log('Dados da notícia carregados:', this.newsData);
        } catch (error) {
            console.error('Erro ao carregar dados da notícia:', error);
            this.showError('Erro ao carregar notícia');
        }
    }

    createNewsId(news) {
        // Criar ID baseado na data e título (similar ao nome do arquivo)
        if (!news.date || !news.title) return null;
        
        const date = new Date(news.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const titleSlug = news.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/-+/g, '-') // Remove hífens duplicados
            .replace(/^-|-$/g, ''); // Remove hífens do início e fim
            
        return `${year}-${month}-${day}-${titleSlug}`;
    }

    renderArticle() {
        if (!this.newsData) return;

        // Atualizar título da página
        document.title = `${this.newsData.title} - Cursinho Comunitário`;
        
        // Atualizar meta description
        const metaDescription = document.getElementById('page-description');
        if (metaDescription) {
            metaDescription.setAttribute('content', this.newsData.summary || '');
        }

        // Breadcrumb
        const breadcrumbTitle = document.getElementById('breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = this.newsData.title;
        }

        // Categoria
        const categoryEl = document.getElementById('article-category');
        if (categoryEl && this.newsData.category) {
            categoryEl.textContent = this.newsData.category.toUpperCase();
        }

        // Data
        const dateEl = document.getElementById('article-date');
        if (dateEl && this.newsData.date) {
            const formattedDate = new Date(this.newsData.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            dateEl.textContent = formattedDate;
            dateEl.setAttribute('datetime', this.newsData.date);
        }

        // Título
        const titleEl = document.getElementById('article-title');
        if (titleEl) {
            titleEl.textContent = this.newsData.title;
        }

        // Autor
        const authorEl = document.getElementById('article-author');
        if (authorEl && this.newsData.author) {
            authorEl.textContent = `Por ${this.newsData.author}`;
        }

        // Tempo de leitura
        const readTimeEl = document.getElementById('article-read-time');
        if (readTimeEl && this.newsData.readTime) {
            readTimeEl.textContent = this.newsData.readTime;
        }

        // Imagem
        this.renderImage();

        // Resumo
        const summaryEl = document.getElementById('article-summary');
        if (summaryEl && this.newsData.summary) {
            summaryEl.innerHTML = `<p class="lead">${this.newsData.summary}</p>`;
        }

        // Tags
        this.renderTags();

        // Conteúdo
        this.renderContent();
    }

    renderImage() {
        const imageContainer = document.getElementById('article-image-container');
        const imageEl = document.getElementById('article-image');
        
        if (this.newsData.image && imageContainer && imageEl) {
            imageEl.src = this.newsData.image;
            imageEl.alt = this.newsData.imageAlt || this.newsData.title;
            imageContainer.style.display = 'block';
        }
    }

    renderTags() {
        const tagsContainer = document.getElementById('article-tags');
        if (!tagsContainer || !this.newsData.tags || !Array.isArray(this.newsData.tags)) return;

        tagsContainer.innerHTML = '';
        
        const tagsTitle = document.createElement('span');
        tagsTitle.className = 'tags-title';
        tagsTitle.textContent = 'Tags: ';
        tagsContainer.appendChild(tagsTitle);

        this.newsData.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'article-tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
    }

    renderContent() {
        const contentEl = document.getElementById('article-content');
        if (!contentEl || !this.newsData.body) return;

        // Converter markdown para HTML
        const htmlContent = this.markdownToHtml(this.newsData.body);
        contentEl.innerHTML = htmlContent;
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
        
        // Clean up
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><h/g, '<h');
        html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
        html = html.replace(/<p><ul>/g, '<ul>');
        html = html.replace(/<\/ul><\/p>/g, '</ul>');
        
        return html;
    }

    showError(message) {
        const titleEl = document.getElementById('article-title');
        const contentEl = document.getElementById('article-content');
        
        if (titleEl) {
            titleEl.textContent = 'Erro';
        }
        
        if (contentEl) {
            contentEl.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                    <a href="noticias.html" class="cta-button">Voltar para Notícias</a>
                </div>
            `;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos em uma página de artigo
    if (window.location.search.includes('id=') || 
        document.querySelector('.news-article')) {
        new NewsArticleManager();
    }
});