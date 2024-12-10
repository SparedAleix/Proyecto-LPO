window.addEventListener("load",iniciar);

function iniciar(){
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audioJuego");

    if (muteado) {
        audio.pause();
    } else {
        audio.play();
    }
    mostrarPuntaje();
    ordenarJugadores();

    let botonAtras = document.getElementById('flecha');

    botonAtras.addEventListener("click", redirigirMenu);

}

function redirigirMenu() {
    window.location.href = "../html/menuPrincipal.html";
}

function ordenarJugadores(){

    let puntosJugadores = document.getElementsByClassName("nombre");

    //Rescato los valores del jugador

    let nombreJugador = localStorage.getItem("nombre");
    let puntuacionJugador = localStorage.getItem("puntos");
    let colorJugador = localStorage.getItem("color");
    let jugadorPosicionado = true;
    console.log(puntosJugadores);

    //Introduzco en el ranking los valores y los voy desplazando una posicion abajo

    for(let i = 0; i < puntosJugadores.length; i++){
        let nombreJugadorAux = puntosJugadores[i].innerText.split(":")[0];
        let puntosJugadorAux  = parseInt(puntosJugadores[i].innerText.split(":")[1]);
        if(puntosJugadorAux < puntuacionJugador){
            puntosJugadores[i].innerText = nombreJugador+": "+puntuacionJugador;
            nombreJugador = nombreJugadorAux;
            puntuacionJugador = puntosJugadorAux;
            if(jugadorPosicionado){
                puntosJugadores[i].style.color = colorJugador;
                jugadorPosicionado=false;
            }
        }
    }
}

function mostrarPuntaje(){
    
}









