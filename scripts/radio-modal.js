// Funcionalidad del Modal de Audio de Radio

class RadioModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.currentAudio = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Crear estructura del modal
        const modalHTML = `
            <div class="modal-overlay" id="radioModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <svg class="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path d="M12 14l-9-5 9 5z"/>
                            </svg>
                            Trabajos en Radio
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p>Escucha algunos de los trabajos más destacados de David Fortín en radio. Desde spots publicitarios hasta programas completos, cada audio representa la versatilidad y profesionalismo de su voz.</p>
                        </div>
                        <div class="audio-grid">
                            ${this.generateAudioItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('radioModal');
    }

    generateAudioItems() {
        const audios = [
            {
                title: "Spot Publicitario - Banco Nacional",
                year: "2024",
                duration: "30 segundos",
                type: "Publicidad Comercial",
                description: "Voz comercial para campaña publicitaria del banco más importante del país. Un tono profesional y confiable que transmite seguridad y credibilidad a los clientes.",
                highlights: [
                    "Voz institucional y profesional",
                    "Mensaje claro y directo",
                    "Tono confiable y seguro",
                    "Perfecta dicción y timing"
                ],
                audioNote: "Audio disponible"
            },
            {
                title: "Programa Radial Matutino",
                year: "2023-2024",
                duration: "2 horas",
                type: "Programa de Entretenimiento",
                description: "Conducción del programa radial matutino más escuchado de la capital. Un espacio dinámico con música, noticias, entrevistas y entretenimiento para comenzar el día con energía.",
                highlights: [
                    "Conducción dinámica y carismática",
                    "Interacción con oyentes",
                    "Entrevistas en vivo",
                    "Segmentos de entretenimiento"
                ],
                audioNote: "Extractos disponibles"
            },
            {
                title: "Campaña Publicitaria - Telecomunicaciones",
                year: "2023",
                duration: "45 segundos",
                type: "Spot Publicitario",
                description: "Serie de spots publicitarios para la empresa de telecomunicaciones líder del país. Voz versátil adaptada a diferentes productos y servicios con un enfoque moderno y juvenil.",
                highlights: [
                    "Voz versátil y adaptable",
                    "Tono moderno y juvenil",
                    "Múltiples variaciones",
                    "Enfoque en innovación tecnológica"
                ],
                audioNote: "Serie completa disponible"
            },
            {
                title: "Narración Documental - Historia Nacional",
                year: "2022",
                duration: "45 minutos",
                type: "Narración Documental",
                description: "Narración del documental sobre la historia de Honduras, transmitido en televisión nacional. Una voz educativa y envolvente que guía al espectador a través de los momentos más importantes del país.",
                highlights: [
                    "Narración educativa y clara",
                    "Tono respetuoso y solemne",
                    "Perfecta pronunciación",
                    "Ritmo narrativo envolvente"
                ],
                audioNote: "Fragmentos destacados"
            },
            {
                title: "Jingles y Identificaciones",
                year: "2021-2024",
                duration: "5-15 segundos",
                type: "Identificaciones Radiales",
                description: "Colección de jingles e identificaciones para diversas estaciones de radio y programas. Voces dinámicas y memorables que crean identidad sonora única para cada cliente.",
                highlights: [
                    "Voces dinámicas y energéticas",
                    "Identificaciones memorables",
                    "Adaptación a diferentes estilos",
                    "Creación de identidad sonora"
                ],
                audioNote: "Colección disponible"
            },
            {
                title: "Audiolibro - Literatura Hondureña",
                year: "2022",
                duration: "3 horas",
                type: "Narración Literaria",
                description: "Narración completa de una obra clásica de la literatura hondureña. Una interpretación cuidadosa que respeta el texto original mientras aporta vida y emoción a cada personaje.",
                highlights: [
                    "Interpretación de múltiples personajes",
                    "Respeto al texto original",
                    "Narración emotiva y envolvente",
                    "Excelente control de ritmo"
                ],
                audioNote: "Capítulos disponibles"
            }
        ];

        return audios.map((audio, index) => `
            <div class="audio-item">
                <div class="audio-container">
                    <div class="audio-player" data-audio-id="${index}">
                        <button class="play-btn" onclick="toggleAudio(${index})">
                            <svg class="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                <rect x="6" y="4" width="4" height="16"/>
                                <rect x="14" y="4" width="4" height="16"/>
                            </svg>
                        </button>
                        <div class="audio-info">
                            <div class="audio-title-mini">${audio.title}</div>
                            <div class="audio-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 0%"></div>
                                </div>
                                <div class="audio-time">
                                    <span class="current-time">0:00</span>
                                    <span class="total-time">${audio.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div class="volume-control">
                            <svg class="volume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                        </div>
                    </div>
                    <div class="audio-note">${audio.audioNote}</div>
                </div>
                <div class="audio-details">
                    <h3 class="audio-title">${audio.title}</h3>
                    <div class="audio-meta">
                        <div class="audio-meta-item">
                            <svg class="audio-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            ${audio.year}
                        </div>
                        <div class="audio-meta-item">
                            <svg class="audio-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                            ${audio.duration}
                        </div>
                        <div class="audio-meta-item">
                            <svg class="audio-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7h10v10"/>
                                <path d="M7 17L17 7"/>
                            </svg>
                            ${audio.type}
                        </div>
                    </div>
                    <p class="audio-description">${audio.description}</p>
                    <div class="audio-highlights">
                        <h4>Aspectos Destacados:</h4>
                        <ul class="highlights-list">
                            ${audio.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="audio-cta">
                        <button class="btn-audio" onclick="showAudioMessage('${audio.title}')">
                            <svg class="btn-audio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                            Escuchar Audio
                        </button>
                        <button class="btn-audio" onclick="requestAudioAccess('${audio.title}')">
                            <svg class="btn-audio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
            // Verificar si se hizo clic en la imagen o contenedor de imagen del item "Locutor de Radio"
            const portfolioImage = e.target.closest('.portfolio-image');
            const portfolioItem = portfolioImage?.closest('.portfolio-item[data-category="medios"]');
            
            if (portfolioItem && portfolioItem.querySelector('h3')?.textContent === 'Locutor de Radio') {
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
        
        // Pausar cualquier audio que esté reproduciéndose
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
            this.resetAllPlayers();
        }
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        
        // Restaurar focus al elemento que abrió el modal
        const portfolioItem = document.querySelector('.portfolio-item[data-category="medios"] h3');
        if (portfolioItem) {
            portfolioItem.focus();
        }
    }

    resetAllPlayers() {
        const playButtons = this.modal.querySelectorAll('.play-btn');
        const progressFills = this.modal.querySelectorAll('.progress-fill');
        const currentTimes = this.modal.querySelectorAll('.current-time');
        
        playButtons.forEach(btn => {
            const playIcon = btn.querySelector('.play-icon');
            const pauseIcon = btn.querySelector('.pause-icon');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });
        
        progressFills.forEach(fill => {
            fill.style.width = '0%';
        });
        
        currentTimes.forEach(time => {
            time.textContent = '0:00';
        });
    }
}

