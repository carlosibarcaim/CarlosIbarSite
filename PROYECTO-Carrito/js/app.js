// VARIABLES
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const back = document.querySelector(".material-symbols-rounded");
const contactarBtn = document.querySelector("boton");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Dirigir al form de contacto
  contactarBtn.addEventListener("click", dirigirContacto);
  // Regresar a la pagina principal
  back.addEventListener("click", regresar);
  // Cuando agregas un curso al presionar el boton "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  // Elimina curso del carrito
  carrito.addEventListener("click", eliminarCurso);
  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

// FUNCIONES
function dirigirContacto(e) {
  e.preventDefault();

  if (e.target.classList.contains("boton")) {
    console.log("Contactando...");
    //location.href = "../index.html/#contacto";
  }
}

function regresar(e) {
  e.preventDefault();

  if (e.target.classList.contains("material-symbols-rounded")) {
    location.href = "../proyectos.html";
  }
  if (e.target.classList.contains("regresar")) {
    location.href = "../proyectos.html";
  }
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    console.log(cursoId);
    // Elimina elementos del arregloCarrito medianto el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    // Iterar en el carrito y mostrar su HTML
    carritoHTML();
  }
}

// LEE EL CONTENIDO DEL HTML Y EXTRAE LA INFORMACION DEL CURSO

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Aumentar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
  } else {
    // Agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// MUESTRA EL CARRITO DE COMPRAS EN EL HTML

function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src = "${imagen}", width = "100"
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//ELIMINA LOS CURSOS DEL TBDOY
function limpiarHTML() {
  //contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
