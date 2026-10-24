// Login y gestión de productos del panel de admin.
// OJO: es una demo. En un proyecto real el login se valida en un backend.
const USUARIO = 'admin';
const CLAVE = 'capricho2026';

const vistaLogin = document.getElementById('vistaLogin');
const vistaPanel = document.getElementById('vistaPanel');
const btnSalir = document.getElementById('btnSalir');

function mostrarPanel(si) {
  vistaLogin.style.display = si ? 'none' : 'block';
  vistaPanel.style.display = si ? 'block' : 'none';
  btnSalir.style.display = si ? 'inline-block' : 'none';
  if (si) dibujarTabla();
}

// Mantiene la sesión mientras la pestaña esté abierta
mostrarPanel(sessionStorage.getItem('admin_dc') === 'si');

document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault();
  const estado = document.getElementById('loginEstado');
  const u = document.getElementById('usuario').value.trim();
  const c = document.getElementById('clave').value;
  if (u === USUARIO && c === CLAVE) {
    sessionStorage.setItem('admin_dc', 'si');
    estado.textContent = '';
    mostrarPanel(true);
  } else {
    estado.textContent = 'Usuario o contraseña incorrectos 🥲';
    estado.className = 'form-estado error';
  }
});

btnSalir.addEventListener('click', () => {
  sessionStorage.removeItem('admin_dc');
  mostrarPanel(false);
});