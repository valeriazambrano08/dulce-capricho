// Generador de dedicatorias: el cliente elige para quién es y el tono.
// Funciona con plantillas en el navegador (sin servidor).
const PLANTILLAS = {
  romantico: [
    "{nombre}, eres el antojo que nunca quiero dejar de tener. Este postre es solo un pretexto para decirte que te quiero 💕",
    "Para {nombre}: dulce como tú y con un toque de capricho. Gracias por enamorarme cada día 🍫"
  ],
  divertido: [
    "{nombre}, este postre no se comparte… bueno, tal vez un poquito 😂🍰",
    "Para {nombre}: la dieta empieza mañana, hoy toca celebrar con algo dulce 🍩"
  ],
  tierno: [
    "{nombre}, ojalá este dulce te regale una sonrisa tan grande como lo que significas para mí 🌷",
    "Para {nombre}, con todo mi cariño: porque mereces cosas lindas y muy dulces ✨"
  ]
};

const formDed = document.getElementById('formDedicatoria');
const resDed = document.getElementById('resultadoDedicatoria');

formDed.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('dedNombre').value.trim();
  const tono = document.getElementById('dedTono').value;

  if (!nombre) {
    resDed.textContent = 'Dime para quién es el regalo 🥲';
    return;
  }
  resDed.textContent = 'Escribiendo tu mensaje... ✍️';
  setTimeout(() => {
    const opciones = PLANTILLAS[tono];
    const frase = opciones[Math.floor(Math.random() * opciones.length)];
    resDed.textContent = frase.replace('{nombre}', nombre);
  }, 600);
});