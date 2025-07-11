// Funcionalidad del Modal de Proyectos de Arquitectura

class ArchitectureModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.currentMediaIndex = 0;
        this.currentProject = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Crear estructura del modal
        const modalHTML = `
            <div class="modal-overlay" id="architectureModal">
                <div class="modal-content architecture-modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M3 21h18"/>
                                <path d="M5 21V7l8-4v18"/>
                                <path d="M19 21V11l-6-4"/>
                                <circle cx="12" cy="8" r="2"/>
                                <path d="M8 14h8"/>
                                <path d="M8 18h8"/>
                            </svg>
                            <span class="modal-title-text">Proyectos de Arquitectura</span>
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body architecture-modal-body">
                        <div class="architecture-gallery-container">
                            <div class="gallery-main">
                                <div class="gallery-media-container">
                                    <button class="gallery-nav gallery-prev" aria-label="Media anterior">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="15,18 9,12 15,6"/>
                                        </svg>
                                    </button>
                                    <div class="gallery-media-wrapper">
                                        <img class="gallery-main-image" src="" alt="" style="display: none;" />
                                        <video class="gallery-main-video" controls style="display: none;">
                                            <source src="" type="video/mp4">
                                            Tu navegador no soporta videos HTML5.
                                        </video>
                                        <div class="media-loading">
                                            <div class="loading-spinner"></div>
                                        </div>
                                    </div>
                                    <button class="gallery-nav gallery-next" aria-label="Media siguiente">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="9,18 15,12 9,6"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="gallery-info">
                                    <h3 class="gallery-title"></h3>
                                    <p class="gallery-description"></p>
                                    <div class="gallery-meta">
                                        <span class="media-counter"></span>
                                        <span class="media-details"></span>
                                        <span class="media-type-indicator"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="gallery-thumbnails">
                                <div class="thumbnails-container">
                                    <!-- Thumbnails se generan dinámicamente -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="architecture-cta">
                        <button class="btn-architecture" onclick="requestArchitectureInfo('${media.title}', '${this.currentProject?.title || 'Proyecto'}')">
                            <svg class="btn-architecture-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h11l5-5v-2a2 2 0 0 0-2-2h-1"/>
                            </svg>
                            Más Info
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('architectureModal');
    }

    getArchitectureProjects() {
        return {
            'villa-contemporanea': {
                title: 'Villa Contemporánea',
                description: 'Residencia privada de 450m² que combina elegancia moderna con funcionalidad familiar. Diseño arquitectónico que integra espacios abiertos, iluminación natural y materiales de alta calidad.',
                media: [
                    {
                        type: 'image',
                        src: 'Images/urbanizacion.jpg',
                        alt: 'Villa Contemporánea - Fachada Principal',
                        title: 'Fachada Principal',
                        details: 'Vista frontal de la residencia, 450m²'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        alt: 'Villa Contemporánea - Recorrido Virtual',
                        title: 'Recorrido Virtual',
                        details: 'Tour completo por los espacios interiores'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Villa Contemporánea - Sala Principal',
                        title: 'Sala Principal',
                        details: 'Espacio de estar con doble altura'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Villa Contemporánea - Cocina Moderna',
                        title: 'Cocina Moderna',
                        details: 'Cocina integral con isla central'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
                        alt: 'Villa Contemporánea - Área Exterior',
                        title: 'Área Exterior',
                        details: 'Jardín y área de piscina'
                    }
                ]
            },
            'oficinas-corporativas': {
                title: 'Oficinas Corporativas',
                description: 'Espacio de trabajo innovador de 800m² diseñado para maximizar la productividad y el bienestar de los empleados. Arquitectura corporativa moderna con espacios colaborativos y tecnología integrada.',
                media: [
                    {
                        type: 'image',
                        src: 'Images/edificios.jpg',
                        alt: 'Oficinas Corporativas - Edificio Principal',
                        title: 'Edificio Principal',
                        details: 'Fachada corporativa moderna, 800m²'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Oficinas Corporativas - Lobby Principal',
                        title: 'Lobby Principal',
                        details: 'Recepción con diseño minimalista'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        alt: 'Oficinas Corporativas - Espacios de Trabajo',
                        title: 'Espacios de Trabajo',
                        details: 'Tour por las áreas de oficina'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Oficinas Corporativas - Sala de Juntas',
                        title: 'Sala de Juntas',
                        details: 'Sala ejecutiva con tecnología integrada'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Oficinas Corporativas - Área Colaborativa',
                        title: 'Área Colaborativa',
                        details: 'Espacios abiertos para trabajo en equipo'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
                        alt: 'Oficinas Corporativas - Vista Nocturna',
                        title: 'Vista Nocturna',
                        details: 'Iluminación arquitectónica exterior'
                    }
                ]
            },
            'centro-cultural': {
                title: 'Centro Cultural Moderno',
                description: 'Espacio público multifuncional de 1200m² que sirve como centro de actividades culturales y comunitarias. Diseño arquitectónico que fomenta la interacción social y celebra la identidad cultural local.',
                media: [
                    {
                        type: 'image',
                        src: 'Images/consultores.jpg',
                        alt: 'Centro Cultural - Fachada Principal',
                        title: 'Fachada Principal',
                        details: 'Entrada principal del centro, 1200m²'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                        alt: 'Centro Cultural - Recorrido Completo',
                        title: 'Recorrido Completo',
                        details: 'Tour por todas las instalaciones'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Centro Cultural - Auditorio Principal',
                        title: 'Auditorio Principal',
                        details: 'Capacidad para 300 personas'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Centro Cultural - Galería de Arte',
                        title: 'Galería de Arte',
                        details: 'Espacio para exposiciones temporales'
                    },
                    {
                        type: 'image',
                        src: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Centro Cultural - Plaza Central',
                        title: 'Plaza Central',
                        details: 'Área de encuentro y eventos al aire libre'
                    },
                    {
                        type: 'video',
                        src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
                        alt: 'Centro Cultural - Actividades Nocturnas',
                        title: 'Actividades Nocturnas',
                        details: 'El centro durante eventos culturales'
                    }
                ]
            }
        };
    }

    bindEvents() {
        // Eventos para abrir modal desde las imágenes del portfolio
        document.addEventListener('click', (e) => {
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="arquitectura"]');
            
            if (portfolioItem) {
                const title = portfolioItem.querySelector('h3')?.textContent;
                let projectKey = null;
                
                // Determinar qué proyecto abrir basado en el título
                if (title === 'Villa Contemporánea') {
                    projectKey = 'villa-contemporanea';
                } else if (title === 'Oficinas Corporativas') {
                    projectKey = 'oficinas-corporativas';
                } else if (title === 'Centro Cultural') {
                    projectKey = 'centro-cultural';
                }
                
                if (projectKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openModal(projectKey);
                }
            }
        });

        // Eventos del modal
        if (this.modal) {
            // Botón cerrar
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.closeModal();
                });
            }
            
            // Cerrar al hacer clic en el overlay
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

            // Navegación de galería
            const prevButton = this.modal.querySelector('.gallery-prev');
            const nextButton = this.modal.querySelector('.gallery-next');
            
            if (prevButton) {
                prevButton.addEventListener('click', () => this.previousMedia());
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', () => this.nextMedia());
            }
        }

        // Cerrar con tecla Escape y navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (this.isOpen) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousMedia();
                        break;
                    case 'ArrowRight':
                        this.nextMedia();
                        break;
                }
            }
        });
    }

    openModal(projectKey) {
        if (!this.modal) return;
        
        const projects = this.getArchitectureProjects();
        this.currentProject = projects[projectKey];
        this.currentMediaIndex = 0;
        
        if (!this.currentProject) return;
        
        // Actualizar título del modal
        const titleText = this.modal.querySelector('.modal-title-text');
        if (titleText) {
            titleText.textContent = this.currentProject.title;
        }
        
        // Generar thumbnails
        this.generateThumbnails();
        
        // Mostrar primer media
        this.showMedia(0);
        
        // Actualizar botones
        this.updateArchitectureButtons();
        
        // Abrir modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus para accesibilidad
        setTimeout(() => {
            const closeButton = this.modal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.focus();
            }
        }, 300);
    }

    closeModal() {
        if (!this.modal) return;
        
        // Pausar cualquier video que esté reproduciéndose
        const video = this.modal.querySelector('.gallery-main-video');
        if (video) {
            video.pause();
        }
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        this.currentProject = null;
        this.currentMediaIndex = 0;
    }

    generateThumbnails() {
        const container = this.modal.querySelector('.thumbnails-container');
        if (!container || !this.currentProject) return;
        
        container.innerHTML = '';
        
        this.currentProject.media.forEach((media, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            
            const mediaIcon = media.type === 'video' ? 
                '<div class="video-play-overlay"><svg viewBox="0 0 24 24" fill="white" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg></div>' : '';
            
            thumbnail.innerHTML = `
                <img src="${media.type === 'video' ? 'https://via.placeholder.com/100x80/f5f1eb/d4af7a?text=VIDEO' : media.src}" alt="${media.alt}" />
                ${mediaIcon}
                <div class="thumbnail-overlay">
                    <span class="thumbnail-title">${media.title}</span>
                </div>
            `;
            
            thumbnail.addEventListener('click', () => {
                this.showMedia(index);
            });
            
            container.appendChild(thumbnail);
        });
    }

    showMedia(index) {
        if (!this.currentProject || index < 0 || index >= this.currentProject.media.length) return;
        
        this.currentMediaIndex = index;
        const media = this.currentProject.media[index];
        
        // Obtener elementos
        const mainImage = this.modal.querySelector('.gallery-main-image');
        const mainVideo = this.modal.querySelector('.gallery-main-video');
        const loadingIndicator = this.modal.querySelector('.media-loading');
        
        // Ocultar ambos elementos primero
        mainImage.style.display = 'none';
        mainVideo.style.display = 'none';
        loadingIndicator.style.display = 'flex';
        
        if (media.type === 'video') {
            // Mostrar video
            mainVideo.src = media.src;
            mainVideo.style.display = 'block';
            loadingIndicator.style.display = 'none';
        } else {
            // Mostrar imagen
            const newImage = new Image();
            newImage.onload = () => {
                mainImage.src = media.src;
                mainImage.alt = media.alt;
                mainImage.style.display = 'block';
                loadingIndicator.style.display = 'none';
            };
            newImage.src = media.src;
        }
        
        // Actualizar información
        const title = this.modal.querySelector('.gallery-title');
        const description = this.modal.querySelector('.gallery-description');
        const counter = this.modal.querySelector('.media-counter');
        const details = this.modal.querySelector('.media-details');
        const typeIndicator = this.modal.querySelector('.media-type-indicator');
        
        if (title) title.textContent = media.title;
        if (description) description.textContent = this.currentProject.description;
        if (counter) counter.textContent = `${index + 1} de ${this.currentProject.media.length}`;
        if (details) details.textContent = media.details;
        if (typeIndicator) {
            typeIndicator.textContent = media.type === 'video' ? '🎥 Video' : '📷 Fotografía';
            typeIndicator.style.color = media.type === 'video' ? '#dc3545' : '#28a745';
        }
        
        // Actualizar thumbnails activos
        const thumbnails = this.modal.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Actualizar botones de navegación
        const prevButton = this.modal.querySelector('.gallery-prev');
        const nextButton = this.modal.querySelector('.gallery-next');
        
        if (prevButton) prevButton.style.opacity = index === 0 ? '0.5' : '1';
        if (nextButton) nextButton.style.opacity = index === this.currentProject.media.length - 1 ? '0.5' : '1';
    }

    updateArchitectureButtons() {
        // Actualizar los botones con la información correcta
        const archButtons = this.modal.querySelectorAll('.btn-architecture');
        archButtons.forEach((button, index) => {
            if (this.currentProject && this.currentProject.media[index]) {
                const media = this.currentProject.media[index];
                button.setAttribute('onclick', `requestArchitectureInfo('${media.title}', '${this.currentProject.title}')`);
            }
        });
    }

    previousMedia() {
        if (this.currentMediaIndex > 0) {
            this.showMedia(this.currentMediaIndex - 1);
        }
    }

    nextMedia() {
        if (this.currentProject && this.currentMediaIndex < this.currentProject.media.length - 1) {
            this.showMedia(this.currentMediaIndex + 1);
        }
    }
}

// Función auxiliar para solicitar información de arquitectura
function requestArchitectureInfo(mediaTitle, projectTitle) {
    // Cerrar el modal principal primero
    const architectureModal = document.getElementById('architectureModal');
    if (architectureModal) {
        architectureModal.classList.remove('active');
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
                subjectSelect.value = 'Arquitectura';
            }
            if (messageTextarea) {
                messageTextarea.value = `Hola David, me interesa conocer más detalles sobre "${mediaTitle}" del proyecto "${projectTitle}". `;
                messageTextarea.focus();
            }
        }, 1000);
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new ArchitectureModal();
});