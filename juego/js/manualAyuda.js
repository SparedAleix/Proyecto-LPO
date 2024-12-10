window.addEventListener("load",iniciar);
function iniciar(){
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audio");

    if (muteado) {
        audio.pause();
    } else{
        audio.play();
    }
    let imagenes = document.getElementsByTagName("img");
    let botonPagina = document.getElementById("avanzar");
    let botonMenu = document.getElementById("puerta");
    let botonRetroceder = document.getElementById("retroceder");

    for(let i = 0; i < imagenes.length; i++){
        imagenes[i].addEventListener("mouseover",iconHover);
    }
    botonPagina.addEventListener("click",pasarPagina);
    botonMenu.addEventListener("click",volverMenu);
    botonRetroceder.addEventListener("click",retrocederPagina);
}

function pasarPagina(){
    let divPaginas = document.getElementById("instrucciones");
    let numeroPagina = divPaginas.className;
    pasarPaginaSonido();
    contenidoPagina(numeroPagina,"avanzar");
}
function volverMenu(){
    window.location.href = "../html/menuPrincipal.html";
}
function retrocederPagina(){
    let divPaginas = document.getElementById("instrucciones");
    let numeroPagina = divPaginas.className;
    pasarPaginaSonido();
    contenidoPagina(numeroPagina,"retroceder");
}
function contenidoPagina(numeroPagina, tipoAvance) {
    let numero = parseInt(numeroPagina.split("_")[1]);
    let divPaginas = document.getElementById("instrucciones");

    // Determino la dirección de avance
    if (tipoAvance === "avanzar") {
        numero += 1;
    } else if (tipoAvance === "retroceder" && numero > 0) {
        numero -= 1;
    }

    // Actualizo la clase del contenedor
    divPaginas.className = `pagina_${numero}`;

    // Configuro el contenido basado en el número de página
    switch (numero) {
        case 0:
            divPaginas.innerHTML = `
            <p> 
                Con que vienes aquí y no sabes jugar, cuán lamentable... <br>
                En fin, supongo que tendré que contarte cómo se juega, presta atención.
            </p>`;
            document.getElementById("retroceder").style.visibility = "hidden";
            break;

        case 1:
            divPaginas.innerHTML = `
            <p> 
                Primero de todo y antes de que empieces, tendrás que identificarte...
                No quiero errantes anónimos, firma el contrato y dime tu nombre y 
                el color de tu alma. Con ello sabré que tipo de persona eres.
            </p>`;
            document.getElementById("retroceder").style.visibility = "visible";
            break;

        case 2:
            divPaginas.innerHTML = `
            <p> 
                En cuanto firmes el contrato, te haré entrega de 6 llaves mágicas.
                Estas captarán las letras que les susurres y grabaran la posición de la letra en
                caso de encontrarse en la <b>PALABRA OCULTA<b>
            </p>`;
            break;

        case 3:
            divPaginas.innerHTML = `
            <p> 
                Si fallas, la llave se desvanecerá, perdiendo una oportunidad.<br>
                Fallar restará tus puntos para ser un errante apto para entrar, 
                intenta ser lo más sabio posible en tus reducidas oportunidades.

            </p>`;
            break;

        case 4:
            divPaginas.innerHTML = `
            <p> 
                Huelga decir que tu tiempo es finito. Solo dispondrás de 2 minutos.<br>
                No quiero perder el tiempo contigo, hay más errantes dispuestos a 
                superar la prueba. 
            </p>`;
            break;

        case 5:
            divPaginas.innerHTML = `
            <p> 
                En caso de que tu tiempo se agote, deberás marcharte de aquí y olvidar 
                todo lo que has visto. El contrato te obliga a callar y no mencionar nada de esto. <br>
            </p>`;
            document.getElementById("avanzar").style.visibility = "visible";
            break;
        case 6:
            divPaginas.innerHTML = `
            <p> 
                Y lo más importante de todo, <b> NO </b> rompas el contrato, no quieras exponerte 
                a las consecuencias, créeme.<br>
                Buena suerte.
            </p>`;
            // Aquí puedes ocultar el botón de avanzar si es necesario
            document.getElementById("avanzar").style.visibility = "hidden";
            break;

        default:
            console.error(`Número de página no válido: ${numero}`);
            break;
    }
}

function pasarPaginaSonido(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML = `
    <source src="../../sonidos/pasarPagina.mp3" type="audio/mpeg">
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