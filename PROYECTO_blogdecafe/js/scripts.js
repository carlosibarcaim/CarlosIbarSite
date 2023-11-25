// CONSTANTES
const btnEnviar = document.querySelector(".boton--primario");
const campoNombre = document.querySelector("#nombre");
const campoEmail = document.querySelector("#email");
const campoMensaje = document.querySelector("#mensaje");
const formulario = document.querySelector(".formulario");
const datos ={
    nombre: "",
    email: "",
    mensaje: ""
}

// EVENTOS
campoNombre.addEventListener("input",leerTexto);
campoEmail.addEventListener("input",leerTexto);
campoMensaje.addEventListener("input",leerTexto);
formulario.addEventListener("submit",function(e){
    e.preventDefault();

    // Validar el formulario
    const { nombre, email, mensaje} = datos;
    console.log(nombre);
    console.log(email);
    console.log(mensaje);

    if(nombre == '' || email == '' || mensaje == ''){
        mostrarMensaje("Todos los campos son obligatorios", true);
        return;
    } else {
        // Enviar el Formulario
        mostrarMensaje("Datos enviados con exito");
    }

    
})

// Crear objeto con los datos de los campos del form


// FUNCIONES

//Inyectar los datos al objeto
function leerTexto(e){
    datos[e.target.id] = e.target.value;
}

function mostrarMensaje(mensaje, error = null){
    const alerta = document.createElement("p");
    alerta.textContent = mensaje;
    if(error){
        alerta.classList.add("error");
    } else {
        alerta.classList.add("correcto");
    }

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}



