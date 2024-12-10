window.addEventListener("load", iniciar);

function iniciar() {
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audio");

    if (muteado) {
        audio.pause();
    } else {
        audio.play();
    }
    
    let botonFormulario = document.getElementById('login');
    let musica = document.getElementById('sonido');
    let iconos = document.getElementsByClassName('icono');
    let formulario = document.getElementById('loginForm');

    audio.innerHTML += "Tu navegador no soporta la etiqueta";

    // Bloque de captura de eventos:

    
    botonFormulario.addEventListener("click", redirigirFormulario);
    musica.addEventListener("click", encenderApagar);

    for (let i = 0; i < iconos.length; i++) {
        iconos[i].addEventListener("mouseover", iconHover);
    }

    // Evento exclusivo para el formulario:

    formulario.addEventListener("submit", validarFormulario);
}

// Bloque de otras Funciones:


function redirigirFormulario() {
    window.location.href = "../html/menuPrincipal.html";
}

function encenderApagar() {

    let muteado = localStorage.getItem("mute") === "true";

    muteado = !muteado;
    localStorage.setItem("mute", muteado);

    // Controlar el audio según el estado
    const audio = document.getElementById("audio"); 
    if (!muteado) {
        audio.play();
    } else {
        audio.pause();
    }
}

function iconHover(e) {
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML = `
    <source src="../../sonidos/seleccion.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
    };
}

//Bloque para validar y procesar datos del usuariod insertados en el formulario:

function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const color = document.getElementById('color').value;

    if (nombre === "" || email === "") {
        alert("Por favor, es necesario rellenar todos los campos.");
        return; 
    }

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
    localStorage.setItem("color", color);

    alert("Curioso nombre... En fin, puedes intentar entrar, si es que eres capaz de adivinar La Palabra Oculta..");
 
    window.location.href = "../html/menuPrincipal.html";
}

function cargarDatos() {

    const nombre = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
    const color = localStorage.getItem("color");
    
    console.log("Nombre almacenado: " + nombre);
    console.log("Email almacenado: " + email);
    console.log("Color almacenado: " + color);

}


