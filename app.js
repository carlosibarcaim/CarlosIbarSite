const contactar = document.querySelector("boton");

cargarEventListeners();

function cargarEventListeners() {
  contactar.addEventListener("click", dirigirContacto);
}

function dirigirContacto(e) {
  e.preventDefault();

  if (e.target.classList.contains("boton")) {
    console.log("dirigiendo...");
  }
}
