// Rutas de contacto: guardar mensajes (público) y listarlos (luego se protegerá con login).
const express = require('express');
const Mensaje = require('../models/Mensaje');
const router = express.Router();

// POST /api/contacto -> guarda un mensaje
router.post('/', async (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  if (!nombre || !correo || !mensaje || !/^\S+@\S+\.\S+$/.test(correo)) {
    return res.status(400).json({ error: 'Datos incompletos o correo inválido' });
  }
  try {
    await Mensaje.create({ nombre, correo, mensaje });
    res.status(201).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'No se pudo guardar el mensaje' });
  }
});

// GET /api/contacto -> lista mensajes (se protegerá con login)
router.get('/', async (req, res) => {
  try {
    res.json(await Mensaje.find().sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ error: 'No se pudieron cargar los mensajes' });
  }
});

module.exports = router;