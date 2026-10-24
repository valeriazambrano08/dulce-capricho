// Menú hamburguesa
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('abierto');
});

const CATEGORIAS = [
  ['todos', 'Todos'], ['alfajores', 'Alfajores'], ['brownies', 'Brownies'],
  ['cheesecake', 'Cheesecake'], ['tortas', 'Tortas'], ['pave', 'Pavé'], ['mini-donas', 'Mini donas']
];
const grid = document.getElementById('grid');
const filtros = document.getElementById('filtros');

// Dibuja las tarjetas según la categoría elegida
function mostrar(categoria) {
  const lista = obtenerProductos().filter(p => categoria === 'todos' || p.categoria === categoria);
  grid.innerHTML = lista.length
    ? lista.map(p => `
      <article class="producto">
        <div class="producto-imagen">${p.emoji}</div>
        <div class="producto-info">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <span class="producto-precio">$${Number(p.precio).toFixed(2)}</span>
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