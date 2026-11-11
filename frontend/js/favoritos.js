// Muestra 4 productos destacados leyendo el mismo catálogo que usa el admin.
// IDs: Alfajor Bañado (2), Brownie con Nuez (4), Cheesecake Frutos Rojos (5), Pavé Maracuyá (9)
const IDS_FAVORITOS = [2, 4, 5, 9];

const favoritosGrid = document.getElementById('favoritosGrid');
const destacados = obtenerProductos().filter(p => IDS_FAVORITOS.includes(p.id));

favoritosGrid.innerHTML = destacados.map((p, i) => `
  <a href="catalogo.html#${p.categoria}" class="favorito" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
    <div class="favorito-foto">
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
    </div>
    <h3>${p.nombre}</h3>
    <span>$${Number(p.precio).toFixed(2)}</span>
  </a>`).join('');