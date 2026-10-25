
const botonesAgregar = document.querySelectorAll(".agregar");
const listaCarrito = document.getElementById("listaCarrito");
const cantidad = document.getElementById("cantidad");
const total = document.getElementById("total");
const botonVaciar = document.getElementById("vaciarCarrito");

let carrito = [];

// Agregar productos al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        carrito.push({
            nombre: nombre,
            precio: precio
        });

        actualizarCarrito();
    });
});

// Actualizar la lista, cantidad y total
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, indice) => {
        const elemento = document.createElement("li");
        elemento.textContent =
            `${producto.nombre} - C$ ${producto.precio.toFixed(2)} `;

        const eliminar = document.createElement("button");
        eliminar.textContent = "Quitar";
        eliminar.type = "button";
        eliminar.className = "boton boton-secundario";
        eliminar.style.padding = "4px 10px";
        eliminar.style.marginLeft = "8px";

        eliminar.addEventListener("click", () => {
            carrito.splice(indice, 1);
            actualizarCarrito();
        });

        elemento.appendChild(eliminar);
        listaCarrito.appendChild(elemento);
    });

    cantidad.textContent = carrito.length;

    const suma = carrito.reduce(
        (acumulado, producto) => acumulado + producto.precio,
        0
    );

    total.textContent = `C$ ${suma.toFixed(2)}`;
}

// Vaciar todos los productos
botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Confirmación del formulario de contacto
const formularioContacto = document.getElementById("formContacto");
const respuestaContacto = document.getElementById("respuestaContacto");

formularioContacto.addEventListener("submit", evento => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    respuestaContacto.textContent =
        `¡Gracias, ${nombre}! Tu mensaje se ha preparado correctamente.`;

    formularioContacto.reset();
});
