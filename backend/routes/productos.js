// Rutas de productos: listar, crear y borrar.
const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();
const verificarToken = require('../middleware/auth');

// GET /api/productos -> lista todos
router.get('/', async (req, res) => {
  try {
    res.json(await Producto.find().sort({ createdAt: 1 }));
  } catch (e) {
    res.status(500).json({ error: 'No se pudieron cargar los productos' });
  }
});

// POST /api/productos -> crea uno
router.post('/', verificarToken, async (req, res) => {
  try {
    res.status(201).json(await Producto.create(req.body));
  } catch (e) {
    res.status(400).json({ error: 'Datos inválidos: ' + e.message });
  }
});

// DELETE /api/productos/:id -> borra uno
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'No se pudo eliminar' });
  }
});

module.exports = router;