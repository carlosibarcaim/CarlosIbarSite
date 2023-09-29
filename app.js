const contactar = document.querySelector("#botonContacto");

cargarEventListeners();

function cargarEventListeners() {
  contactar.addEventListener("click", dirigirContacto);
}

function dirigirContacto(e) {
  e.preventDefault();

  if (e.target.classList.contains("boton")) {
    location.href = "../index.html#contacto";
  }
  if (e.target.classList.contains("#botonContacto")) {
    location.href = "../index.html#contacto";
  }
}
