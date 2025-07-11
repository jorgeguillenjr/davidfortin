// Funcionalidad del Modal de Videos de TV

class TVModal {
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
            <div class="modal-overlay" id="tvModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            Presentador de TV
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
                videoNote: "Próximamente disponible"
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
                videoNote: "Destacados disponibles"
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
                videoNote: "Episodios completos en archivo"
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
                videoNote: "Mejores momentos disponibles"
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
                videoNote: "Archivo de transmisiones"
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
                videoNote: "Contenido en redes sociales"
            }
        ];

        return videos.map(video => `
            <div class="video-item">
                <div class="video-container">
                    <div class="video-placeholder">
                        <svg class="video-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                        <p>${video.videoNote}</p>
                    </div>
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
                        <button class="btn-video" onclick="showVideoMessage('${video.title}')">
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

// === MODAL DE RADIO ===
class RadioModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.currentAudio = null;
        this.currentPlayButton = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div class="modal-overlay radio-modal-overlay" id="radioModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                            </svg>
                            Locutor de Radio
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p>Descubre el trabajo de David Fortín como locutor de radio. Cada grabación representa su versatilidad vocal y su capacidad para conectar con diferentes audiencias a través del medio radiofónico.</p>
                        </div>
                        <div class="videos-grid">
                            ${this.generateAudioItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('radioModal');
    }

    generateAudioItems() {
        const audioItems = [
            {
                title: "Programa Matutino - Radio Nacional",
                year: "2023-2024",
                duration: "Segmentos Destacados",
                type: "Programa en Vivo",
                description: "Conducción del programa matutino más escuchado, combinando música, noticias y entretenimiento. Un espacio dinámico que acompaña a los oyentes en el inicio de su día.",
                highlights: [
                    "Entrevistas a artistas nacionales",
                    "Segmentos de humor y entretenimiento",
                    "Interacción con oyentes en vivo",
                    "Cobertura de eventos especiales"
                ],
                audioNote: "Demo disponible",
                audioFile: "audio/programa-matutino.mp3"
            },
            {
                title: "Spots Publicitarios",
                year: "2020-2024",
                duration: "Colección de Spots",
                type: "Publicidad Comercial",
                description: "Grabación de spots publicitarios para marcas reconocidas, demostrando versatilidad vocal y capacidad de adaptación a diferentes estilos y tonos comerciales.",
                highlights: [
                    "Marcas nacionales e internacionales",
                    "Diferentes estilos y tonos",
                    "Grabaciones en estudio profesional",
                    "Adaptación a target específicos"
                ],
                audioNote: "Muestra disponible",
                audioFile: "audio/spots-publicitarios.mp3"
            },
            {
                title: "Programa Nocturno de Música",
                year: "2022-2023",
                duration: "Mejores Momentos",
                type: "Programa Musical",
                description: "Conducción de programa nocturno especializado en música contemporánea, creando una atmósfera íntima y relajada para los oyentes nocturnos.",
                highlights: [
                    "Selección musical especializada",
                    "Ambiente nocturno relajado",
                    "Historias detrás de las canciones",
                    "Dedicatorias de oyentes"
                ],
                audioNote: "Extractos disponibles",
                audioFile: "audio/programa-nocturno.mp3"
            },
            {
                title: "Narración de Documentales",
                year: "2021-2023",
                duration: "Proyectos Especiales",
                type: "Narración Profesional",
                description: "Trabajo como narrador en documentales sobre cultura e historia hondureña, aportando una voz clara y expresiva que guía al espectador a través de las historias.",
                highlights: [
                    "Documentales culturales",
                    "Historia de Honduras",
                    "Narración expresiva y clara",
                    "Proyectos educativos"
                ],
                audioNote: "Muestras disponibles",
                audioFile: "audio/narracion-documentales.mp3"
            },
            {
                title: "Radio Deportiva - Transmisiones",
                year: "2020-2022",
                duration: "Momentos Destacados",
                type: "Transmisión Deportiva",
                description: "Participación en transmisiones deportivas, narrando los momentos más emocionantes del fútbol nacional con pasión y profesionalismo.",
                highlights: [
                    "Finales de Liga Nacional",
                    "Narración emocionante",
                    "Análisis técnico",
                    "Entrevistas post-partido"
                ],
                audioNote: "Highlights disponibles",
                audioFile: "audio/radio-deportiva.mp3"
            },
            {
                title: "Programa de Entrevistas",
                year: "2019-2021",
                duration: "Entrevistas Destacadas",
                type: "Talk Show Radial",
                description: "Conducción de programa de entrevistas donde personalidades de diferentes ámbitos compartieron sus experiencias y proyectos con los oyentes.",
                highlights: [
                    "Entrevistas en profundidad",
                    "Personalidades destacadas",
                    "Conversaciones íntimas",
                    "Temas de actualidad"
                ],
                audioNote: "Selecciones disponibles",
                audioFile: "audio/programa-entrevistas.mp3"
            }
        ];

        return audioItems.map((item, index) => `
            <div class="video-item">
                <div class="audio-container">
                    ${this.generateAudioPlayer(item, index)}
                </div>
                <div class="video-info">
                    <h3 class="video-title">${item.title}</h3>
                    <div class="video-meta">
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            ${item.year}
                        </div>
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                            ${item.duration}
                        </div>
                        <div class="video-meta-item">
                            <svg class="video-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                            </svg>
                            ${item.type}
                        </div>
                    </div>
                    <p class="video-description">${item.description}</p>
                    <div class="video-highlights">
                        <h4>Aspectos Destacados:</h4>
                        <ul class="highlights-list">
                            ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="video-cta">
                        <button class="btn-video" onclick="showAudioMessage('${item.title}')">
                            <svg class="btn-video-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                            </svg>
                            Descargar Audio
                        </button>
                        <button class="btn-video" onclick="requestMoreInfo('${item.title}')">
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

    generateAudioPlayer(item, index) {
        return `
            <div class="audio-placeholder">
                <div class="audio-player">
                    <div class="audio-title">${item.audioNote}</div>
                    <div class="audio-controls">
                        <button class="play-button" data-audio-index="${index}" onclick="radioModal.toggleAudio(${index})">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="6" y="4" width="4" height="16"/>
                                <rect x="14" y="4" width="4" height="16"/>
                            </svg>
                        </button>
                    </div>
                    <div class="audio-progress">
                        <div class="progress-bar" onclick="radioModal.seekAudio(event, ${index})">
                            <div class="progress-fill" id="progress-${index}"></div>
                        </div>
                        <div class="audio-time">
                            <span id="current-time-${index}">0:00</span>
                            <span id="duration-${index}">0:00</span>
                        </div>
                    </div>
                    <div class="volume-control">
                        <svg class="volume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                        <input type="range" class="volume-slider" min="0" max="100" value="70" onchange="radioModal.setVolume(${index}, this.value)">
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Evento para abrir modal desde la imagen del portfolio
        document.addEventListener('click', (e) => {
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Locutor de Radio') {
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
        
        // Pausar cualquier audio que esté reproduciéndose
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
            if (this.currentPlayButton) {
                this.currentPlayButton.classList.remove('playing');
                this.currentPlayButton = null;
            }
        }
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    toggleAudio(index) {
        const playButton = document.querySelector(`[data-audio-index="${index}"]`);
        
        // Si hay otro audio reproduciéndose, pausarlo
        if (this.currentAudio && this.currentAudio !== playButton.audioElement) {
            this.currentAudio.pause();
            if (this.currentPlayButton) {
                this.currentPlayButton.classList.remove('playing');
            }
        }

        // Si no existe el elemento de audio, simulamos la funcionalidad
        if (!playButton.audioElement) {
            // Simular audio (en producción aquí iría el archivo real)
            this.simulateAudioPlayback(index, playButton);
        } else {
            // Lógica para audio real
            if (playButton.audioElement.paused) {
                playButton.audioElement.play();
                playButton.classList.add('playing');
                this.currentAudio = playButton.audioElement;
                this.currentPlayButton = playButton;
            } else {
                playButton.audioElement.pause();
                playButton.classList.remove('playing');
                this.currentAudio = null;
                this.currentPlayButton = null;
            }
        }
    }

    simulateAudioPlayback(index, playButton) {
        if (playButton.isPlaying) {
            // Pausar simulación
            clearInterval(playButton.simulationInterval);
            playButton.classList.remove('playing');
            playButton.isPlaying = false;
            this.currentPlayButton = null;
        } else {
            // Iniciar simulación
            playButton.classList.add('playing');
            playButton.isPlaying = true;
            playButton.currentTime = playButton.currentTime || 0;
            playButton.duration = 180; // 3 minutos de duración simulada
            this.currentPlayButton = playButton;

            playButton.simulationInterval = setInterval(() => {
                playButton.currentTime += 1;
                const progress = (playButton.currentTime / playButton.duration) * 100;
                
                // Actualizar barra de progreso
                const progressFill = document.getElementById(`progress-${index}`);
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }
                
                // Actualizar tiempo
                const currentTimeEl = document.getElementById(`current-time-${index}`);
                const durationEl = document.getElementById(`duration-${index}`);
                if (currentTimeEl) {
                    currentTimeEl.textContent = this.formatTime(playButton.currentTime);
                }
                if (durationEl) {
                    durationEl.textContent = this.formatTime(playButton.duration);
                }
                
                // Terminar cuando llegue al final
                if (playButton.currentTime >= playButton.duration) {
                    clearInterval(playButton.simulationInterval);
                    playButton.classList.remove('playing');
                    playButton.isPlaying = false;
                    playButton.currentTime = 0;
                    this.currentPlayButton = null;
                    if (progressFill) {
                        progressFill.style.width = '0%';
                    }
                    if (currentTimeEl) {
                        currentTimeEl.textContent = '0:00';
                    }
                }
            }, 1000);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    seekAudio(event, index) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        
        const playButton = document.querySelector(`[data-audio-index="${index}"]`);
        if (playButton && playButton.duration) {
            playButton.currentTime = percentage * playButton.duration;
            const progressFill = document.getElementById(`progress-${index}`);
            if (progressFill) {
                progressFill.style.width = `${percentage * 100}%`;
            }
        }
    }

    setVolume(index, value) {
        // En una implementación real, aquí se ajustaría el volumen del audio
        console.log(`Volumen del audio ${index} ajustado a ${value}%`);
    }
}

// Función auxiliar para mostrar mensaje de audio
function showAudioMessage(audioTitle) {
    const message = `Los archivos de audio de "${audioTitle}" estarán disponibles próximamente para descarga. Para acceso inmediato, contacta directamente a David Fortín.`;
    
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal-overlay';
    confirmModal.innerHTML = `
        <div class="confirm-modal-content">
            <div class="confirm-modal-header">
                <h3>Audio no disponible</h3>
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
    
    confirmModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('confirm-modal-overlay') || e.target.classList.contains('confirm-modal-close')) {
            confirmModal.remove();
        }
    });
    
    setTimeout(() => {
        if (confirmModal.parentNode) {
            confirmModal.remove();
        }
    }, 10000);
}

// Variable global para acceso desde HTML
let radioModal;

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new TVModal();
    new RadioModal();
});