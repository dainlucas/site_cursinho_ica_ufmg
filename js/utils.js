// Utility Functions

// Smooth scroll function
function smoothScrollTo(target) {
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Get element by selector
function getElement(selector) {
    return document.querySelector(selector);
}

// Get all elements by selector
function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

// Add event listener with error handling
function addEventHandler(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
    }
}

// Remove class from all elements
function removeClassFromAll(elements, className) {
    elements.forEach(element => {
        element.classList.remove(className);
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}