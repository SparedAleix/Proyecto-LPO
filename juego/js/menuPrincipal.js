window.addEventListener("load", iniciar);

function iniciar() {
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audio");

    if (muteado) {
        audio.pause();
    } else {
        audio.play();
    }
    //Iconos
    let botonManual = document.getElementById('ayuda');
    let botonFormulario = document.getElementById('login');
    let botonAudio = document.getElementById('sonido');
    //Opciones menu
    let opcionJugar = document.getElementById('jugar');
    let opcionRanking = document.getElementById('ranking');
    //TODO: Resto de opciones (opcional el de Ajustes)
    let opcionAjustes = document.getElementById('ajustes');

    let labels = document.getElementsByTagName('label');
    let iconos = document.getElementsByClassName('icono');

    let yt = document.getElementById('yt');
    let git = document.getElementById('git');

    opcionJugar.addEventListener("click", validarAntesDeJugar);

    audio.innerHTML += "Tu navegador no soporta la etiqueta";

    //Eventos de las opciones del menu
    for(let i=0;i<labels.length;i++){
        labels[i].addEventListener("mouseover",sonidoHover);
    }
    opcionRanking.addEventListener("click", redirigirRanking);
    //Eventos de los iconos

    for(let i = 0; i <iconos.length; i++){
        iconos[i].addEventListener("mouseover",iconHover);
    }

    botonManual.addEventListener("click", redirigirManual);
    botonFormulario.addEventListener("click", redirigirFormulario);
    botonAudio.addEventListener("click", encenderApagar);

    yt.addEventListener('click', redirigirTrailer);
    git.addEventListener('click', redirigirGit);

    /* Variables para el video: */

    const vc = document.getElementById('vc');
    const videoContainer = document.getElementById("videoContainer");
    const videoIframe = document.getElementById("video");
    const closeVideoButton = document.getElementById("closeVideo");

    /* Eventos para el video: */

    vc.addEventListener("click", () => {
        videoIframe.src = "../../Tráiler(LPO)/video/Trailer-Con-Interprete.mp4";
        videoContainer.style.display = "block";
    });

    closeVideoButton.addEventListener("click", () => {
        videoContainer.style.display = "none"; 
        videoIframe.src = ""; 
    });

}

// Validar si el usuario está registrado antes de redirigir al juego
function validarAntesDeJugar() {
    const nombre = localStorage.getItem("nombre");
    const botonFormulario = document.getElementById('login');

    if (nombre) {

        alert("Mmm, hola ser... , " + nombre + ". ¿Serás capaz de adivinar la contraseña?.");
        window.location.href = "../html/juegoPrincipal.html";
    } else {
        alert("No... No aceptamos vagabundos. Primero dime cómo te llamas...");
        botonFormulario.classList.add('latido');

        setTimeout(() => {
            botonFormulario.classList.remove('latido');
        }, 5000);
    }
}

function redirigirRanking(){
    window.location.href = "../html/ranking.html";
}

// function redirigirAlJuego(){
    
//     window.location.href = "../html/juegoPrincipal.html";
// }


function redirigirManual() {
    window.location.href = "../html/manualAyuda.html";
}

function redirigirFormulario() {
    if(localStorage.getItem("nombre") == undefined){
        window.location.href = "../html/formularioLogin.html";
    }else{
        window.location.href = "../html/visualizarDatos.html";
    }
}

function redirigirTrailer() { 
    window.location.href = "https://youtu.be/8IID03MnWBI";
}

function redirigirGit() {
    window.location.href = "https://github.com/SparedAleix/Proyecto-LPO.git";
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

function sonidoHover(e) {
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML = `
    <source src="../../sonidos/seleccion2.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
    };
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


