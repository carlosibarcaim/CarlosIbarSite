// VARIABLES
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

const regresar = document.querySelector(".regresar");

// Crear un objeto que tenga los parametros de busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // Mostrar lista al cargar

  llenarSelect();
});

// EventListener para los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;

  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;

  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
});

regresar.addEventListener("click", (e) => {
  e.preventDefault();

  location.href = "../proyectos.html";
});

// FUNCIONES

function mostrarAutos(autos) {
  limpiarHTML(); // Elimina el HTML previo

  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement("P");

    autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - Precio: ${precio} - Puertas: ${puertas} 
        - ${color} - Transmision: ${transmision}
    `;
    // Inyectamos el texto de autoHTML en el area del #resultado
    resultado.appendChild(autoHTML);
  });
}

// Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los años del select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // Agrega el año al select
  }
}

// Funciones que filtran en base a la busqueda
// filtrarAuto es una funcion de alto nivel porque tiene como parametro otra funcion
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  console.log(resultado);

  mostrarAutos(resultado);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultados();
  }
}

function noResultados() {
  limpiarHTML();

  const noResultados = document.createElement("div");
  noResultados.classList.add("alerta", "error");
  noResultados.textContent = "No hay resultados";
  resultado.appendChild(noResultados);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
