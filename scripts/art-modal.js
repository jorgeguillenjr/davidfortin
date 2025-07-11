// Funcionalidad del Modal de Galería de Arte

class ArtModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.currentImageIndex = 0;
        this.currentCollection = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Crear estructura del modal
        const modalHTML = `
            <div class="modal-overlay" id="artModal">
                <div class="modal-content art-modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                            </svg>
                            <span class="modal-title-text">Galería de Arte</span>
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body art-modal-body">
                        <div class="art-gallery-container">
                            <div class="gallery-main">
                                <div class="gallery-image-container">
                                    <button class="gallery-nav gallery-prev" aria-label="Imagen anterior">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="15,18 9,12 15,6"/>
                                        </svg>
                                    </button>
                                    <div class="gallery-image-wrapper">
                                        <img class="gallery-main-image" src="" alt="" />
                                        <div class="image-loading">
                                            <div class="loading-spinner"></div>
                                        </div>
                                    </div>
                                    <button class="gallery-nav gallery-next" aria-label="Imagen siguiente">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="9,18 15,12 9,6"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="gallery-info">
                                    <h3 class="gallery-title"></h3>
                                    <p class="gallery-description"></p>
                                    <div class="gallery-meta">
                                        <span class="image-counter"></span>
                                        <span class="image-details"></span>
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
                </div>
            </div>
        `;

        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('artModal');
    }

    getArtCollections() {
        return {
            'colores-urbanos': {
                title: 'Colores Urbanos',
                description: 'Exposición de arte contemporáneo que captura la esencia vibrante de la vida urbana moderna.',
                images: [
                    {
                        src: 'Images/contemporaneo.jpg',
                        alt: 'Colores Urbanos - Obra 1',
                        title: 'Vida Urbana',
                        details: 'Acrílico sobre lienzo, 80x60cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Colores Urbanos - Obra 2',
                        title: 'Reflejos de Ciudad',
                        details: 'Técnica mixta, 100x70cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Colores Urbanos - Obra 3',
                        title: 'Geometría Urbana',
                        details: 'Acrílico sobre lienzo, 90x60cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Colores Urbanos - Obra 4',
                        title: 'Luces de Neón',
                        details: 'Óleo sobre lienzo, 120x80cm'
                    }
                ]
            },
            'retratos-del-alma': {
                title: 'Retratos del Alma',
                description: 'Serie de pinturas al óleo que exploran la profundidad emocional del ser humano.',
                images: [
                    {
                        src: 'Images/naturaleza.jpg',
                        alt: 'Retratos del Alma - Obra 1',
                        title: 'Contemplación',
                        details: 'Óleo sobre lienzo, 70x50cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Retratos del Alma - Obra 2',
                        title: 'Introspección',
                        details: 'Óleo sobre lienzo, 60x40cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Retratos del Alma - Obra 3',
                        title: 'Emociones',
                        details: 'Óleo sobre lienzo, 80x60cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Retratos del Alma - Obra 4',
                        title: 'Serenidad',
                        details: 'Óleo sobre lienzo, 90x70cm'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Retratos del Alma - Obra 5',
                        title: 'Melancolía',
                        details: 'Óleo sobre lienzo, 75x55cm'
                    }
                ]
            },
            'identidad-hondurena': {
                title: 'Identidad Hondureña',
                description: 'Mural público en Tegucigalpa que celebra la rica cultura e historia de Honduras.',
                images: [
                    {
                        src: 'Images/virgencitasuyapa.jpg',
                        alt: 'Identidad Hondureña - Mural Principal',
                        title: 'Virgen de Suyapa',
                        details: 'Mural público, 15x8 metros'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Identidad Hondureña - Detalle 1',
                        title: 'Símbolos Patrios',
                        details: 'Detalle del mural, técnica mixta'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Identidad Hondureña - Detalle 2',
                        title: 'Tradiciones Ancestrales',
                        details: 'Sección del mural, acrílico'
                    },
                    {
                        src: 'https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&w=800',
                        alt: 'Identidad Hondureña - Detalle 3',
                        title: 'Paisajes Hondureños',
                        details: 'Fragmento del mural, óleo'
                    }
                ]
            }
        };
    }

    bindEvents() {
        // Eventos para abrir modal desde las imágenes del portfolio
        document.addEventListener('click', (e) => {
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="arte"]');
            
            if (portfolioItem) {
                const title = portfolioItem.querySelector('h3')?.textContent;
                let collectionKey = null;
                
                // Determinar qué colección abrir basado en el título
                if (title === 'Colores Urbanos') {
                    collectionKey = 'colores-urbanos';
                } else if (title === 'Retratos del Alma') {
                    collectionKey = 'retratos-del-alma';
                } else if (title === 'Identidad Hondureña') {
                    collectionKey = 'identidad-hondurena';
                }
                
                if (collectionKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openModal(collectionKey);
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
                prevButton.addEventListener('click', () => this.previousImage());
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', () => this.nextImage());
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
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openModal(collectionKey) {
        if (!this.modal) return;
        
        const collections = this.getArtCollections();
        this.currentCollection = collections[collectionKey];
        this.currentImageIndex = 0;
        
        if (!this.currentCollection) return;
        
        // Actualizar título del modal
        const titleText = this.modal.querySelector('.modal-title-text');
        if (titleText) {
            titleText.textContent = this.currentCollection.title;
        }
        
        // Generar thumbnails
        this.generateThumbnails();
        
        // Mostrar primera imagen
        this.showImage(0);
        
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
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        this.currentCollection = null;
        this.currentImageIndex = 0;
    }

    generateThumbnails() {
        const container = this.modal.querySelector('.thumbnails-container');
        if (!container || !this.currentCollection) return;
        
        container.innerHTML = '';
        
        this.currentCollection.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail';
            thumbnail.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" />
                <div class="thumbnail-overlay">
                    <span class="thumbnail-title">${image.title}</span>
                </div>
            `;
            
            thumbnail.addEventListener('click', () => {
                this.showImage(index);
            });
            
            container.appendChild(thumbnail);
        });
    }

    showImage(index) {
        if (!this.currentCollection || index < 0 || index >= this.currentCollection.images.length) return;
        
        this.currentImageIndex = index;
        const image = this.currentCollection.images[index];
        
        // Actualizar imagen principal
        const mainImage = this.modal.querySelector('.gallery-main-image');
        const imageWrapper = this.modal.querySelector('.gallery-image-wrapper');
        const loadingIndicator = this.modal.querySelector('.image-loading');
        
        if (mainImage && imageWrapper && loadingIndicator) {
            // Mostrar loading
            loadingIndicator.style.display = 'flex';
            mainImage.style.opacity = '0';
            
            // Cargar nueva imagen
            const newImage = new Image();
            newImage.onload = () => {
                mainImage.src = image.src;
                mainImage.alt = image.alt;
                loadingIndicator.style.display = 'none';
                mainImage.style.opacity = '1';
            };
            newImage.src = image.src;
        }
        
        // Actualizar información
        const title = this.modal.querySelector('.gallery-title');
        const description = this.modal.querySelector('.gallery-description');
        const counter = this.modal.querySelector('.image-counter');
        const details = this.modal.querySelector('.image-details');
        
        if (title) title.textContent = image.title;
        if (description) description.textContent = this.currentCollection.description;
        if (counter) counter.textContent = `${index + 1} de ${this.currentCollection.images.length}`;
        if (details) details.textContent = image.details;
        
        // Actualizar thumbnails activos
        const thumbnails = this.modal.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Actualizar botones de navegación
        const prevButton = this.modal.querySelector('.gallery-prev');
        const nextButton = this.modal.querySelector('.gallery-next');
        
        if (prevButton) prevButton.style.opacity = index === 0 ? '0.5' : '1';
        if (nextButton) nextButton.style.opacity = index === this.currentCollection.images.length - 1 ? '0.5' : '1';
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.showImage(this.currentImageIndex - 1);
        }
    }

    nextImage() {
        if (this.currentCollection && this.currentImageIndex < this.currentCollection.images.length - 1) {
            this.showImage(this.currentImageIndex + 1);
        }
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new ArtModal();
});