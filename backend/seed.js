// Carga los 12 productos iniciales en MongoDB. Ejecutar una sola vez: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const productos = [
  { nombre: "Alfajor Clásico", categoria: "alfajores", emoji: "🍪", imagen: "images/alfajor-clasico.jpg", precio: 1.5, descripcion: "Galletas de maicena rellenas de dulce de leche y coco rallado." },
  { nombre: "Alfajor Bañado", categoria: "alfajores", emoji: "🍪", imagen: "images/alfajor-banado.jpg", precio: 2, descripcion: "Cubierto de chocolate semiamargo, crocante por fuera y cremoso por dentro." },
  { nombre: "Brownie Intenso", categoria: "brownies", emoji: "🍫", imagen: "images/brownie-intenso.jpg", precio: 2.5, descripcion: "Húmedo, con chocolate oscuro y corteza crujiente." },
  { nombre: "Brownie con Nuez y Caramelo", categoria: "brownies", emoji: "🍫", imagen: "images/brownie-nuez.jpg", precio: 3, descripcion: "Con nueces tostadas y un chorrito de caramelo." },
  { nombre: "Cheesecake de Frutos Rojos", categoria: "cheesecake", emoji: "🍓", imagen: "images/cheesecake-frutos-rojos.jpg", precio: 3.5, descripcion: "Base de galleta, crema suave y salsa de frutos rojos." },
  { nombre: "Cheesecake de Oreo", categoria: "cheesecake", emoji: "🍓", imagen: "images/cheesecake-oreo.jpg", precio: 3.5, descripcion: "Cremoso, con trocitos de galleta y base crocante." },
  { nombre: "Torta de Chocolate", categoria: "tortas", emoji: "🍰", imagen: "images/torta-chocolate.jpg", precio: 3.5, descripcion: "Bizcocho de chocolate con relleno cremoso y ganache." },
  { nombre: "Torta Tres Leches", categoria: "tortas", emoji: "🍰", imagen: "images/torta-tres-leches.jpg", precio: 3.5, descripcion: "Esponjosa, bañada en tres leches y cubierta de crema." },
  { nombre: "Pavé de Maracuyá", categoria: "pave", emoji: "🥧", imagen: "images/pave-maracuya.jpg", precio: 3, descripcion: "Capas de galleta, crema suave y maracuyá. Ligero y refrescante." },
  { nombre: "Pavé de Chocolate", categoria: "pave", emoji: "🥧", imagen: "images/pave-chocolate.jpg", precio: 3, descripcion: "Capas de crema de chocolate y galleta. Se derrite en la boca." },
  { nombre: "Mini Donas Glaseadas (x6)", categoria: "mini-donas", emoji: "🍩", imagen: "images/mini-donas-glaseadas.jpg", precio: 5, descripcion: "Seis mini donas con glaseado de colores. Ideales para compartir." },
  { nombre: "Mini Donas de Chocolate (x6)", categoria: "mini-donas", emoji: "🍩", imagen: "images/mini-donas-chocolate.jpg", precio: 5.5, descripcion: "Bañadas en chocolate y decoradas con chispas." }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Producto.deleteMany({});
    await Producto.insertMany(productos);
    console.log('12 productos cargados en MongoDB');
    process.exit(0);
  })
  .catch((e) => { console.error('Error:', e.message); process.exit(1); });