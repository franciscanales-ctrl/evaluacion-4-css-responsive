
const materiales = [
  {
    id: "lectura",
    titulo: "Fichas de lectura",
    categoria: "Lengua y Literatura",
    descripcion: "Actividades de lectura y escritura.",
    precio: 50,
    tipo: "pago",
    icono: "📖",
    enlace: ""
  },
  {
    id: "planes",
    titulo: "Planes diarios",
    categoria: "Planificación docente",
    descripcion: "Plantillas para organizar las clases.",
    precio: 60,
    tipo: "pago",
    icono: "📋",
    enlace: ""
  },
  {
    id: "colorear",
    titulo: "Libros para colorear",
    categoria: "Arte y creatividad",
    descripcion: "Dibujos y actividades para niños.",
    precio: 50,
    tipo: "pago",
    icono: "🖍️",
    enlace: ""
  },
  {
    id: "cuentos",
    titulo: "Cuentos infantiles",
    categoria: "Lectura",
    descripcion: "Lecturas ilustradas con actividades.",
    precio: 40,
    tipo: "pago",
    icono: "📚",
    enlace: ""
  },
  {
    id: "renos-001",
    titulo: "Libro de colorear renos",
    categoria: "Dibujos para colorear",
    descripcion: "Libro navideño de renos para imprimir y colorear.",
    precio: 0,
    tipo: "gratis",
    icono: "🦌",
    enlace: "https://drive.google.com/file/d/1Y-_SXT2gjJK7yhI2zQ3XaahAbktEIOWN/view?usp=sharing"
  }
];

const listaMateriales = document.getElementById("listaMateriales");

if (listaMateriales) {
  listaMateriales.innerHTML = materiales.map(material => `
    <article class="tarjeta">
      <div class="producto-imagen">${material.icono}</div>
      <h3>${material.titulo}</h3>
      <p>${material.descripcion}</p>
      <p class="precio">
        ${material.tipo === "gratis"
          ? "GRATIS"
          : `C$ ${material.precio.toFixed(2)}`}
      </p>

      ${material.tipo === "gratis"
        ? `<a class="boton"
             href="${material.enlace}"
             target="_blank"
             rel="noopener noreferrer">
             Ver y descargar PDF
           </a>`
        : `<button class="boton agregar"
             data-id="${material.id}"
             data-producto="${material.titulo}"
             data-precio="${material.precio}">
             Agregar al carrito
           </button>`
      }
    </article>
  `).join("");
}
