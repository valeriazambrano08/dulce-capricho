// "Guardia": revisa que la petición traiga un token válido.
const jwt = require('jsonwebtoken');

module.exports = function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization || '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Necesitas iniciar sesión' });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Sesión inválida o vencida' });
  }
};