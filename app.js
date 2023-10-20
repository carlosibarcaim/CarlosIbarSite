const contactar = document.querySelector("#botonContacto");

cargarEventListeners();

function cargarEventListeners() {
  contactar.addEventListener("click", dirigirContacto);
}

function dirigirContacto(e) {
  e.preventDefault();

  location.href = "/index.html#contacto";
}
