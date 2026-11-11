// ===== Menú hamburguesa =====
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('abierto');
});

const CATEGORIAS = [
  ['todos', 'Todos'], ['alfajores', 'Alfajores'], ['brownies', 'Brownies'],
  ['cheesecake', 'Cheesecake'], ['tortas', 'Tortas'], ['pave', 'Pavé'], ['mini-donas', 'Mini donas']
];
const grid = document.getElementById('grid');
const filtros = document.getElementById('filtros');

// Imagen con efecto "ver por dentro": la foto interior lleva el sufijo -interior.
// Si no existe la foto, se muestra el emoji; si no existe la interior, no hay efecto.
function tarjetaImagen(p) {
  if (!p.imagen) return p.emoji;
  const interior = p.imagen2 || p.imagen.replace('.jpg', '-interior.jpg');
  return `
    <img class="img-fuera" src="${p.imagen}" alt="${p.nombre}" loading="lazy"
         onerror="this.replaceWith(document.createTextNode('${p.emoji}'))">
    <img class="img-dentro" src="${interior}" alt="${p.nombre} por dentro" loading="lazy"
         onerror="this.remove()">`;
}

// Dibuja las tarjetas según la categoría elegida
function mostrar(categoria) {
  const lista = obtenerProductos().filter(p => categoria === 'todos' || p.categoria === categoria);
  grid.innerHTML = lista.length
    ? lista.map(p => `
      <article class="producto">
        <div class="producto-imagen">${tarjetaImagen(p)}</div>
        <div class="producto-info">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <span class="producto-precio">$${Number(p.precio).toFixed(2)}</span>
          <button class="btn btn-rosa btn-agregar" data-id="${p.id}">Agregar 🛒</button>
        </div>
      </article>`).join('')
    : '<p>Se nos acabaron los antojos por hoy. Vuelve pronto 🥲</p>';

  document.querySelectorAll('.filtro').forEach(b =>
    b.classList.toggle('activo', b.dataset.cat === categoria));
}

filtros.innerHTML = CATEGORIAS.map(([id, texto]) =>
  `<button class="filtro" data-cat="${id}">${texto}</button>`).join('');
filtros.addEventListener('click', e => {
  if (e.target.dataset.cat) mostrar(e.target.dataset.cat);
});

// Si llegan desde el home con #brownies, abre esa categoría
mostrar(location.hash.replace('#', '') || 'todos');

// ===== Carrito sencillo con pedido por WhatsApp =====
const NUMERO_WHATSAPP = '593992085305';
let carrito = [];

const barra = document.createElement('div');
barra.className = 'carrito-barra';
document.body.appendChild(barra);

function dibujarCarrito() {
  if (!carrito.length) { barra.classList.remove('visible'); return; }
  const total = carrito.reduce((s, i) => s + i.precio * i.cant, 0);
  const cantidad = carrito.reduce((s, i) => s + i.cant, 0);
  barra.innerHTML = `<span>🛒 ${cantidad} producto(s) · $${total.toFixed(2)}</span>
    <button class="btn btn-rosa" id="btnPedir">Pedir por WhatsApp</button>`;
  barra.classList.add('visible');
  document.getElementById('btnPedir').onclick = enviarPedido;
}

function enviarPedido() {
  const lineas = carrito.map(i => `• ${i.cant} x ${i.nombre} ($${(i.precio * i.cant).toFixed(2)})`).join('\n');
  const total = carrito.reduce((s, i) => s + i.precio * i.cant, 0);
  const texto = `¡Hola Dulce Capricho! 🍰 Quiero hacer este pedido:\n${lineas}\n\nTotal: $${total.toFixed(2)}`;
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank');
}

// Un solo "click" para todo: agregar al carrito y voltear foto en celular
grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-agregar')) {
    const p = obtenerProductos().find(x => x.id === Number(e.target.dataset.id));
    const existente = carrito.find(i => i.id === p.id);
    if (existente) existente.cant++;
    else carrito.push({ id: p.id, nombre: p.nombre, precio: Number(p.precio), cant: 1 });
    e.target.textContent = '¡Agregado! ✓';
    setTimeout(() => e.target.textContent = 'Agregar 🛒', 900);
    dibujarCarrito();
    return;
  }
  const caja = e.target.closest('.producto-imagen');
  if (caja) caja.classList.toggle('voltear');
});