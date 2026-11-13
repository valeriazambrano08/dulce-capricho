// Login del administrador: compara con las credenciales del .env y devuelve un token.
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/login
router.post('/', (req, res) => {
  const { usuario, clave } = req.body;

  if (usuario === process.env.ADMIN_USER && clave === process.env.ADMIN_PASS) {
    const token = jwt.sign({ rol: 'admin' }, process.env.JWT_SECRET, { expiresIn: '4h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
});

module.exports = router;