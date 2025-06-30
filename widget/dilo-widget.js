// DILO Widget - D'LOGIA JavaScript
(function() {
    'use strict';
    
    // Configuración
    const DILO_CONFIG = {
      streamlitUrl: 'https://dilo-asistente-virtual.streamlit.app', // Cambiar por tu URL de Streamlit
        position: 'bottom-right',
        autoShow: false,
        showBadge: true
    };

    // Crear el widget HTML
    function createWidget() {
        const widgetHTML = `
            <div class="dilo-widget" id="diloWidget">
                <button class="dilo-trigger" id="diloTrigger">
                    🤖
                    <div class="dilo-badge" id="diloBadge">!</div>
                </button>
                <div class="dilo-chat-container" id="diloChatContainer">
                    <div class="dilo-header">
                        <button class="dilo-close" id="diloClose">×</button>
                        <div class="dilo-logo">D'LOGIA</div>
                        <div class="dilo-tagline">Soluciones empresariales inteligentes</div>
                    </div>
                    <div class="dilo-iframe-container">
                        <iframe 
                            class="dilo-iframe" 
                            id="diloIframe"
                            src="${DILO_CONFIG.streamlitUrl}"
                            title="DILO - Asistente Virtual D'LOGIA"
                            loading="lazy">
                        </iframe>
                        <div class="dilo-offline" id="diloOffline" style="display: none;">
                            <div>🤖</div>
                            <div>DILO no está disponible</div>
                            <div style="font-size: 12px; margin-top: 10px;">
                                Contáctanos en: contacto.dlogia@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    // Inicializar funcionalidad
    function initWidget() {
        const trigger = document.getElementById('diloTrigger');
        const container = document.getElementById('diloChatContainer');
        const closeBtn = document.getElementById('diloClose');
        const badge = document.getElementById('diloBadge');
        const iframe = document.getElementById('diloIframe');
        const offline = document.getElementById('diloOffline');

        // Abrir chat
        trigger.addEventListener('click', function() {
            container.classList.add('active');
            if (badge) badge.style.display = 'none';
            
            // Analytics (opcional)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'dilo_chat_opened', {
                    'event_category': 'engagement',
                    'event_label': 'chatbot'
                });
            }
        });

        // Cerrar chat
        closeBtn.addEventListener('click', function() {
            container.classList.remove('active');
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dilo-widget')) {
                container.classList.remove('active');
            }
        });

        // Manejar errores de carga del iframe
        iframe.addEventListener('error', function() {
            iframe.style.display = 'none';
            offline.style.display = 'flex';
        });

        // Ocultar badge después de 10 segundos
        if (badge && DILO_CONFIG.showBadge) {
            setTimeout(function() {
                badge.style.display = 'none';
            }, 10000);
        }

        // Efecto de rebote inicial
        setTimeout(function() {
            trigger.style.animation = 'none';
            trigger.style.transform = 'scale(1.1)';
            setTimeout(function() {
                trigger.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }

    // Cargar CSS si no está cargado
    function loadCSS() {
        if (!document.querySelector('link[href*="dilo-widget.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './widget/dilo-widget.css';
            document.head.appendChild(link);
        }
    }

    // Inicializar cuando el DOM esté listo
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                loadCSS();
                createWidget();
                initWidget();
            });
        } else {
            loadCSS();
            createWidget();
            initWidget();
        }
    }

    // API pública para controlar el widget
    window.DILO = {
        open: function() {
            const container = document.getElementById('diloChatContainer');
            if (container) container.classList.add('active');
        },
        close: function() {
            const container = document.getElementById('diloChatContainer');
            if (container) container.classList.remove('active');
        },
        toggle: function() {
            const container = document.getElementById('diloChatContainer');
            if (container) container.classList.toggle('active');
        }
    };

    // Inicializar
    init();
})();
