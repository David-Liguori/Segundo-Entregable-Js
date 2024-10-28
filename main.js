// Capturamos el formulario y la lista del carrito
const form = document.getElementById('contact-form');
const mensajeDiv = document.getElementById('mensaje');
const listaCarrito = document.getElementById('lista-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    listaCarrito.innerHTML = ''; // Limpiamos la lista existente
    for (let i = 0; i < carrito.length; i++) {
        const item = document.createElement('li');
        item.textContent = carrito[i];
        listaCarrito.appendChild(item);
    }
    contadorCarrito.textContent = carrito.length; // Actualiza el contador en el navbar
}

// Evento para el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Mostrar un mensaje de confirmación
    mostrarMensaje(`¡Gracias, ${nombre}! Hemos recibido tu información.`);
    
    form.reset(); // Opcional: Limpia los campos del formulario
});

// Función para mostrar un mensaje en el DOM
function mostrarMensaje(mensaje) {
    mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
}

// Capturamos los botones "Comprar" y añadimos funcionalidad
const comprarBtns = document.querySelectorAll('.btn-comprar');

comprarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productoNombre = btn.parentElement.querySelector('h2').innerText;
        agregarAlCarrito(productoNombre); // Llama a la función para agregar al carrito
        mostrarMensaje(`Has agregado "${productoNombre}" a tu carrito.`);
    });
});

// Manejo de navegación del navbar
const linkCarrito = document.getElementById('link-carrito');
const linkFormulario = document.getElementById('link-formulario');

// Mostrar carrito en el navbar
linkCarrito.addEventListener('click', () => {
    document.querySelector('.formulario').style.display = 'none'; // Oculta el formulario
    document.querySelector('.carrito').style.display = 'block'; // Muestra el carrito
});

// Mostrar formulario en el navbar
linkFormulario.addEventListener('click', () => {
    document.querySelector('.carrito').style.display = 'none'; // Oculta el carrito
    document.querySelector('.formulario').style.display = 'block'; // Muestra el formulario
});

// Inicialmente ocultamos el carrito
document.querySelector('.carrito').style.display = 'none';
