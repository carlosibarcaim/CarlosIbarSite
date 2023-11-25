document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}

const proyectos = document.querySelector('.proyectos');

proyectos.addEventListener('click', function(e){
    e.preventDefault();

    location.href = "../../proyectos.html";
})

// Crear la funcion para la navegacion fija
function navegacionFija(){
    // Crear la variable que seleccione el header
    // Crear la variable que seleccione la seccion sobre-festival
    const header = document.querySelector('.header');
    const seccionFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    // Crear el Evento que escuche un scroll y realice un callback para ejecutar el metodo getBoundingClientRect()
    // Crear condicional para saber si ya pasamos el elemento
    window.addEventListener('scroll',function(e){
        e.preventDefault();

        if (seccionFestival.getBoundingClientRect().top < 0) {
            header.classList.add("fija");
            body.classList.add("scroll-body");
        } else {
            header.classList.remove("fija");
            body.classList.remove("scroll-body");
        }
    })
}

// Crear la funcion de ScrollNav
function scrollNav(){
    // Crear la variable que seleccione todos los enlaces del nav
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    
    // Iterar en cada uno de los enlaces y hacer un callback para scrollear
    enlaces.forEach(enlace => {
        enlace.addEventListener('click',function(e){
            e.preventDefault();

            //Seleccionar el valor del atributo href y guardarlo en una variable
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            // Usar scrollIntoView para agregar el efecto de smooth a la navegacion
            seccion.scrollIntoView({behavior: 'smooth'});
        })
    });
}   
    
    


function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= 8; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <picture>
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img width="200" height="300" loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
            </picture>    
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <picture>
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img width="200" height="300" loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria">
            </picture>    
        `;

    // Crea el overley con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');    

    //Cerrar imagen
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    cerrarImagen.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body')
    }
    overlay.appendChild(cerrarImagen);

    // Añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
}

