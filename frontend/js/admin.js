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
// ===== Gestión de productos (guarda en localStorage) =====
const EMOJIS = { alfajores: '🍪', brownies: '🍫', cheesecake: '🍓', tortas: '🍰', pave: '🥧', 'mini-donas': '🍩' };

function guardar(lista) {
  localStorage.setItem('productos_dc', JSON.stringify(lista));
  dibujarTabla();
}

function dibujarTabla() {
  const tbody = document.getElementById('tablaProductos');
  tbody.innerHTML = obtenerProductos().map(p => `
    <tr>
      <td>${p.emoji} ${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${Number(p.precio).toFixed(2)}</td>
      <td><button class="btn-borrar" data-id="${p.id}" title="Eliminar">🗑️</button></td>
    </tr>`).join('');
}

document.getElementById('formProducto').addEventListener('submit', (e) => {
  e.preventDefault();
  const estado = document.getElementById('productoEstado');
  const nombre = document.getElementById('pNombre').value.trim();
  const categoria = document.getElementById('pCategoria').value;
  const precio = parseFloat(document.getElementById('pPrecio').value);
  const descripcion = document.getElementById('pDescripcion').value.trim();

  if (!nombre || isNaN(precio) || !descripcion) {
    estado.textContent = 'Completa nombre, precio y descripción 🥲';
    estado.className = 'form-estado error';
    return;
  }
  const lista = obtenerProductos();
  const nuevoId = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1;
  lista.push({ id: nuevoId, nombre, categoria, emoji: EMOJIS[categoria], precio, descripcion });
  guardar(lista);
  e.target.reset();
  estado.textContent = '¡Producto agregado! 🎉';
  estado.className = 'form-estado ok';
});

document.getElementById('tablaProductos').addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (confirm('¿Eliminar este producto?')) {
    guardar(obtenerProductos().filter(p => p.id !== Number(id)));
  }
});

document.getElementById('btnRestaurar').addEventListener('click', () => {
  if (confirm('¿Volver al catálogo original?')) {
    localStorage.removeItem('productos_dc');
    dibujarTabla();
  }
});
// ===== Generador de posts para Instagram =====
const selPost = document.getElementById('postProducto');
const resPost = document.getElementById('resultadoPost');

function llenarSelect() {
  selPost.innerHTML = obtenerProductos()
    .map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
}
llenarSelect();

document.getElementById('btnPost').addEventListener('click', () => {
  const p = obtenerProductos().find(x => x.id === Number(selPost.value));
  if (!p) { resPost.textContent = 'Elige un producto primero 🥲'; return; }
  resPost.textContent = 'Preparando tu post... ✨';
  setTimeout(() => {
    resPost.textContent =
`${p.emoji} ¡Antojo del día! ${p.nombre} por solo $${Number(p.precio).toFixed(2)}.
${p.descripcion}

Pídelo hoy y déjate enamorar 💕
#DulceCapricho #SaborQueEnamora #PostresArtesanales #${p.categoria.replace('-', '')}`;
  }, 500);
});