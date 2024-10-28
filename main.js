
const form = document.getElementById('contact-form');
const mensajeDiv = document.getElementById('mensaje');
const listaCarrito = document.getElementById('lista-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
let carrito = [];


function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}


function mostrarCarrito() {
    listaCarrito.innerHTML = ''; 
    for (let i = 0; i < carrito.length; i++) {
        const item = document.createElement('li');
        item.textContent = carrito[i];
        listaCarrito.appendChild(item);
    }
    contadorCarrito.textContent = carrito.length; 
}


form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    
    mostrarMensaje(`¡Gracias, ${nombre}! Hemos recibido tu información.`);
    
    form.reset(); // Opcional: Limpia los campos del formulario
});


function mostrarMensaje(mensaje) {
    mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
}


const comprarBtns = document.querySelectorAll('.btn-comprar');

comprarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productoNombre = btn.parentElement.querySelector('h2').innerText;
        agregarAlCarrito(productoNombre); 
        mostrarMensaje(`Has agregado "${productoNombre}" a tu carrito.`);
    });
});


const linkCarrito = document.getElementById('link-carrito');
const linkFormulario = document.getElementById('link-formulario');


linkCarrito.addEventListener('click', () => {
    document.querySelector('.formulario').style.display = 'none'; 
    document.querySelector('.carrito').style.display = 'block';
});


linkFormulario.addEventListener('click', () => {
    document.querySelector('.carrito').style.display = 'none'; 
    document.querySelector('.formulario').style.display = 'block'; 
});


document.querySelector('.carrito').style.display = 'none';
