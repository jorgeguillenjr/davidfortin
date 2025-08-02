# David Fortín - Sitio Web Personal

Sitio web profesional para David Fortín, presentador de TV, modelo y arquitecto.

## Configuración del Formulario de Contacto

El sitio utiliza **Formspree** para el envío de emails. Los mensajes se envían directamente a `cotiza@davidfortin.me`.

### Características del Formulario:
- ✅ Envío real de emails a cotiza@davidfortin.me
- ✅ Validación en tiempo real
- ✅ Mensajes de confirmación
- ✅ Página de agradecimiento
- ✅ Diseño responsive

### Información de Contacto:
- **Email**: cotiza@davidfortin.me
- **Teléfono**: +504 8882-1888
- **Ubicación**: Tegucigalpa, Honduras

### Servicios de Email Configurados:

#### Formspree (Activo)
- **Servicio**: https://formspree.io/
- **Destino**: cotiza@davidfortin.me
- **Endpoint**: https://formspree.io/f/xdkogkvo
- **Características**: 
  - Envío confiable y rápido
  - Validación automática
  - Respuestas JSON para mejor manejo de errores
  - Sin problemas de CORS
  - Protección anti-spam integrada

### Configuración de Formspree:
El formulario está configurado para usar el endpoint `https://formspree.io/f/xdkogkvo` que está asociado con `cotiza@davidfortin.me`. 

Si necesitas cambiar el email de destino, simplemente actualiza el endpoint en `FORMSPREE_CONFIG` en `scripts/main.js`.

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
- Formspree para envío de emails
- Google Fonts (Inter + Playfair Display)

### Instalación y Uso:
1. Clonar o descargar el proyecto
2. Abrir `index.html` en un navegador
3. Para desarrollo local, usar un servidor HTTP simple

### Contacto:
Los mensajes del formulario se envían automáticamente a **cotiza@davidfortin.me**.