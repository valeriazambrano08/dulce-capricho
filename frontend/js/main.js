// Menú hamburguesa para celulares
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('abierto');
});
// ===== Formulario de contacto: valida y envía a la API =====
const form = document.getElementById('formContacto');
const estado = document.getElementById('formEstado');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !mensaje) {
      estado.textContent = 'Ups, faltan campos por llenar.';
      estado.className = 'form-estado error';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      estado.textContent = 'Revisa tu correo, parece que no es válido.';
      estado.className = 'form-estado error';
      return;
    }

    estado.textContent = 'Enviando tu mensaje...';
    estado.className = 'form-estado';

    try {
      const res = await fetch(`${API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, mensaje })
      });
      if (!res.ok) throw new Error('Error del servidor');
      estado.textContent = '¡Gracias! Recibimos tu mensaje.';
      estado.className = 'form-estado ok';
      form.reset();
    } catch (err) {
      estado.textContent = 'No pudimos enviar tu mensaje. Intenta de nuevo en un momento.';
      estado.className = 'form-estado error';
    }
  });
}