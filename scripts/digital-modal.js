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
            instagram: `<svg viewBox="0 0 24 24" fill="${color}" stroke="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" stroke-width="2"/>
            </svg>`
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