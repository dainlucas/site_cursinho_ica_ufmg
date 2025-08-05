// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeMenuToggle();
    initializeSmoothScrolling();
    initializeScrollSpy();
    initializeBannerFallback();
});

// Gerenciar banner mobile fallback
function initializeBannerFallback() {
    const bannerMobile = document.querySelector('.hero-banner-mobile');
    const bannerFallback = document.querySelector('.hero-banner-fallback');
    
    if (bannerMobile && bannerFallback) {
        bannerMobile.addEventListener('error', function() {
            if (window.innerWidth <= 768) {
                bannerFallback.style.display = 'block';
            }
        });
        
        bannerMobile.addEventListener('load', function() {
            bannerFallback.style.display = 'none';
        });
    }
}

// Mobile Menu Toggle functionality
function initializeMenuToggle() {
    const menuToggle = getElement('#menuToggle');
    const navMenu = getElement('#navMenu');

    if (menuToggle && navMenu) {
        addEventHandler(menuToggle, 'click', () => {
            navMenu.classList.toggle('active');
            menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        addEventHandler(navMenu, 'click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });

        // Close menu when clicking outside
        addEventHandler(document, 'click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = getAllElements('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        addEventHandler(anchor, 'click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = getElement(targetId);
            
            if (target) {
                smoothScrollTo(target);
            }
        });
    });
}

// Scroll spy functionality to highlight active navigation
function initializeScrollSpy() {
    const sections = getAllElements('section[id]');
    const navLinks = getAllElements('.nav-menu a');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    const scrollSpyHandler = debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Update active navigation link
        removeClassFromAll(navLinks, 'active');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    addEventHandler(window, 'scroll', scrollSpyHandler);
}

// Initialize animations on scroll (optional enhancement)
function initializeScrollAnimations() {
    const cards = getAllElements('.card');
    
    const animationHandler = debounce(() => {
        cards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate-in');
            }
        });
    }, 100);

    addEventHandler(window, 'scroll', animationHandler);
    
    // Initial check
    animationHandler();
}

// Form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// WhatsApp integration
function openWhatsApp(phone, message = '') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}