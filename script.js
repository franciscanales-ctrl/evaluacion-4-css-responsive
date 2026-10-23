
const menu = document.getElementById("menu");
const toggleMenu = document.getElementById("toggleMenu");
const contenido = document.getElementById("contenido");
const opcionInicio = document.getElementById("inicio");
const opcionFormulario = document.getElementById("formulario");

// Mostrar y ocultar el menú
toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("oculto");
    toggleMenu.classList.toggle("menu-cerrado");
    contenido.classList.toggle("ampliado");
});

// Marcar la opción activa
function activarOpcion(opcion) {
    opcionInicio.classList.remove("activa");
    opcionFormulario.classList.remove("activa");
    opcion.classList.add("activa");
}

// Mostrar Inicio y el botón Saludar
function mostrarInicio() {
    activarOpcion(opcionInicio);
    contenido.innerHTML = "";

    const boton = document.createElement("button");
    boton.textContent = "Saludar";
    boton.className = "boton-rosa";
    boton.addEventListener("click", mostrarSaludo);

    contenido.appendChild(boton);
}

// Crear mensaje de bienvenida
function mostrarSaludo() {
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje";

    const texto = document.createElement("span");
    texto.textContent = "Bienvenido al mundo web";

    const cerrar = document.createElement("button");
    cerrar.textContent = "×";
    cerrar.className = "cerrar";
    cerrar.setAttribute("aria-label", "Cerrar mensaje");

    cerrar.addEventListener("click", () => mensaje.remove());

    mensaje.append(texto, cerrar);
    contenido.prepend(mensaje);
}

// Crear formulario dinámicamente
function mostrarFormulario() {
    activarOpcion(opcionFormulario);
    contenido.innerHTML = "";

    const formulario = document.createElement("form");
    formulario.className = "formulario-dinamico";

    const campos = document.createElement("div");
    campos.className = "campos";

    const nombre = crearCampo("Nombre", "text", "nombre");
    const apellido = crearCampo("Apellido", "text", "apellido");
    const correo = crearCampo("Correo", "email", "correo");

    nombre.required = true;
    apellido.required = true;
    correo.required = true;

    campos.append(nombre, apellido, correo);

    const guardar = document.createElement("button");
    guardar.type = "submit";
    guardar.textContent = "Guardar";
    guardar.className = "boton-rosa guardar";

    formulario.append(campos, guardar);

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        alert("¡Datos guardados correctamente!");
        mostrarInicio();
    });

    contenido.appendChild(formulario);
}

// Crear campos de entrada
function crearCampo(placeholder, tipo, nombre) {
    const input = document.createElement("input");
    input.type = tipo;
    input.name = nombre;
    input.placeholder = placeholder;
    return input;
}

// Eventos del menú
opcionInicio.addEventListener("click", mostrarInicio);
opcionFormulario.addEventListener("click", mostrarFormulario);

// Mostrar Inicio al abrir la página
mostrarInicio();
