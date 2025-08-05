// News Page JavaScript
class NewsManager {
    constructor() {
        this.currentNews = [];
        this.init();
    }

    async init() {
        console.log('Inicializando gerenciador de notícias...');
        
        // Mostrar indicador de carregamento
        this.showLoadingState();
        
        // Carregar dados das notícias
        await this.loadNewsData();
        
        // Renderizar notícias
        this.renderNews();
        
        console.log('Gerenciador de notícias inicializado com sucesso!');
    }

    async loadNewsData() {
        try {
            const loader = new CMSDataLoader();
            this.currentNews = await loader.loadNewsData() || [];
            
            // Ordenar por data (mais recente primeiro)
            this.currentNews.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            console.log('Notícias carregadas:', this.currentNews);
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            this.currentNews = [];
        }
    }

    renderNews() {
        this.renderNewsGrid();
    }


    renderNewsGrid() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        // Limpar grid
        newsGrid.innerHTML = '';

        // Renderizar todas as notícias em ordem cronológica
        this.currentNews.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });

        console.log(`Renderizadas ${this.currentNews.length} notícias`);
    }

    createNewsCard(news) {
        const newsId = this.createNewsId(news);
        const newsUrl = `noticia-template.html?id=${newsId}`;
        
        const card = document.createElement('article');
        card.className = 'news-card';
        
        // Fazer o card inteiro clicável
        card.onclick = () => window.location.href = newsUrl;
        card.style.cursor = 'pointer';

        const formattedDate = new Date(news.date).toLocaleDateString('pt-BR');
        
        card.innerHTML = `
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

    showLoadingState() {
        const newsGrid = document.querySelector('.news-grid');
        if (newsGrid) {
            newsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <p style="color: var(--text-gray); font-size: 1.1rem;">Carregando notícias...</p>
                </div>
            `;
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


// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Só inicializar se estivermos na página de notícias
    if (window.location.pathname.includes('noticias') || 
        document.querySelector('.news-grid')) {
        window.newsManager = new NewsManager();
    }
});