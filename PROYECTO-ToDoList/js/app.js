// VARIABLES

const formulario = document.querySelector("#formulario");
const lista = document.querySelector("#lista-tweets");
let comentarios = [];

// EVENT LISTENERS
EventListeners();

function EventListeners() {
  // Cuando el usuario haga un nuevo comentario
  formulario.addEventListener("submit", agregarComentario);

  // Ciamdp el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    crearHTML();
  });
}
// FUNCIONES

function agregarComentario(e) {
  e.preventDefault();

  // Textarea donde el usuario escribe
  const comentario = document.querySelector("#tweet").value.trim();

  const comentarioObj = {
    id: Date.now(),
    texto: comentario,
  };
  // Agregando comentario nuevo al arreglo ya existente con spred operator
  comentarios = [...comentarios, comentarioObj];

  // Una vez agregado, crear HTML
  crearHTML();

  formulario.reset();

  // Validacion de comentario
  if (comentario === "") {
    mostrarError("El comentario no puede ir vacio");
    return;
  }
}

function mostrarError(MensajeError) {
  //limpiarHTML();

  const error = document.createElement("p");
  error.textContent = MensajeError;
  error.classList.add("error");
  // Insertar mensaje de error en el contenido

  const contenido = document.querySelector("#contenido");

  contenido.appendChild(error);

  // Elimina el mensaje de error despues de 3 segundos
  setTimeout(() => {
    error.remove();
  }, 3000);
}

// Muestra un listado de los comentarios

function crearHTML() {
  limpiarHTML();

  if (comentarios.length > 0) {
    comentarios.forEach((comentario) => {
      // Agregar boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-comentario");
      btnEliminar.innerText = "X";

      btnEliminar.onclick = () => {
        borrarComentario(comentario.id);
      };

      // Crear el HTML

      const li = document.createElement("li");
      li.innerText = comentario.texto; //Añadir texto
      lista.appendChild(li);

      console.log(comentario);

      li.appendChild(btnEliminar);
    });
  }

  sincronizarStorage();
}

// Eliminar comentario
function borrarComentario(id) {
  comentarios = comentarios.filter((comentario) => comentario.id !== id);
  console.log(comentarios);

  crearHTML();
}

function limpiarHTML() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
}

function sincronizarStorage() {
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}
