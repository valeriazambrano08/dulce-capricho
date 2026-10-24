// Menú hamburguesa para celulares
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('abierto');
});
// ===== Validación del formulario de contacto =====
// Por ahora solo valida en el navegador. Más adelante lo conectamos al backend.
const form = document.getElementById('formContacto');
const estado = document.getElementById('formEstado');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !correo || !mensaje) {
    estado.textContent = 'Ups, faltan campos por llenar 🥲';
    estado.className = 'form-estado error';
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    estado.textContent = 'Revisa tu correo, parece que no es válido.';
    estado.className = 'form-estado error';
    return;
  }

  estado.textContent = '¡Gracias! Recibimos tu mensaje 💕';
  estado.className = 'form-estado ok';
  form.reset();
});