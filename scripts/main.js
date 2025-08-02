// Funcionalidad principal del sitio web

// Variables globales
let isMenuOpen = false;
let currentFilter = 'all';
let scrollPosition = 0;

// Configuración de EmailJS
const EMAILJS_CONFIG = {
    serviceId: 'service_davidfortin',
    templateId: 'template_davidfortin',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
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
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
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
                // Intentar envío con EmailJS primero, luego FormSubmit como fallback
                const success = await sendEmailWithMultipleMethods(form);
                
                if (success) {
                    showFormMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                    
                    // Resetear formulario
                    setTimeout(() => {
                        form.reset();
                    }, 2000);
                } else {
                    throw new Error('Error en el envío');
                }
                
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                showFormMessage('Hubo un error al enviar el mensaje. Por favor, contacta directamente: WhatsApp: +504 8882-1888 o Email: cotiza@davidfortin.me', 'error');
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

// Función para enviar email con múltiples métodos
async function sendEmailWithMultipleMethods(form) {
    try {
        const formData = new FormData(form);
        
        // Método 1: Intentar con EmailJS
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            try {
                showFormMessage('Enviando mensaje...', 'info');
                
                const templateParams = {
                    from_name: formData.get('from_name'),
                    from_email: formData.get('from_email'),
                    phone: formData.get('phone') || 'No proporcionado',
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    to_email: 'cotiza@davidfortin.me'
                };
                
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    templateParams
                );
                
                if (response.status === 200) {
                    console.log('Email enviado exitosamente con EmailJS');
                    return true;
                }
            } catch (emailjsError) {
                console.warn('EmailJS falló, intentando con FormSubmit:', emailjsError);
            }
        }
        
        // Método 2: Fallback con FormSubmit usando fetch
        try {
            showFormMessage('Enviando mensaje (método alternativo)...', 'info');
            
            const formDataForSubmit = new FormData();
            formDataForSubmit.append('name', formData.get('from_name'));
            formDataForSubmit.append('email', formData.get('from_email'));
            formDataForSubmit.append('phone', formData.get('phone') || 'No proporcionado');
            formDataForSubmit.append('subject', `Contacto desde davidfortin.me: ${formData.get('subject')}`);
            formDataForSubmit.append('message', formData.get('message'));
            formDataForSubmit.append('_captcha', 'false');
            formDataForSubmit.append('_template', 'table');
            
            const response = await fetch('https://formsubmit.co/cotiza@davidfortin.me', {
                method: 'POST',
                body: formDataForSubmit,
                mode: 'no-cors' // Importante para evitar CORS
            });
            
            // Con no-cors, no podemos verificar la respuesta, pero asumimos éxito
            console.log('Formulario enviado con FormSubmit');
            return true;
            
        } catch (formSubmitError) {
            console.warn('FormSubmit falló:', formSubmitError);
        }
        
        // Método 3: Envío directo con formulario HTML (último recurso)
        return await sendWithDirectForm(formData);
        
    } catch (error) {
        console.error('Todos los métodos de envío fallaron:', error);
        return false;
    }
}

// Función para envío directo con formulario HTML
async function sendWithDirectForm(formData) {
    try {
        showFormMessage('Enviando mensaje (método directo)...', 'info');
        
        // Crear formulario temporal para envío directo
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = 'https://formsubmit.co/cotiza@davidfortin.me';
        tempForm.target = '_blank'; // Abrir en nueva ventana
        tempForm.style.display = 'none';
        
        // Preparar datos para FormSubmit
        const submitData = {
            name: formData.get('from_name'),
            email: formData.get('from_email'),
            phone: formData.get('phone') || 'No proporcionado',
            subject: `Contacto desde davidfortin.me: ${formData.get('subject')}`,
            message: formData.get('message'),
            _captcha: 'false',
            _template: 'table',
            _next: 'https://davidfortin.me/gracias.html'
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
        
        // Limpiar
        setTimeout(() => {
            document.body.removeChild(tempForm);
        }, 1000);
        
        return true;
        
    } catch (error) {
        console.error('Error en sendWithDirectForm:', error);
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