// Funciones auxiliares para los botones de audio
function showAudioMessage(audioTitle) {
    const message = `Los audios completos de "${audioTitle}" están disponibles bajo solicitud. Para acceso inmediato, contacta directamente a David Fortín.`;
    
    // Crear un modal de confirmación más elegante
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal-overlay';
    confirmModal.innerHTML = `
        <div class="confirm-modal-content">
            <div class="confirm-modal-header">
                <h3>Audio disponible bajo solicitud</h3>
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

// Funciones auxiliares para los controles de audio
function toggleAudio(audioId) {
    const radioModal = document.getElementById('radioModal');
    if (!radioModal) return;
    
    const playBtn = radioModal.querySelector(`[data-audio-id="${audioId}"] .play-btn`);
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    
    // Simular reproducción (en producción aquí iría el audio real)
    if (playIcon.style.display !== 'none') {
        // Iniciar "reproducción"
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        simulateAudioProgress(audioId);
    } else {
        // Pausar "reproducción"
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        clearInterval(window.audioInterval);
    }
}

function simulateAudioProgress(audioId) {
    const radioModal = document.getElementById('radioModal');
    const progressFill = radioModal.querySelector(`[data-audio-id="${audioId}"] .progress-fill`);
    const currentTime = radioModal.querySelector(`[data-audio-id="${audioId}"] .current-time`);
    
    let progress = 0;
    let seconds = 0;
    
    window.audioInterval = setInterval(() => {
        progress += 1;
        seconds += 1;
        
        if (progress <= 100) {
            progressFill.style.width = `${progress}%`;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            currentTime.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            clearInterval(window.audioInterval);
            // Reset player
            const playBtn = radioModal.querySelector(`[data-audio-id="${audioId}"] .play-btn`);
            const playIcon = playBtn.querySelector('.play-icon');
            const pauseIcon = playBtn.querySelector('.pause-icon');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progressFill.style.width = '0%';
            currentTime.textContent = '0:00';
        }
    }, 200); // Simula progreso rápido para demostración
}

function requestAudioAccess(audioTitle) {
    // Cerrar el modal principal primero
    const radioModal = document.getElementById('radioModal');
    if (radioModal) {
        radioModal.classList.remove('active');
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
                messageTextarea.value = `Hola David, me interesa obtener el audio completo de "${audioTitle}". `;
                messageTextarea.focus();
            }
        }, 1000);
    }
}