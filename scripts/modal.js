// Funcionalidad del Modal de Videos de TV

class TVModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createModal();
        this.createVideoPlayerModal();
        this.bindEvents();
    }

    createModal() {
        // Crear estructura del modal
        const modalHTML = `
            <div class="modal-overlay" id="tvModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            Trabajos en Televisión
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p>Descubre algunos de los programas y proyectos más destacados de David Fortín en televisión. Cada trabajo representa una experiencia única y un crecimiento profesional constante en el mundo del entretenimiento.</p>
                        </div>
                        <div class="videos-grid">
                            ${this.generateVideoItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('tvModal');
    }

    generateVideoItems() {
        const videos = [
            {
                title: "Programa Matutino - Canal Nacional",
                year: "2023-2024",
                duration: "Temporada Completa",
                type: "Programa de Variedades",
                description: "Conducción del programa matutino más visto del país, combinando entretenimiento, noticias y segmentos de interés general. Un espacio dinámico que conecta con la audiencia desde las primeras horas del día.",
                highlights: [
                    "Entrevistas a personalidades destacadas",
                    "Segmentos de cocina y estilo de vida",
                    "Cobertura de eventos especiales",
                    "Interacción en vivo con televidentes"
                ],
                videoNote: "Video disponible",
                videoSrc: "media/medios/tv-videos/LM5 - Truco de Magia.mp4",
                hasVideo: true
            },
            {
                title: "Especial de Fin de Año",
                year: "2023",
                duration: "3 horas",
                type: "Programa Especial",
                description: "Conducción del gran especial de fin de año, un evento televisivo que reunió a los mejores artistas nacionales e internacionales. Una noche llena de música, sorpresas y momentos inolvidables.",
                highlights: [
                    "Presentación de artistas internacionales",
                    "Números musicales en vivo",
                    "Entrevistas exclusivas",
                    "Conexión con celebraciones en todo el país"
                ],
                videoNote: "Próximamente disponible",
                hasVideo: false
            },
            {
                title: "Reality Show - Competencia Culinaria",
                year: "2022-2023",
                duration: "20 episodios",
                type: "Reality de Competencia",
                description: "Co-presentador del reality culinario más exitoso de la televisión hondureña. Un programa que combinó talento, drama y gastronomía, manteniendo a la audiencia al borde de sus asientos.",
                highlights: [
                    "Dinámicas de eliminación emocionantes",
                    "Jueces reconocidos internacionalmente",
                    "Retos culinarios innovadores",
                    "Historias humanas inspiradoras"
                ],
                videoNote: "Próximamente disponible",
                hasVideo: false
            },
            {
                title: "Programa de Entrevistas Nocturno",
                year: "2021-2022",
                duration: "2 temporadas",
                type: "Talk Show",
                description: "Conductor principal de un innovador programa de entrevistas nocturno, donde personalidades del entretenimiento, política y cultura compartieron sus historias más íntimas y proyectos más ambiciosos.",
                highlights: [
                    "Entrevistas en profundidad",
                    "Ambiente íntimo y relajado",
                    "Invitados de alto perfil",
                    "Segmentos de música en vivo"
                ],
                videoNote: "Próximamente disponible",
                hasVideo: false
            },
            {
                title: "Cobertura Especial - Eventos Deportivos",
                year: "2020-2024",
                duration: "Múltiples eventos",
                type: "Transmisiones Deportivas",
                description: "Presentador oficial en la cobertura de los eventos deportivos más importantes del país, incluyendo finales de fútbol, competencias internacionales y ceremonias de premiación.",
                highlights: [
                    "Finales de Liga Nacional",
                    "Competencias internacionales",
                    "Ceremonias de premiación",
                    "Entrevistas post-partido"
                ],
                videoNote: "Próximamente disponible",
                hasVideo: false
            },
            {
                title: "Programa Juvenil de Fin de Semana",
                year: "2019-2021",
                duration: "3 temporadas",
                type: "Programa Juvenil",
                description: "Conductor del programa juvenil más dinámico de los fines de semana, enfocado en música, tendencias, tecnología y todo lo que interesa a las nuevas generaciones.",
                highlights: [
                    "Música y artistas emergentes",
                    "Tendencias en redes sociales",
                    "Tecnología y gaming",
                    "Concursos y dinámicas interactivas"
                ],
                videoNote: "Próximamente disponible",
                hasVideo: false
            }
        ];

        return videos.map(video => `
            <div class="video-item">
                <div class="video-container" ${video.hasVideo ? `onclick="playVideo('${video.videoSrc}', '${video.title}')"` : ''}>
                    ${video.hasVideo ? `
                        <video class="video-preview" preload="metadata" poster="">
                            <source src="${video.videoSrc}" type="video/mp4">
                            Tu navegador no soporta videos HTML5.
                        </video>
                        <div class="video-play-overlay">
                            <svg class="video-play-icon" viewBox="0 0 24 24" fill="white" width="48" height="48">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                        </div>
                        <div class="video-available-badge">
                            <span>▶ Video Disponible</span>
                        </div>
                    ` : `
                        <div class="video-placeholder">
                            <svg class="video-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                            <p>${video.videoNote}</p>
                        </div>
                    `}
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <div class="video-meta">
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            ${video.year}
                        </div>
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                            ${video.duration}
                        </div>
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7h10v10"/>
                                <path d="M7 17L17 7"/>
                            </svg>
                            ${video.type}
                        </div>
                    </div>
                    <p class="video-description">${video.description}</p>
                    <div class="video-highlights">
                        <h4>Aspectos Destacados:</h4>
                        <ul class="highlights-list">
                            ${video.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="video-cta">
                        <button class="btn-video" onclick="${video.hasVideo ? `playVideo('${video.videoSrc}', '${video.title}')` : `showVideoMessage('${video.title}')`}">
                            <svg class="btn-video-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                            Ver Video
                        </button>
                        <button class="btn-video" onclick="requestMoreInfo('${video.title}')">
                            <svg class="btn-video-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h11l5-5v-2a2 2 0 0 0-2-2h-1"/>
                            </svg>
                            Más Info
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    createVideoPlayerModal() {
        const videoPlayerHTML = `
            <div class="modal-overlay" id="videoPlayerModal">
                <div class="video-player-content">
                    <div class="video-player-header">
                        <h3 class="video-player-title"></h3>
                        <button class="modal-close video-player-close" aria-label="Cerrar reproductor">×</button>
                    </div>
                    <div class="video-player-container">
                        <video class="main-video-player" controls preload="metadata">
                            <source src="" type="video/mp4">
                            Tu navegador no soporta videos HTML5.
                        </video>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', videoPlayerHTML);
        
        // Eventos para el reproductor de video
        const videoPlayerModal = document.getElementById('videoPlayerModal');
        const videoPlayerClose = videoPlayerModal.querySelector('.video-player-close');
        const mainVideoPlayer = videoPlayerModal.querySelector('.main-video-player');
        
        videoPlayerClose.addEventListener('click', () => {
            this.closeVideoPlayer();
        });
        
        videoPlayerModal.addEventListener('click', (e) => {
            if (e.target === videoPlayerModal) {
                this.closeVideoPlayer();
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoPlayerModal.classList.contains('active')) {
                this.closeVideoPlayer();
            }
        });
    }
    
    openVideoPlayer(videoSrc, videoTitle) {
        const videoPlayerModal = document.getElementById('videoPlayerModal');
        const videoPlayerTitle = videoPlayerModal.querySelector('.video-player-title');
        const mainVideoPlayer = videoPlayerModal.querySelector('.main-video-player source');
        const videoElement = videoPlayerModal.querySelector('.main-video-player');
        
        videoPlayerTitle.textContent = videoTitle;
        mainVideoPlayer.src = videoSrc;
        videoElement.load();
        
        videoPlayerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeVideoPlayer() {
        const videoPlayerModal = document.getElementById('videoPlayerModal');
        const videoElement = videoPlayerModal.querySelector('.main-video-player');
        
        videoElement.pause();
        videoElement.currentTime = 0;
        
        videoPlayerModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindEvents() {
        // Evento para abrir modal desde la imagen del portfolio
        document.addEventListener('click', (e) => {
            // Verificar si se hizo clic en la imagen o contenedor de imagen del item "Presentador de TV"
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Presentador de TV') {
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

// Función global para reproducir video
function playVideo(videoSrc, videoTitle) {
    // Obtener la instancia del modal de TV
    const tvModalInstance = window.tvModalInstance || new TVModal();
    window.tvModalInstance = tvModalInstance;
    
    tvModalInstance.openVideoPlayer(videoSrc, videoTitle);
}

// Funciones auxiliares para los botones de video
function showVideoMessage(videoTitle) {
    const message = `Los videos de "${videoTitle}" estarán disponibles próximamente. Para acceso inmediato, contacta directamente a David Fortín.`;
    
    // Crear un modal de confirmación más elegante
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal-overlay';
    confirmModal.innerHTML = `
        <div class="confirm-modal-content">
            <div class="confirm-modal-header">
                <h3>Video no disponible</h3>
                <button class="confirm-modal-close">×</button>
            </div>
            <div class="confirm-modal-body">
                <p>${message}</p>
                <div class="confirm-modal-actions">
                    <button class="btn-primary" onclick="this.closest('.confirm-modal-overlay').remove(); scrollToSection('contacto');">Contactar Ahora</button>
                    <button class="btn-secondary" onclick="this.closest('.confirm-modal-overlay').remove();">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    
    // Eventos de cierre para el modal de confirmación
    confirmModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('confirm-modal-overlay') || e.target.classList.contains('confirm-modal-close')) {
            confirmModal.remove();
        }
    });
    
    // Auto-remover después de 10 segundos
    setTimeout(() => {
        if (confirmModal.parentNode) {
            confirmModal.remove();
        }
    }, 10000);
}

function requestMoreInfo(videoTitle) {
    // Cerrar el modal principal primero
    const tvModal = document.getElementById('tvModal');
    if (tvModal) {
        tvModal.classList.remove('active');
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
                messageTextarea.value = `Hola David, me interesa conocer más detalles sobre tu trabajo en "${videoTitle}". `;
                messageTextarea.focus();
            }
        }, 1000);
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.tvModalInstance = new TVModal();
    new RadioModal();
});