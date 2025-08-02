// Funcionalidad principal del sitio web

// Variables globales
let isMenuOpen = false;
let currentFilter = 'all';
let scrollPosition = 0;

// Configuración de EmailJS
const FORMSPREE_CONFIG = {
    endpoint: 'https://formspree.io/f/mrblaqyl', // Endpoint de Formspree para cotiza@davidfortin.me
    method: 'POST'
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolioFilters();
    initializeContactForm();
    initializeScrollEffects();
    createScrollToTopButton();
    initializeAnimationsOnScroll();
});


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
                // Enviar con Formspree
                const success = await sendEmailWithFormspree(form);
                
                if (success) {
                    // Mostrar ventana de agradecimiento
                    showThankYouModal();
                    
                    // Resetear formulario después de un momento
                    setTimeout(() => {
                        form.reset();
                    }, 1000);
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                showFormMessage('Hubo un error al enviar el mensaje. Por favor, contacta directamente: Teléfono: +504 8882-1888 o Email: cotiza@davidfortin.me', 'error');
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

// Función para enviar email con Formspree
async function sendEmailWithFormspree(form) {
    try {
        const formData = new FormData(form);
        
        showFormMessage('Enviando mensaje...', 'info');
        
        // Preparar datos para Formspree
        const formspreeData = new FormData();
        formspreeData.append('name', formData.get('from_name'));
        formspreeData.append('email', formData.get('from_email'));
        formspreeData.append('phone', formData.get('phone') || 'No proporcionado');
        formspreeData.append('subject', formData.get('subject'));
        formspreeData.append('message', formData.get('message'));
        formspreeData.append('_replyto', formData.get('from_email'));
        formspreeData.append('_subject', `Contacto desde davidfortin.me: ${formData.get('subject')}`);
        
        const response = await fetch(FORMSPREE_CONFIG.endpoint, {
            method: FORMSPREE_CONFIG.method,
            body: formspreeData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('Email enviado exitosamente con Formspree');
            return true;
        } else {
            const errorData = await response.json();
            console.error('Error de Formspree:', errorData);
            
            if (errorData.errors) {
                const errorMessages = errorData.errors.map(error => error.message).join(', ');
                throw new Error(`Error de validación: ${errorMessages}`);
            }
            
            throw new Error('Error al enviar el formulario');
        }
        
    } catch (error) {
        console.error('Error al enviar con Formspree:', error);
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

// === VENTANA DE AGRADECIMIENTO ===
function showThankYouModal() {
    // Crear modal de agradecimiento
    const modalHTML = `
        <div class="thank-you-modal-overlay" id="thankYouModal">
            <div class="thank-you-modal-content">
                <div class="thank-you-modal-header">
                    <div class="thank-you-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <circle cx="12" cy="12" r="10"/>
                        </svg>
                    </div>
                    <h2>¡Mensaje Enviado!</h2>
                    <button class="thank-you-close" onclick="closeThankYouModal()" aria-label="Cerrar">×</button>
                </div>
                <div class="thank-you-modal-body">
                    <div class="thank-you-content">
                        <h3>¡Gracias por contactarme!</h3>
                        <p class="thank-you-subtitle">Tu mensaje ha sido enviado correctamente</p>
                        <div class="thank-you-description">
                            <p><strong>Te contactaré en las próximas 24 horas.</strong></p>
                            <p>He recibido tu mensaje y me pondré en contacto contigo lo antes posible. Normalmente respondo en un plazo de 24 horas durante días hábiles.</p>
                            <p>Mientras tanto, puedes seguirme en mis redes sociales para estar al día de mis últimos proyectos.</p>
                        </div>
                        <div class="thank-you-actions">
                            <button class="btn-primary" onclick="closeThankYouModal()">Continuar Navegando</button>
                            <button class="btn-secondary" onclick="closeThankYouModal(); setTimeout(() => scrollToSection('portfolio'), 300);">Ver Portfolio</button>
                        </div>
                        <div class="social-links-modal">
                            <h4>Sígueme en:</h4>
                            <div class="social-icons-modal">
                                <a href="https://www.instagram.com/davidjesusfortin/" target="_blank" class="social-link-modal">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2"/>
                                    </svg>
                                    Instagram
                                </a>
                                <a href="#" target="_blank" class="social-link-modal">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </a>
                                <a href="#" target="_blank" class="social-link-modal">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                    Twitter
                                </a>
                            </div>
                        </div>
                        <div class="contact-reminder">
                            <div class="contact-reminder-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                            </div>
                            <p><strong>Recordatorio:</strong> Te contactaré dentro de las próximas 24 horas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insertar modal en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal con animación
    const modal = document.getElementById('thankYouModal');
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Cerrar con tecla Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeThankYouModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Cerrar al hacer clic en el overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeThankYouModal();
        }
    });
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remover modal después de la animación
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
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
window.closeThankYouModal = closeThankYouModal;

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