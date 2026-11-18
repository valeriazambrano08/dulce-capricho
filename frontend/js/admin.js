// Panel de admin conectado a la API: login con token, productos y mensajes.
const vistaLogin = document.getElementById('vistaLogin');
const vistaPanel = document.getElementById('vistaPanel');
const btnSalir = document.getElementById('btnSalir');
const EMOJIS = { alfajores: '🍪', brownies: '🍫', cheesecake: '🍓', tortas: '🍰', pave: '🥧', 'mini-donas': '🍩' };

let PRODUCTOS = [];

const getToken = () => sessionStorage.getItem('token_dc');
const cabeceras = () => ({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() });

function mostrarPanel(si) {
  vistaLogin.style.display = si ? 'none' : 'block';
  vistaPanel.style.display = si ? 'block' : 'none';
  btnSalir.style.display = si ? 'inline-block' : 'none';
  if (si) { dibujarTabla(); cargarMensajes(); }
}

// ===== Login =====
document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const estado = document.getElementById('loginEstado');
  estado.className = 'form-estado';
  estado.textContent = 'Entrando...';
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: document.getElementById('usuario').value.trim(),
        clave: document.getElementById('clave').value
      })
    });
    if (!res.ok) throw new Error('credenciales');
    const { token } = await res.json();
    sessionStorage.setItem('token_dc', token);
    estado.textContent = '';
    mostrarPanel(true);
  } catch (err) {
    estado.textContent = 'Usuario o contraseña incorrectos, o el servidor no responde.';
    estado.className = 'form-estado error';
  }
});

btnSalir.addEventListener('click', () => {
  sessionStorage.removeItem('token_dc');
  mostrarPanel(false);
});

// ===== Productos =====
async function dibujarTabla() {
  PRODUCTOS = await cargarProductos();
  document.getElementById('tablaProductos').innerHTML = PRODUCTOS.map(p => `
    <tr>
      <td>${p.emoji || ''} ${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${Number(p.precio).toFixed(2)}</td>
      <td><button class="btn-borrar" data-id="${p.id}" title="Eliminar">🗑️</button></td>
    </tr>`).join('');
  const sel = document.getElementById('postProducto');
  if (sel) sel.innerHTML = PRODUCTOS.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
}

document.getElementById('formProducto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const estado = document.getElementById('productoEstado');
  const nombre = document.getElementById('pNombre').value.trim();
  const categoria = document.getElementById('pCategoria').value;
  const precio = parseFloat(document.getElementById('pPrecio').value);
  const descripcion = document.getElementById('pDescripcion').value.trim();

  if (!nombre || isNaN(precio) || !descripcion) {
    estado.textContent = 'Completa nombre, precio y descripción.';
    estado.className = 'form-estado error';
    return;
  }
  try {
    const res = await fetch(`${API_URL}/api/productos`, {
      method: 'POST',
      headers: cabeceras(),
      body: JSON.stringify({ nombre, categoria, emoji: EMOJIS[categoria], precio, descripcion })
    });
    if (!res.ok) throw new Error('fallo');
    e.target.reset();
    estado.textContent = 'Producto agregado.';
    estado.className = 'form-estado ok';
    dibujarTabla();
  } catch (err) {
    estado.textContent = 'No se pudo agregar. Vuelve a iniciar sesión.';
    estado.className = 'form-estado error';
  }
});

document.getElementById('tablaProductos').addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id || !confirm('¿Eliminar este producto?')) return;
  try {
    const res = await fetch(`${API_URL}/api/productos/${id}`, { method: 'DELETE', headers: cabeceras() });
    if (!res.ok) throw new Error('fallo');
    dibujarTabla();
  } catch (err) {
    alert('No se pudo eliminar. Vuelve a iniciar sesión.');
  }
});

// ===== Mensajes de contacto =====
async function cargarMensajes() {
  const caja = document.getElementById('tablaMensajes');
  if (!caja) return;
  try {
    const res = await fetch(`${API_URL}/api/contacto`, { headers: cabeceras() });
    if (!res.ok) throw new Error('fallo');
    const lista = await res.json();
    caja.innerHTML = lista.length
      ? lista.map(m => `
        <tr>
          <td>${new Date(m.createdAt).toLocaleDateString()}</td>
          <td>${m.nombre}</td>
          <td>${m.correo}</td>
          <td>${m.mensaje}</td>
        </tr>`).join('')
      : '<tr><td colspan="4">Aún no hay mensajes.</td></tr>';
  } catch (err) {
    caja.innerHTML = '<tr><td colspan="4">No se pudieron cargar los mensajes.</td></tr>';
  }
}

// ===== Generador de posts =====
const resPost = document.getElementById('resultadoPost');
document.getElementById('btnPost').addEventListener('click', () => {
  const p = PRODUCTOS.find(x => String(x.id) === document.getElementById('postProducto').value);
  if (!p) { resPost.textContent = 'Elige un producto primero.'; return; }
  resPost.textContent = 'Preparando tu post...';
  setTimeout(() => {
    resPost.textContent =
`${p.emoji || ''} ¡Antojo del día! ${p.nombre} por solo $${Number(p.precio).toFixed(2)}.
${p.descripcion}

Pídelo hoy y déjate enamorar.
#DulceCapricho #SaborQueEnamora #PostresArtesanales #${p.categoria.replace('-', '')}`;
  }, 500);
});

// Al cargar: si ya hay token, entra directo
mostrarPanel(!!getToken());