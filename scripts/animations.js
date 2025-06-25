// Animaciones avanzadas y efectos visuales

// === CONFIGURACIÓN DE ANIMACIONES ===
const animationConfig = {
    duration: {
        fast: 200,
        normal: 300,
        slow: 500
    },
    easing: {
        easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
};

// === ANIMACIONES DE ENTRADA ===
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.setupObserver();
        this.findAnimatedElements();
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    findAnimatedElements() {
        const selectors = [
            '.hero-content > *',
            '.about-card',
            '.portfolio-item',
            '.contact-item',
            '.section-title'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = `all 0.6s ${animationConfig.easing.easeOut} ${index * 0.1}s`;
                
                this.elements.push(element);
                this.observer.observe(element);
            });
        });
    }
    
    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}

// === EFECTOS DE PARALLAX ===
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.findParallaxElements();
        this.bindEvents();
    }
    
    findParallaxElements() {
        const heroBackground = document.querySelector('.hero');
        if (heroBackground) {
            this.elements.push({
                element: heroBackground,
                speed: 0.5
            });
        }
    }
    
    bindEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(item => {
            const yPos = -(scrolled * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// === ANIMACIONES DE HOVER AVANZADAS ===
class HoverAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCardHovers();
        this.setupButtonHovers();
        this.setupImageHovers();
    }
    
    setupCardHovers() {
        const cards = document.querySelectorAll('.about-card, .portfolio-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-8px) scale(1.02)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
            });
        });
    }
    
    setupButtonHovers() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRipple(e);
            });
        });
    }
    
    createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        // Remover después de la animación
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    setupImageHovers() {
        const imageContainers = document.querySelectorAll('.portfolio-image');
        
        imageContainers.forEach(container => {
            container.addEventListener('mouseenter', (e) => {
                const placeholder = e.target.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.transform = 'scale(1.1)';
                    placeholder.style.filter = 'brightness(1.1)';
                }
            });
            
            container.addEventListener('mouseleave', (e) => {
                const placeholder = e.target.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.transform = 'scale(1)';
                    placeholder.style.filter = 'brightness(1)';
                }
            });
        });
    }
}

// === ANIMACIONES DE TEXTO ===
class TextAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.animateHeroTitle();
        this.setupTypewriter();
    }
    
    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    setupTypewriter() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.opacity = '1';
            
            setTimeout(() => {
                this.typeWriter(subtitle, text, 50);
            }, 800);
        }
    }
    
    typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// === TRANSICIONES DE PÁGINA ===
class PageTransitions {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSmoothScrolling();
        this.setupSectionTransitions();
    }
    
    setupSmoothScrolling() {
        // Ya implementado en main.js, pero podemos añadir efectos adicionales
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Añadir efecto de fade durante la transición
                    document.body.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        setTimeout(() => {
                            document.body.style.opacity = '1';
                        }, 300);
                    }, 100);
                }
            });
        });
    }
    
    setupSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                } else {
                    entry.target.classList.remove('section-visible');
                }
            });
        }, {
            threshold: 0.3
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// === EFECTOS DE LOADING ===
class LoadingAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createPageLoader();
        this.setupImageLoading();
    }
    
    createPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">DF</div>
                <div class="loader-progress"></div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Simular carga y remover loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
    
    setupImageLoading() {
        const imagePlaceholders = document.querySelectorAll('.image-placeholder');
        
        imagePlaceholders.forEach(placeholder => {
            // Simular carga de imagen
            setTimeout(() => {
                placeholder.classList.add('loaded');
            }, Math.random() * 2000 + 500);
        });
    }
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario prefiere reducir las animaciones
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new ScrollAnimations();
        new ParallaxEffects();
        new HoverAnimations();
        new TextAnimations();
        new PageTransitions();
        new LoadingAnimations();
    }
});

// === ESTILOS CSS ADICIONALES PARA ANIMACIONES ===
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background-white);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader-content {
        text-align: center;
    }
    
    .loader-logo {
        font-family: var(--font-display);
        font-size: 3rem;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 2rem;
        animation: pulse 2s infinite;
    }
    
    .loader-progress {
        width: 200px;
        height: 2px;
        background-color: var(--border-light);
        position: relative;
        overflow: hidden;
    }
    
    .loader-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: var(--accent-color);
        animation: loading-progress 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes loading-progress {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .section-visible {
        animation: sectionFadeIn 0.8s ease-out;
    }
    
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .image-placeholder.loaded::before {
        animation-play-state: paused;
        opacity: 0;
    }
`;

// Inyectar estilos adicionales
const style = document.createElement('style');
style.textContent = additionalStyles;
document.head.appendChild(style);