# David Fortín - Sitio Web Personal

Sitio web profesional para David Fortín, presentador de TV, modelo y arquitecto.

## Configuración del Formulario de Contacto

El sitio utiliza **FormSubmit** para el envío de emails. Los mensajes se envían directamente a `cotiza@davidfortin.me`.

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

#### 1. FormSubmit (Activo)
- **Servicio**: https://formsubmit.co/
- **Destino**: cotiza@davidfortin.me
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
5. Actualizar `EMAILJS_CONFIG` en `scripts/main.js`:
   ```javascript
   const EMAILJS_CONFIG = {
       serviceId: 'tu_service_id',
       templateId: 'tu_template_id',
       publicKey: 'tu_public_key'
   };
   ```

#### 3. Configuración de Múltiples Métodos
El sistema ahora utiliza múltiples métodos de envío:
1. **EmailJS** (método principal si está configurado)
2. **FormSubmit con fetch** (fallback)
3. **FormSubmit directo** (último recurso)

Esto asegura que el formulario funcione incluso si uno de los servicios falla.

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
Los mensajes del formulario se envían automáticamente a **cotiza@davidfortin.me**.