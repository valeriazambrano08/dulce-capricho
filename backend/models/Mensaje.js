// Modelo de mensaje de contacto.
const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  nombre:  { type: String, required: true, trim: true },
  correo:  { type: String, required: true, trim: true },
  mensaje: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', mensajeSchema);