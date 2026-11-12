// Servidor de Dulce Capricho: API con MongoDB.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());          // permite que el frontend (GitHub Pages) llame a esta API
app.use(express.json());  // permite leer JSON en las peticiones
app.use('/api/productos', require('./routes/productos'));
app.use('/api/contacto', require('./routes/contacto'));
// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Dulce Capricho funcionando' });
});

// Conexión a MongoDB y arranque del servidor
const PUERTO = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PUERTO, () => console.log(`Servidor en http://localhost:${PUERTO}`));
  })
  .catch((err) => {
    console.error('Error al conectar con MongoDB:', err.message);
  });