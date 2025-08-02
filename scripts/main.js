// Funcionalidad principal del sitio web

// Variables globales
let isMenuOpen = false;
let currentFilter = 'all';
let scrollPosition = 0;

// Configuración de EmailJS
const EMAILJS_CONFIG = {
    serviceId: 'service_davidfortin',
    templateId: 'template_contact',
    publicKey: '8a2ec5d2003258e47f2b675385cba1f9' // Se debe configurar
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    initializeNavigation();
    initializePortfolioFilters();
    initializeContactForm();
    initializeScrollEffects();
    createScrollToTopButton();
    initializeAnimationsOnScroll();
});

// === INICIALIZACIÓN DE EMAILJS ===
function initializeEmailJS() {
    // Inicializar EmailJS con clave pública temporal para demostración
    // En producción, debes configurar tu propia cuenta de EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY_HERE");
        console.log('EmailJS inicializado');
    } else {
        console.warn('EmailJS no está disponible');
    }
}

// === NAVEGACIÓN ===
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Toggle menu móvil
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Cerrar menú móvil
            if (isMenuOpen) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                isMenuOpen = false;
                document.body.style.overflow = '';
            }
            
            // Scroll suave a la sección
            scrollToSection(targetId.substring(1));
            
            // Actualizar enlace activo
            updateActiveNavLink(this);
        });
    });
    
    // Efecto scroll en navbar
    window.addEventListener('scroll', function() {
        scrollPosition = window.pageYOffset;
        
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo basado en scroll
        updateActiveNavLinkOnScroll();
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Compensar altura del navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === NUEVA FUNCIÓN PARA NAVEGAR AL PORTFOLIO CON FILTRO ===
function goToPortfolioFilter(filter) {
    // Primero navegar a la sección portfolio
    scrollToSection('portfolio');
    
    // Después de un pequeño delay, aplicar el filtro
    setTimeout(() => {
        // Actualizar botones de filtro
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        const targetButton = document.querySelector(`[data-filter="${filter}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Aplicar filtro
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        filterPortfolioItems(filter, portfolioItems);
        currentFilter = filter;
    }, 800); // Delay para que termine el scroll
}

// === PORTFOLIO ===
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar elementos
            filterPortfolioItems(filter, portfolioItems);
            currentFilter = filter;
        });
    });
}

function filterPortfolioItems(filter, items) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.classList.add('fade-in');
            
            // Remover clase de animación después de completarse
            setTimeout(() => {
                item.classList.remove('fade-in');
            }, 500);
        } else {
            item.classList.add('hidden');
        }
    });
}

// === FORMULARIO DE CONTACTO ===
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validar antes de enviar
            if (!validateForm(this)) {
                showFormMessage('Por favor, corrige los errores antes de enviar.', 'error');
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Mostrar estado de carga
            submitButton.textContent = 'Enviando...';
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
            
            try {
                // Obtener datos del formulario
                const formData = new FormData(form);
                
                // Enviar usando FormSubmit (servicio real)
                const success = await sendEmailWithFormSubmit(formData);
                
                if (success) {
                    // Mostrar mensaje de confirmación inmediato
                    showFormMessage('¡Mensaje enviado correctamente! Serás redirigido a la página de confirmación en unos segundos.', 'success');
                    
                    // Resetear formulario después de mostrar el mensaje
                    setTimeout(() => {
                        form.reset();
                    }, 1000);
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                showFormMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contacta directamente al teléfono: +504 8882-1888 o email: cotiza@davidfortin.me', 'error');
            } finally {
                // Restaurar botón
                submitButton.textContent = originalText;
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
            }
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Función para enviar email con FormSubmit
async function sendEmailWithFormSubmit(formData) {
    try {
        // Mostrar mensaje de confirmación primero
        showFormMessage('Procesando envío...', 'info');
        
        setTimeout(() => {
            // Crear formulario para envío directo con FormSubmit
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = 'https://formsubmit.co/cotiza@davidfortin.me';
            tempForm.style.display = 'none';
            
            // Preparar datos para FormSubmit
            const submitData = {
                name: formData.get('from_name'),
                email: formData.get('from_email'),
                phone: formData.get('phone') || 'No proporcionado',
                subject: `Contacto desde davidfortin.me: ${formData.get('subject')}`,
                message: formData.get('message'),
                _next: window.location.origin + '/gracias.html',
                _captcha: 'false',
                _template: 'table'
            };
            
            // Agregar campos al formulario
            Object.keys(submitData).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = submitData[key];
                tempForm.appendChild(input);
            });
            
            // Enviar formulario
            document.body.appendChild(tempForm);
            tempForm.submit();
            
        }, 1500); // Dar tiempo para que se vea el mensaje
        
        return true;
        
    } catch (error) {
        console.error('Error en sendEmailWithFormSubmit:', error);
        return false;
    }
}


function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones básicas
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es obligatorio.';
        isValid = false;
    } else if (fieldType === 'email' && value && !isValidEmail(value)) {
        errorMessage = 'Por favor, introduce un email válido.';
        isValid = false;
    } else if (fieldType === 'tel' && value && !isValidPhone(value)) {
        errorMessage = 'Por favor, introduce un número de teléfono válido.';
        isValid = false;
    }
    
    // Mostrar/ocultar error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Acepta formatos: +504 0000-0000, 504-0000-0000, 00000000, etc.
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
    return phoneRegex.test(phone);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormMessage(message, type) {
    // Remover mensajes anteriores
    const existingMessage = document.querySelector('.form-success, .form-error, .form-info');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-${type}`;
    messageDiv.textContent = message;
    
    // Agregar estilos para mejor visibilidad
    messageDiv.style.position = 'relative';
    messageDiv.style.zIndex = '10';
    messageDiv.style.marginBottom = '20px';
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.fontSize = '1rem';
    messageDiv.style.lineHeight = '1.5';
    messageDiv.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    
    // Colores específicos según el tipo
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    } else if (type === 'info') {
        messageDiv.style.backgroundColor = '#d1ecf1';
        messageDiv.style.color = '#0c5460';
        messageDiv.style.border = '1px solid #bee5eb';
    }
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Scroll suave hacia el mensaje
        messageDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    // Auto-remover después de 10 segundos (más tiempo para leer)
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
        }
    }, 10000);
}

// === EFECTOS DE SCROLL ===
function initializeScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateScrollEffects() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Mostrar/ocultar botón scroll to top
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Volver arriba');
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
}

// === ANIMACIONES ON SCROLL ===
function initializeAnimationsOnScroll() {
    const animatedElements = document.querySelectorAll('.about-card, .portfolio-item, .contact-container > *');
    
    // Agregar clase para animación
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Observer para activar animaciones
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// === UTILIDADES ===
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Funciones globales para uso en HTML
window.scrollToSection = scrollToSection;
window.goToPortfolioFilter = goToPortfolioFilter;

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Página cargada en ${loadTime}ms`);
    }
});