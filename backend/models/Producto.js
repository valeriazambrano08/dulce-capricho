// Modelo de producto: define cómo se guarda cada postre en MongoDB.
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre:      { type: String, required: true, trim: true },
  categoria:   { type: String, required: true },
  emoji:       { type: String, default: '' },
  imagen:      { type: String, default: '' },
  precio:      { type: Number, required: true, min: 0 },
  descripcion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);