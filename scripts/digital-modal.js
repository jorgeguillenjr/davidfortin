// Funcionalidad del Modal de Contenido Digital

class DigitalModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Crear estructura del modal
        const modalHTML = `
            <div class="modal-overlay" id="digitalModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                                <path d="M7 10h10"/>
                                <path d="M7 14h10"/>
                                <circle cx="12" cy="8" r="1"/>
                            </svg>
                            Contenido Digital
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p>Descubre el contenido digital de David Fortín en sus redes sociales. Desde Instagram hasta TikTok, cada plataforma muestra una faceta única de su personalidad y trabajo profesional.</p>
                        </div>
                        <div class="digital-grid">
                            ${this.generateDigitalItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('digitalModal');
    }

    generateDigitalItems() {
        const digitalContent = [
            {
                title: "Instagram - Lifestyle & Behind the Scenes",
                platform: "Instagram",
                followers: "25K+ seguidores",
                type: "Contenido Visual",
                description: "Contenido exclusivo detrás de cámaras, momentos personales y profesionales. Una ventana íntima a la vida de David Fortín, combinando elegancia, autenticidad y momentos únicos.",
                highlights: [
                    "Stories diarios con contenido exclusivo",
                    "Posts de alta calidad visual",
                    "Behind the scenes de proyectos",
                    "Interacción directa con seguidores"
                ],
                socialUrl: "https://www.instagram.com/davidjesusfortin/",
                icon: "instagram",
                color: "#E4405F"
            },
            {
                title: "TikTok - Entretenimiento & Tendencias",
                platform: "TikTok",
                followers: "15K+ seguidores",
                type: "Video Corto",
                description: "Videos dinámicos y entretenidos que muestran la personalidad carismática de David. Desde tendencias actuales hasta contenido original que conecta con audiencias jóvenes.",
                highlights: [
                    "Videos virales y tendencias",
                    "Contenido original y creativo",
                    "Colaboraciones con otros creadores",
                    "Challenges y entretenimiento"
                ],
                socialUrl: "#",
                icon: "tiktok",
                color: "#000000"
            },
            {
                title: "Facebook - Comunidad & Noticias",
                platform: "Facebook",
                followers: "30K+ seguidores",
                type: "Red Social",
                description: "Plataforma principal para conectar con la comunidad, compartir noticias profesionales y mantener una comunicación directa con seguidores de todas las edades.",
                highlights: [
                    "Actualizaciones profesionales",
                    "Eventos y apariciones públicas",
                    "Interacción con la comunidad",
                    "Contenido informativo y educativo"
                ],
                socialUrl: "#",
                icon: "facebook",
                color: "#1877F2"
            },
            {
                title: "YouTube - Contenido Extenso",
                platform: "YouTube",
                followers: "8K+ suscriptores",
                type: "Video Largo",
                description: "Canal dedicado a contenido más extenso y profesional. Entrevistas, vlogs, y contenido educativo que muestra la versatilidad y conocimiento de David en diferentes áreas.",
                highlights: [
                    "Entrevistas y conversaciones profundas",
                    "Vlogs de proyectos especiales",
                    "Contenido educativo y tips",
                    "Colaboraciones profesionales"
                ],
                socialUrl: "#",
                icon: "youtube",
                color: "#FF0000"
            },
            {
                title: "LinkedIn - Red Profesional",
                platform: "LinkedIn",
                followers: "5K+ conexiones",
                type: "Red Profesional",
                description: "Perfil profesional donde David comparte insights de la industria, logros profesionales y se conecta con otros profesionales del entretenimiento y arquitectura.",
                highlights: [
                    "Networking profesional",
                    "Artículos de la industria",
                    "Logros y reconocimientos",
                    "Oportunidades de colaboración"
                ],
                socialUrl: "#",
                icon: "linkedin",
                color: "#0A66C2"
            },
            {
                title: "Twitter/X - Opiniones & Actualidad",
                platform: "Twitter/X",
                followers: "12K+ seguidores",
                type: "Microblogging",
                description: "Plataforma para compartir opiniones, comentarios sobre actualidad y mantener conversaciones en tiempo real con seguidores y colegas de la industria.",
                highlights: [
                    "Opiniones y comentarios actuales",
                    "Interacción en tiempo real",
                    "Trending topics y debates",
                    "Conexión con la industria"
                ],
                socialUrl: "#",
                icon: "twitter",
                color: "#1DA1F2"
            }
        ];

        return digitalContent.map(content => `
            <div class="digital-item">
                <div class="digital-container">
                    <div class="social-preview" style="border-left: 4px solid ${content.color}">
                        <div class="social-header">
                            <div class="social-icon-container">
                                ${this.getSocialIcon(content.icon, content.color)}
                            </div>
                            <div class="social-info">
                                <h4 class="social-platform">${content.platform}</h4>
                                <p class="social-followers">${content.followers}</p>
                            </div>
                        </div>
                        <div class="social-preview-content">
                            <p>Contenido exclusivo y actualizado regularmente</p>
                        </div>
                        <div class="social-cta-preview">
                            <a href="${content.socialUrl}" target="_blank" class="btn-social" style="border-color: ${content.color}; color: ${content.color}">
                                <svg class="btn-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15,3 21,3 21,9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Visitar ${content.platform}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="digital-details">
                    <h3 class="digital-title">${content.title}</h3>
                    <div class="digital-meta">
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            ${content.followers}
                        </div>
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                            ${content.type}
                        </div>
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7h10v10"/>
                                <path d="M7 17L17 7"/>
                            </svg>
                            ${content.platform}
                        </div>
                    </div>
                    <p class="digital-description">${content.description}</p>
                    <div class="digital-highlights">
                        <h4>Aspectos Destacados:</h4>
                        <ul class="highlights-list">
                            ${content.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="digital-cta">
                        <button class="btn-digital" onclick="requestDigitalInfo('${content.title}')">
                            <svg class="btn-digital-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h11l5-5v-2a2 2 0 0 0-2-2h-1"/>
                            </svg>
                            Más Info
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getSocialIcon(platform, color) {
        const icons = {
            instagram: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2"/>
            </svg>`,
            tiktok: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>`,
            facebook: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>`,
            youtube: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white"/>
            </svg>`,
            linkedin: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
            </svg>`,
            twitter: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>`
        };
        return icons[platform] || icons.instagram;
    }

    bindEvents() {
        // Evento para abrir modal desde la imagen del portfolio
        document.addEventListener('click', (e) => {
            // Verificar si se hizo clic en la imagen o contenedor de imagen del item "Contenido Digital"
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Contenido Digital') {
                e.preventDefault();
                e.stopPropagation();
                this.openModal();
            }
        });

        // Evento específico para el botón de cerrar
        if (this.modal) {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.closeModal();
                });
            }
            
            // Evento para cerrar al hacer clic en el overlay
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Prevenir cierre al hacer clic dentro del contenido
            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus en el botón de cerrar para accesibilidad
        setTimeout(() => {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.focus();
            }
        }, 300);
    }

    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        
        // Restaurar focus al elemento que abrió el modal
        const portfolioItem = document.querySelector('.portfolio-item[data-category="medios"] h3');
        if (portfolioItem) {
            portfolioItem.focus();
        }
    }
}

