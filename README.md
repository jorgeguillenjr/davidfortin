# David Fortín - Sitio Web Personal

Sitio web profesional para David Fortín, presentador de TV, modelo y arquitecto.

## Configuración del Formulario de Contacto

El sitio utiliza **FormSubmit** para el envío de emails. Los mensajes se envían directamente a `davidfortin04048@gmail.com`.

### Características del Formulario:
- ✅ Envío real de emails a davidfortin04048@gmail.com
- ✅ Validación en tiempo real
- ✅ Mensajes de confirmación
- ✅ Página de agradecimiento
- ✅ Diseño responsive

### Información de Contacto:
- **Email**: davidfortin04048@gmail.com
- **Teléfono**: +504 8882-1888
- **Ubicación**: Tegucigalpa, Honduras

### Servicios de Email Configurados:

#### 1. FormSubmit (Activo)
- **Servicio**: https://formsubmit.co/
- **Destino**: davidfortin04048@gmail.com
- **Configuración**: Sin registro requerido
- **Características**: 
  - Envío directo
  - Sin captcha
  - Formato de tabla HTML

#### 2. EmailJS (Alternativo)
Para configurar EmailJS como alternativa:

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar servicio de email
3. Crear template de email
4. Obtener claves públicas
5. Actualizar `EMAILJS_CONFIG` en `scripts/main.js`

### Estructura del Proyecto:
```
├── index.html          # Página principal
├── gracias.html        # Página de agradecimiento
├── styles/
│   ├── main.css        # Estilos principales
│   └── components.css  # Componentes y utilidades
├── scripts/
│   ├── main.js         # Funcionalidad principal
│   └── animations.js   # Animaciones avanzadas
└── public/
    └── David.jpg       # Foto principal
```

### Funcionalidades:
- **Navegación suave** entre secciones
- **Portfolio filtrable** por categorías
- **Formulario de contacto** funcional
- **Animaciones** y efectos visuales
- **Diseño responsive** para todos los dispositivos
- **Optimización SEO** básica

### Tecnologías Utilizadas:
- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla (ES6+)
- FormSubmit para envío de emails
- Google Fonts (Inter + Playfair Display)

### Instalación y Uso:
1. Clonar o descargar el proyecto
2. Abrir `index.html` en un navegador
3. Para desarrollo local, usar un servidor HTTP simple

### Contacto:
Los mensajes del formulario se envían automáticamente a **davidfortin04048@gmail.com**.