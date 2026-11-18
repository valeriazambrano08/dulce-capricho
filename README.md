# Dulce Capricho 🍰
Postres artesanales. Sabor que enamora.
Proyecto final - Jóvenes CreaTIvos, Ruta Avanzada.

## Enlaces
- **Página publicada:** https://valeriazambrano08.github.io/dulce-capricho/frontend/index.html
- **API (backend):** https://dulce-capricho-api.onrender.com
- **Repositorio:** https://github.com/valeriazambrano08/dulce-capricho

## Funciones
- Home con marca propia, animaciones (AOS) y diseño responsive
- Catálogo con fotos, filtros por categoría
- Carrito con pedido por WhatsApp
- Formulario de contacto que guarda los mensajes en MongoDB
- Panel de administrador con login (token JWT): agregar y eliminar productos, ver mensajes
- Asesor de Antojos (chatbot basado en reglas), generador de dedicatorias y de posts para redes
- Sección de testimonios y botón flotante de WhatsApp

## Tecnologías
- **Frontend:** HTML, CSS y JavaScript, publicado en GitHub Pages
- **Backend:** Node.js y Express, publicado en Render
- **Base de datos:** MongoDB Atlas con Mongoose
- **Seguridad:** variables de entorno (.env) y autenticación con JWT

## Estructura
```
frontend/   css, js, images y páginas HTML
backend/    models, routes, middleware y server.js
```

## Cómo correrlo en local
1. En `backend/` crear un archivo `.env` con `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASS` y `JWT_SECRET`.
2. Dentro de `backend/`: `npm install` y luego `node server.js`.
3. Abrir `frontend/index.html` con Live Server.

## Próximos pasos
Conectar el chatbot y los generadores a un modelo de IA desde el backend.