// Función auxiliar para solicitar más información
function requestDigitalInfo(contentTitle) {
    // Cerrar el modal principal primero
    const digitalModal = document.getElementById('digitalModal');
    if (digitalModal) {
        digitalModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Scroll al formulario de contacto y pre-llenar el asunto
    const contactSection = document.getElementById('contacto');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            if (subjectSelect) {
                subjectSelect.value = 'Medios';
            }
            if (messageTextarea) {
                messageTextarea.value = `Hola David, me interesa conocer más sobre tu trabajo en "${contentTitle}". `;
                messageTextarea.focus();
            }
        }, 1000);
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new DigitalModal();
});
                            </div>
                        </div>
                    </div>
                </div>
                <div class="digital-details">
                    <h3 class="digital-title">${content.title}</h3>
                    <div class="digital-meta">
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            ${content.followers}
                        </div>
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                            ${content.type}
                        </div>
                        <div class="digital-meta-item">
                            <svg class="digital-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7h10v10"/>
                                <path d="M7 17L17 7"/>
                            </svg>
                            ${content.platform}
                        </div>
                    </div>
                    <p class="digital-description">${content.description}</p>
                    <div class="digital-highlights">
                        <h4>Aspectos Destacados:</h4>
                        <ul class="highlights-list">
                            ${content.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getSocialIcon(platform, color) {
        const icons = {
            instagram: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2"/>
            </svg>`,
            tiktok: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>`,
            facebook: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>`,
            youtube: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white"/>
            </svg>`,
            linkedin: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
            </svg>`,
            twitter: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>`
        };
        return icons[platform] || icons.instagram;
    }

    bindEvents() {
        // Evento para abrir modal desde la imagen del portfolio
        document.addEventListener('click', (e) => {
            // Verificar si se hizo clic en la imagen o contenedor de imagen del item "Contenido Digital"
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Contenido Digital') {
                e.preventDefault();
                e.stopPropagation();
                this.openModal();
            }
        });

        // Evento específico para el botón de cerrar
        if (this.modal) {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.closeModal();
                });
            }
            
            // Evento para cerrar al hacer clic en el overlay
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Prevenir cierre al hacer clic dentro del contenido
            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus en el botón de cerrar para accesibilidad
        setTimeout(() => {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.focus();
            }
        }, 300);
    }

    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        
        // Restaurar focus al elemento que abrió el modal
        const portfolioItem = document.querySelector('.portfolio-item[data-category="medios"] h3');
        if (portfolioItem) {
            portfolioItem.focus();
        }
    }
}

// Función auxiliar para solicitar más información
function requestDigitalInfo(contentTitle) {
    // Cerrar el modal principal primero
    const digitalModal = document.getElementById('digitalModal');
    if (digitalModal) {
        digitalModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Scroll al formulario de contacto y pre-llenar el asunto
    const contactSection = document.getElementById('contacto');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            if (subjectSelect) {
                subjectSelect.value = 'Medios';
            }
            if (messageTextarea) {
                messageTextarea.value = `Hola David, me interesa conocer más sobre tu trabajo en "${contentTitle}". `;
                messageTextarea.focus();
            }
        }, 1000);
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new DigitalModal();
});