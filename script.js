
const CLAVE_CARRITO = "aulaCreativaCarrito";

// Recuperar los productos guardados en el navegador
let carrito = cargarCarrito();

function cargarCarrito() {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO);
        return datos ? JSON.parse(datos) : [];
    } catch (error) {
        return [];
    }
}

// Guardar el carrito cada vez que cambie
function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Agregar productos desde el catálogo
document.querySelectorAll(".agregar").forEach(boton => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const nombre = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        const existente = carrito.find(producto => producto.id === id);

        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({
                id,
                nombre,
                precio,
                cantidad: 1
            });
        }

        guardarCarrito();
        actualizarCarrito();

        // Mostrar confirmación
        const textoOriginal = boton.textContent;
        boton.textContent = "¡Agregado!";
        setTimeout(() => {
            boton.textContent = textoOriginal;
        }, 1000);
    });
});

// Dibujar la vista del carrito
function actualizarCarrito() {
    const contenido = document.getElementById("contenidoCarrito");
    const cantidad = document.getElementById("cantidad");
    const total = document.getElementById("total");
    const contador = document.getElementById("contadorCarrito");

    contenido.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío. ¡Explora nuestros productos!";
        contenido.appendChild(mensaje);
    } else {
        const lista = document.createElement("div");
        lista.className = "lista-productos-carrito";

        carrito.forEach(producto => {
            const fila = document.createElement("article");
            fila.className = "fila-carrito";

            const informacion = document.createElement("div");

            const titulo = document.createElement("h3");
            titulo.textContent = producto.nombre;

            const detalle = document.createElement("p");
            detalle.textContent =
                `Precio: C$ ${producto.precio.toFixed(2)} · Cantidad: ${producto.cantidad}`;

            const subtotal = document.createElement("p");
            subtotal.className = "precio";
            subtotal.textContent =
                `Subtotal: C$ ${(producto.precio * producto.cantidad).toFixed(2)}`;

            informacion.append(titulo, detalle, subtotal);

            const acciones = document.createElement("div");
            acciones.className = "acciones-carrito";

            const quitar = document.createElement("button");
            quitar.type = "button";
            quitar.className = "boton boton-secundario";
            quitar.textContent = "− Quitar uno";
            quitar.addEventListener("click", () => {
                producto.cantidad -= 1;

                if (producto.cantidad <= 0) {
                    carrito = carrito.filter(item => item.id !== producto.id);
                }

                guardarCarrito();
                actualizarCarrito();
            });

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.className = "boton";
            eliminar.textContent = "Eliminar";
            eliminar.addEventListener("click", () => {
                carrito = carrito.filter(item => item.id !== producto.id);
                guardarCarrito();
                actualizarCarrito();
            });

            acciones.append(quitar, eliminar);
            fila.append(informacion, acciones);
            lista.appendChild(fila);
        });

        contenido.appendChild(lista);
    }

    const unidades = carrito.reduce(
        (suma, producto) => suma + producto.cantidad, 0
    );

    const importe = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad, 0
    );

    cantidad.textContent = unidades;
    total.textContent = `C$ ${importe.toFixed(2)}`;

    if (contador) {
        contador.textContent = unidades;
    }
}

// Vaciar el carrito completo
document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
});

// Formulario de contacto
document.getElementById("formContacto").addEventListener("submit", evento => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    document.getElementById("respuestaContacto").textContent =
        `¡Gracias, ${nombre}! Tu mensaje se ha preparado correctamente.`;

    evento.target.reset();
});

// Mostrar los productos guardados al abrir o recargar la página
actualizarCarrito();
