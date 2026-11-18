// Rutas de IA: chatbot, dedicatorias y posts. La clave vive solo en el servidor.
const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();
const verificarToken = require('../middleware/auth');

const MODELO = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Llama a Gemini con instrucciones de sistema y el mensaje del usuario
async function preguntarIA(instrucciones, mensaje) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instrucciones }] },
      contents: [{ role: 'user', parts: [{ text: mensaje }] }],
      generationConfig: { maxOutputTokens: 400, temperature: 0.8 }
    })
  });
   if (!res.ok) throw new Error('Error de la IA: ' + res.status + ' ' + (await res.text()));
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

// Tono de marca + catálogo real desde MongoDB
async function instruccionesMarca() {
  const productos = await Producto.find();
  const catalogo = productos
    .map(p => `- ${p.nombre} ($${p.precio.toFixed(2)}): ${p.descripcion}`)
    .join('\n');
  return `Eres el "Asesor de Antojos" de Dulce Capricho, una marca de postres artesanales de Guayaquil con el eslogan "Sabor que enamora".
Tono: cercano, cálido, juguetón y un poquito coqueto. Hablas de "tú", frases cortas, máximo 1 emoji por mensaje.
Recomienda SOLO productos de este catálogo:
${catalogo}
Reglas: calcula cantidades razonables y el total aproximado; si piden algo que no vendemos, sugiere lo más parecido; para envíos, horarios o pedidos, invita a usar el formulario de contacto o el botón de WhatsApp; respuestas de máximo 5 líneas; si no sabes algo, dilo con simpatía y no inventes. Responde siempre en español.`;
}

// POST /api/ia/chat -> chatbot (público, con límite de largo)
router.post('/chat', async (req, res) => {
  const mensaje = String(req.body.mensaje || '').trim().slice(0, 300);
  if (!mensaje) return res.status(400).json({ error: 'Mensaje vacío' });
  try {
    res.json({ respuesta: await preguntarIA(await instruccionesMarca(), mensaje) });
  } catch (e) {
    console.error(e.message);
    res.status(502).json({ error: 'La IA no está disponible' });
  }
});

// POST /api/ia/dedicatoria -> mensaje para tarjeta (público)
router.post('/dedicatoria', async (req, res) => {
  const nombre = String(req.body.nombre || '').trim().slice(0, 40);
  const tono = ['romantico', 'divertido', 'tierno'].includes(req.body.tono) ? req.body.tono : 'tierno';
  if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });
  try {
    const texto = await preguntarIA(
      'Escribes dedicatorias cortas (máximo 2 frases) para tarjetas que acompañan un postre de la marca Dulce Capricho. Responde solo con la dedicatoria, en español.',
      `Para: ${nombre}. Tono: ${tono}.`
    );
    res.json({ respuesta: texto });
  } catch (e) {
    console.error(e.message);
    res.status(502).json({ error: 'La IA no está disponible' });
  }
});

// POST /api/ia/post -> post de Instagram (solo admin)
router.post('/post', verificarToken, async (req, res) => {
  const p = await Producto.findById(req.body.id).catch(() => null);
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
  try {
    const texto = await preguntarIA(
      await instruccionesMarca(),
      `Escribe un post de Instagram (máximo 4 líneas y 4 hashtags) para promocionar: ${p.nombre}, $${p.precio.toFixed(2)}. ${p.descripcion}`
    );
    res.json({ respuesta: texto });
  } catch (e) {
    console.error(e.message);
    res.status(502).json({ error: 'La IA no está disponible' });
  }
});

module.exports = router;