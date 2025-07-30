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
            }
        //   ,
        //     {
        //         title: "TikTok - Contenido Viral y Entretenimiento",
        //         platform: "TikTok",
        //         followers: "15K+ seguidores",
        //         type: "Videos Cortos",
        //         description: "Videos dinámicos y entretenidos que muestran la personalidad carismática de David. Desde challenges hasta contenido educativo sobre medios y arquitectura, siempre con un toque único.",
        //         highlights: [
        //             "Videos virales de entretenimiento",
        //             "Tips de presentación y comunicación",
        //             "Behind the scenes de TV",
        //             "Tendencias y challenges populares"
        //         ],
        //         socialUrl: "#",
        //         icon: "tiktok",
        //         color: "#000000"
        //     },
        //     {
        //         title: "YouTube - Contenido Educativo y Profesional",
        //         platform: "YouTube",
        //         followers: "8K+ suscriptores",
        //         type: "Videos Largos",
        //         description: "Canal dedicado a contenido educativo sobre comunicación, arquitectura y desarrollo personal. Tutoriales, entrevistas y documentales que inspiran y educan a la audiencia.",
        //         highlights: [
        //             "Tutoriales de comunicación efectiva",
        //             "Tours arquitectónicos detallados",
        //             "Entrevistas con personalidades",
        //             "Documentales de proyectos"
        //         ],
        //         socialUrl: "#",
        //         icon: "youtube",
        //         color: "#FF0000"
        //     },
        //     {
        //         title: "LinkedIn - Red Profesional y Networking",
        //         platform: "LinkedIn",
        //         followers: "12K+ conexiones",
        //         type: "Contenido Profesional",
        //         description: "Plataforma para networking profesional y contenido corporativo. Artículos sobre liderazgo, arquitectura sostenible y tendencias en medios de comunicación.",
        //         highlights: [
        //             "Artículos sobre liderazgo",
        //             "Networking con profesionales",
        //             "Contenido sobre arquitectura",
        //             "Oportunidades de colaboración"
        //         ],
        //         socialUrl: "#",
        //         icon: "linkedin",
        //         color: "#0077B5"
        //     },
        //     {
        //         title: "Facebook - Comunidad y Eventos",
        //         platform: "Facebook",
        //         followers: "20K+ seguidores",
        //         type: "Comunidad Social",
        //         description: "Página oficial para mantener contacto con la comunidad, compartir eventos, noticias y crear un espacio de interacción con fans y seguidores de todas las edades.",
        //         highlights: [
        //             "Eventos y apariciones públicas",
        //             "Noticias y actualizaciones",
        //             "Interacción con la comunidad",
        //             "Contenido familiar y accesible"
        //         ],
        //         socialUrl: "#",
        //         icon: "facebook",
        //         color: "#1877F2"
        //     },
        //     {
        //         title: "Twitter/X - Noticias y Opiniones",
        //         platform: "Twitter/X",
        //         followers: "18K+ seguidores",
        //         type: "Microblogging",
        //         description: "Plataforma para compartir opiniones, noticias del momento y participar en conversaciones relevantes sobre arquitectura, medios y actualidad nacional e internacional.",
        //         highlights: [
        //             "Opiniones sobre actualidad",
        //             "Noticias del sector",
        //             "Participación en debates",
        //             "Conexión con influencers"
        //         ],
        //         socialUrl: "#",
        //         icon: "twitter",
        //         color: "#1DA1F2"
        //     }
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
            </div>
        `).join('');
    }

    getSocialIcon(platform, color) {
        const icons = {
            instagram: `<svg viewBox="0 0 24 24" fill="${color}">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2"/>
            </svg>`
            // ,
            // tiktok: `<svg viewBox="0 0 24 24" fill="${color}">
            //     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            // </svg>`,
            // youtube: `<svg viewBox="0 0 24 24" fill="${color}">
            //     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            // </svg>`,
            // linkedin: `<svg viewBox="0 0 24 24" fill="${color}">
            //     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            // </svg>`,
            // facebook: `<svg viewBox="0 0 24 24" fill="${color}">
            //     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            // </svg>`,
            // twitter: `<svg viewBox="0 0 24 24" fill="${color}">
            //     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            // </svg>`
        };
        return icons[platform] || icons.instagram;
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Contenido Digital') {
                e.preventDefault();
                e.stopPropagation();
                this.openModal();
            }
        });

        if (this.modal) {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.closeModal();
                });
            }
            
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }

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
        
        const portfolioItem = document.querySelector('.portfolio-item[data-category="medios"] h3');
        if (portfolioItem) {
            portfolioItem.focus();
        }
    }
}

function requestDigitalInfo(contentTitle) {
    const digitalModal = document.getElementById('digitalModal');
    if (digitalModal) {
        digitalModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
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

document.addEventListener('DOMContentLoaded', function() {
    new DigitalModal();
});