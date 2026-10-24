// Chatbot "Asesor de Antojos" - funciona en el navegador, sin servidor.
// Lee el catálogo real (obtenerProductos) y arma recomendaciones por ocasión y personas.

const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');
const chatCerrar = document.getElementById('chatCerrar');
const chatMensajes = document.getElementById('chatMensajes');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

chatBtn.addEventListener('click', () => {
  chatBox.classList.toggle('abierto');
  if (!chatMensajes.children.length) {
    agregar('bot', '¡Hola! Soy tu Asesor de Antojos 🍰 Cuéntame la ocasión y cuántas personas son, y te armo el pedido ideal.');
  }
});
chatCerrar.addEventListener('click', () => chatBox.classList.remove('abierto'));

function agregar(quien, texto) {
  const div = document.createElement('div');
  div.className = 'msg ' + quien;
  div.innerHTML = texto;
  chatMensajes.appendChild(div);
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Busca un producto por palabra clave en el nombre
function buscar(palabra) {
  return obtenerProductos().find(p => p.nombre.toLowerCase().includes(palabra));
}

// Genera la respuesta según lo que escribió el cliente
function responder(texto) {
  const t = texto.toLowerCase();
  const num = parseInt((t.match(/\d+/) || [])[0]);
  const personas = isNaN(num) ? null : num;

  if (/hola|buenas|hey/.test(t) && !personas) {
    return '¡Hola! 💕 ¿Para qué ocasión es el antojo y cuántas personas son?';
  }

  if (personas) {
    const cheese = buscar('frutos rojos');
    const donas = buscar('glaseadas');
    const brownie = buscar('intenso');
    let items = [], total = 0;

    if (personas <= 2) {
      items = [[brownie, 2]];
    } else if (personas <= 8) {
      items = [[cheese, 1], [donas, 1]];
    } else {
      items = [[cheese, 2], [donas, 2]];
    }
    items.forEach(([p, c]) => total += p.precio * c);
    const lista = items.map(([p, c]) => `${c} × ${p.nombre}`).join('<br>');

    let intro = '¡Qué lindo plan! 🎉';
    if (/cumple/.test(t)) intro = '¡Feliz cumpleaños! 🎂';
    if (/mam|madre/.test(t)) intro = '¡Qué detalle para mamá! 💐';
    if (/aniversario|novi|amor/.test(t)) intro = '¡Qué romántico! 💕';

    return `${intro} Para ${personas} te recomiendo:<br>${lista}<br><b>Total aprox: $${total.toFixed(2)}</b><br>Escríbenos desde Contacto para hacer tu pedido.`;
  }

  if (/chocolate/.test(t)) return `Para los fieles al cacao: ${buscar('intenso').nombre} 🍫 o ${buscar('torta de chocolate').nombre}.`;
  if (/fruta|fresco|liviano|ligero/.test(t)) return `Algo fresquito: ${buscar('maracuy').nombre} 🥭 o ${buscar('frutos rojos').nombre} 🍓.`;
  if (/barato|econ/.test(t)) return `Lo más económico: ${buscar('clásico').nombre} por $${buscar('clásico').precio.toFixed(2)} 🍪.`;
  if (/precio|cuesta|valor/.test(t)) return 'Tenemos postres desde $1.50. Mira todos los precios en el catálogo 💕';
  if (/envio|envío|domicilio|horario/.test(t)) return 'Para envíos y horarios escríbenos por el formulario de Contacto 💌';

  return 'Ups, no te entendí bien 🥲 Cuéntame la ocasión y cuántas personas son, o dime si prefieres chocolate o algo fresco.';
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = chatInput.value.trim();
  if (!texto) return;
  agregar('yo', texto);
  chatInput.value = '';
  agregar('bot', 'Pensando tu antojo... 🍩');
   setTimeout(() => {
    chatMensajes.lastChild.remove();
    agregar('bot', responder(texto));
  }, 700);
});

// El botón del menú también abre el chat
document.getElementById('abrirAsesor').addEventListener('click', (e) => {
  e.preventDefault();
  chatBtn.click();
});