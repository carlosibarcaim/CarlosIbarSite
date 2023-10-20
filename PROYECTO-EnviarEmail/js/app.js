document.addEventListener("DOMContentLoaded", function () {
  //Crear OBJETO que contenga los campos del formulario
  const ObjEmail = {
    email: "",
    CC: "",
    nombre: "",
    asunto: "",
    mensaje: "",
  };

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputCC = document.querySelector("#CC");
  const inputNombre = document.querySelector("#nombre");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector("#formulario button[type='submit']");
  const btnReset = document.querySelector("#formulario button[type='reset']");
  const spinner = document.querySelector("#spinner");
  const proyectos = document.querySelector(".regresar");

  // Crear callbacks
  inputEmail.addEventListener("input", validar);
  inputNombre.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputCC.addEventListener("input", validar);
  proyectos.addEventListener("click", irProyectos);

  formulario.addEventListener("submit", enviarEmail);

  // Simulacion de envio de email
  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      // Reiniciar el objeto
      resetFormulario();

      //Crear una alerta que avise que se envió correctamente
      const emailEnviado = document.createElement("P");
      emailEnviado.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );

      emailEnviado.textContent = "Email enviado correctamente";

      formulario.appendChild(emailEnviado);
      setTimeout(() => {
        emailEnviado.remove();
      }, 2000);
    }, 3000);
  }

  // Resetear los campos
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    //Reiniciar el objeto
    resetFormulario();
  });

  function validar(e) {
    if (e.target.value.trim() === "" && e.target.id !== "CC") {
      //Si el campo esta vacio mostrar la alerta con los parametros
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      ObjEmail[e.target.name] = "";
      comprobarEmail();

      return;
    }

    if (!validarEmail(e.target.value) && e.target.id === "email") {
      mostrarAlerta(
        "No es una direccion de email valida",
        e.target.parentElement
      );
      comprobarEmail();
      ObjEmail[e.target.name] = "";
      return;
    }

    if (!validarEmail(e.target.value) && e.target.id === "CC") {
      mostrarAlerta(
        "No es una direccion de email valida",
        e.target.parentElement
      );

      comprobarEmail();
      ObjEmail[e.target.name] = "";
      limpiarAlerta();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    ObjEmail[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarEmail();
  }

  // Funcion para mostrar mensajes de alerta
  function mostrarAlerta(mensaje, referencia) {
    //comprueba si ya existe una alerta dejando de inyecarlos
    limpiarAlerta(referencia);

    //Creando un elemento para mostrar mensaje de alerta
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "text-center", "p-2");

    //inyectando el mensaje en el DOM
    referencia.appendChild(error);
  }

  // Funcion para evitar el duplicado de las alertas
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  // Funcion para validar estructura de email
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  // Funcion para comprobar si todos los campos están llenos y utilizar boton de enviar
  function comprobarEmail() {
    if (
      ObjEmail["email"] === "" ||
      ObjEmail["nombre"] === "" ||
      ObjEmail["asunto"] === "" ||
      ObjEmail["mensaje"] === ""
    ) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  // Funcion para resetear el formulario
  function resetFormulario() {
    ObjEmail.email = "";
    ObjEmail.nombre = "";
    ObjEmail.CC = "";
    ObjEmail.asunto = "";
    ObjEmail.mensaje = "";

    formulario.reset();

    comprobarEmail();
  }

  // Boton para regresar a los proyectos
  function irProyectos(e) {
    e.preventDefault();

    location.href = "../proyectos.html";
  }
});
