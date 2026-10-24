
const menu = document.getElementById("menu");
const toggleMenu = document.getElementById("toggleMenu");
const contenido = document.getElementById("contenido");
const opcionInicio = document.getElementById("inicio");
const opcionFormulario = document.getElementById("formulario");

// Arreglo donde se almacenan los registros
let registros = [];

// Mostrar u ocultar el menú lateral
toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("oculto");
    toggleMenu.classList.toggle("menu-cerrado");
    contenido.classList.toggle("ampliado");
});

// Activar la opción seleccionada
function activarOpcion(opcion) {
    opcionInicio.classList.remove("activa");
    opcionFormulario.classList.remove("activa");
    opcion.classList.add("activa");
}

// Mostrar la pantalla Inicio
function mostrarInicio() {
    activarOpcion(opcionInicio);
    contenido.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = "Panel administrativo";

    const mensaje = document.createElement("p");
    mensaje.textContent = "Bienvenido. Selecciona Formulario para registrar datos.";

    contenido.append(titulo, mensaje);
}

// Crear un campo de formulario
function crearCampo(placeholder, tipo, nombre) {
    const input = document.createElement("input");
    input.type = tipo;
    input.name = nombre;
    input.placeholder = placeholder;
    input.required = true;
    return input;
}

// Mostrar formulario y tabla
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

    campos.append(nombre, apellido, correo);

    const guardar = document.createElement("button");
    guardar.type = "submit";
    guardar.textContent = "Guardar";
    guardar.className = "boton-rosa guardar";

    formulario.append(campos, guardar);

    const tabla = document.createElement("table");
    tabla.className = "tabla-registros";

    const encabezado = document.createElement("thead");
    const filaEncabezado = document.createElement("tr");

    ["Nombre", "Apellido", "Correo", "Opciones"].forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        filaEncabezado.appendChild(th);
    });

    encabezado.appendChild(filaEncabezado);

    const cuerpo = document.createElement("tbody");
    cuerpo.id = "listaRegistros";

    tabla.append(encabezado, cuerpo);

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const registro = {
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            correo: correo.value.trim()
        };

        registros.push(registro);

        formulario.reset();
        mostrarRegistros();
    });

    contenido.append(formulario, tabla);
    mostrarRegistros();
}

// Dibujar los registros en la tabla
function mostrarRegistros() {
    const cuerpo = document.getElementById("listaRegistros");
    if (!cuerpo) return;

    cuerpo.innerHTML = "";

    registros.forEach((registro, indice) => {
        const fila = document.createElement("tr");

        [registro.nombre, registro.apellido, registro.correo].forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const opciones = document.createElement("td");
        const eliminar = document.createElement("button");

        eliminar.textContent = "×";
        eliminar.className = "eliminar";
        eliminar.type = "button";
        eliminar.setAttribute("aria-label", "Eliminar registro");

        eliminar.addEventListener("click", () => {
            registros.splice(indice, 1);
            mostrarRegistros();
        });

        opciones.appendChild(eliminar);
        fila.appendChild(opciones);
        cuerpo.appendChild(fila);
    });
}

// Eventos del menú
opcionInicio.addEventListener("click", mostrarInicio);
opcionFormulario.addEventListener("click", mostrarFormulario);

// Pantalla inicial
mostrarInicio();
