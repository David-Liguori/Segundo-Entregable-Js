// Elementos del DOM
const form = document.getElementById('contact-form');
const mensajeDiv = document.getElementById('mensaje');
const listaCarrito = document.getElementById('lista-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const contenedorProductos = document.querySelector('.productos');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');
const btnComprar = document.getElementById('comprar');
const linkCarrito = document.getElementById('link-carrito');
const linkFormulario = document.getElementById('link-formulario');
let carrito = [];

// Recuperar carrito almacenado
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carritoGuardado;
    mostrarCarrito();
    cargarProductos();
    inicializarVistas();
});

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            ${producto}
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            guardarCarrito();
            mostrarCarrito();
        });
    });

    contadorCarrito.textContent = carrito.length;
}

// Agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
    mostrarMensaje(`Has agregado "${producto}" a tu carrito.`);
}

// Mostrar mensajes con SweetAlert2
function mostrarMensaje(mensaje) {
    Swal.fire({
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

// Vaciar carrito
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    mostrarMensaje('El carrito ha sido vaciado.');
});

// Finalizar compra
btnComprar.addEventListener('click', () => {
    if (carrito.length > 0) {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
        mostrarMensaje('¡Gracias por tu compra! Tu pedido será procesado.');
    } else {
        mostrarMensaje('El carrito está vacío. Agrega productos antes de comprar.');
    }
});

// Cargar productos desde JSON
function cargarProductos() {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(productos => {
            productos.forEach(producto => {
                const articulo = document.createElement('article');
                articulo.classList.add('producto');
                articulo.innerHTML = `
                    <img src="${producto.imagen || 'placeholder.jpg'}" alt="${producto.nombre}" class="imagen-producto">
                    <h2>${producto.nombre}</h2>
                    <p>Precio: usd$${producto.precio}</p>
                    <button class="btn-comprar">Comprar</button>
                `;
                contenedorProductos.appendChild(articulo);

                articulo.querySelector('.btn-comprar').addEventListener('click', () => {
                    agregarAlCarrito(producto.nombre);
                });
            });
        })
        .catch(error => {
            console.error(error);
            mostrarMensaje('Hubo un error al cargar los productos.');
        });
}

// Inicializar vistas (mostrar y ocultar secciones)
function inicializarVistas() {
    document.querySelector('.carrito').style.display = 'none';
    linkCarrito.addEventListener('click', () => {
        document.querySelector('.formulario').style.display = 'none';
        document.querySelector('.carrito').style.display = 'block';
    });

    linkFormulario.addEventListener('click', () => {
        document.querySelector('.carrito').style.display = 'none';
        document.querySelector('.formulario').style.display = 'block';
    });
}
