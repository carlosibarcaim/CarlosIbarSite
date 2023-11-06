// CONSTRUCTORES

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// PROTOTYPES
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
  /*
    1.Americano 1.15
    2.Asiatico 1.05
    3.Europeo 1.35
  */

  let cantidad;
  let base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  // Cada año que la diferencia es mayor, el costo va a reducirse 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;

  /*
  Si el seguro es basico se multiplica por un 30% mas
  Si el seguro es completo se multiplica por un 50% mas
  */
  if (this.tipo === "basico") {
    cantidad = cantidad * 1.3;
  } else if (this.tipo === "completo") {
    cantidad = cantidad * 1.5;
  }

  return cantidad;
};

// Creamos el prototype UI
function UI() {}

// Creamos la lista de los años
UI.prototype.llenarOpciones = () => {
  // Se puede usar arrowFunctions porque el constructor no tiene propiedades
  const max = new Date().getFullYear();
  const min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Muestra el resultado en pantalla
UI.prototype.mostrarResultado = (seguro, total) => {
  const { marca, year, tipo } = seguro;

  let textoMarca;

  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;
    default:
      break;
  }

  const div = document.createElement("div");
  div.classList.add("mt-10");

  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal capitalize"> ${textoMarca} </span> </p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
    <p class="font-bold">Año: <span class="font-normal capitalize"> ${tipo} </span> </p>
    <p class="font-bold">Total: <span class="font-normal"> $${total} </span> </p>
  `;

  const resultadoDiv = document.querySelector("#resultado");

  // Mostrar spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none"; // Borrar spinner
    resultadoDiv.appendChild(div); // Mostrar resultado
  }, 3000);
};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  //Insertar en el HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

// Instanciar
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();
const formulario = document.querySelector("#cotizar-seguro");
function eventListeners() {
  document.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  //Leer marca seleccionada
  const marca = document.querySelector("#marca").value;
  //Leer año seleccionado
  const year = document.querySelector("#year").value;
  //Leer tipo de cobertura
  const tipo = document.querySelector("input[name='tipo']:checked").value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando...", "correcto");

  //Ocultar las cotizaciones previas
  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }

  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  //Utilizar el prototype que va a cotizar
  ui.mostrarResultado(seguro, total);
}
