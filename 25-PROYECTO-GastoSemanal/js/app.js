// VARIABLES Y SELECTORES

const formulario = document.querySelector("#agregar-gasto");
const listaGastos = document.querySelector("#gastos ul");

// EVENTOS

addEventListeners();
function addEventListeners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

  formulario.addEventListener("submit", agregarGasto);
}

// CLASES

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    console.log(this.gastos);
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    // Extrayendo el valor
    const { presupuesto, restante } = cantidad;

    // Agregar al HTML
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    // Crear el div de alerta
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Insertar en el HTML
    document.querySelector(".primario").insertBefore(divMensaje, formulario);
    //Quitar el HTML
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarGastoListado(gastos) {
    // Iterar sobre los gastos
    gastos.forEach((gasto) => {
      const { nombre, cantidad, id } = gasto;

      // Crear un LI
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";

      // Agregar el HTML del gasto

      // Boton para agregar el gasto

      // Agregar al HTML
    });
  }
}

// Instanciar

const ui = new UI();
let presupuesto;

// FUNCIONES

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  console.log(parseFloat(presupuestoUsuario));

  // Presupuesto valido
  presupuesto = new Presupuesto(presupuestoUsuario);

  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

// Añade gastos
function agregarGasto(e) {
  e.preventDefault();

  // Leer los datos del formulario
  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);

  // Validar campos
  if (nombre === "" || cantidad === "") {
    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("Cantidad no valida", "error");
    return;
  }
  //Generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() };

  // Añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  ui.imprimirAlerta("Gasto agregado correctamente");

  // Imprimir los gastos
  const { gastos } = presupuesto;
  ui.agregarGastoListado(gastos);

  formulario.reset();
}
