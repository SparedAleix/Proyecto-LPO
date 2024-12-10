//Array de palabras de hasta 7 letras
const palabras = [
    "adalid", "alcaide", "alcazar", "alferez", "alfiler", "almohada", "alquimia", "almofar",
    "alqueria", "ariete", "armadura", "arzobispo", "baluarte", "batalla", "bodega", "califa",
    "camara", "canalla", "capellan", "cetrero", "cetro", "clavicordio", "condestable",
    "conde", "corcel", "cordero", "cortejo", "crisol", "cruzada", "destrero", "doncella",
    "embajada", "encomienda", "escudero", "estandarte", "feudo", "fidalgo", "galera",
    "galope", "gremio", "guerrero", "heraldo", "hereje", "infanzon", "jornada", "justa",
    "lanza", "legado", "loriga", "maestre", "mandoble", "manuscrito", "manto", "mazmorra",
    "mesnada", "monasterio", "morada", "moro", "nobleza", "obispado", "ofrenda", "oracion",
    "ordalia", "pendon", "plebeyo", "portento", "proeza", "quimera", "reconquista",
    "reliquia", "rescate", "romeria", "rondalla", "secular", "senorio", "señor",
    "silogismo", "templario", "tenedor", "tiara", "tinaja", "tirano", "torreon",
    "travesia", "tributo", "trova", "trofeo", "vasallo", "velada", "verdugo", "vidente",
    "vigilia", "yugo", "zarpa",
    "abad", "abatir", "acequia", "adalid", "adarga", "alcabala", "alfoz", "aljibe",
    "almena", "almohaza", "almoravide", "alqueria", "arcontes", "arcaismo", "arcilla",
    "argolla", "armero", "arriero", "atalaya", "azotea", "azur", "bastardo", "behetria",
    "bellaco", "bermejo", "burguesia", "cabildo", "caballero", "cachicamo", "camafeo",
    "cantera", "carcaj", "carniceria", "castellanizar", "castillo", "casto", "ceguedad",
    "celada", "celibato", "cerrojo", "cetros", "cinabrio", "cisma", "citara", "civico",
    "comarca", "corneta", "crismon", "desafio", "despeñadero", "doncel", "duelo",
    "efemero", "embaucador", "empalizada", "encomendero", "entoldado", "espadon",
    "espuela", "estandarte", "estepa", "estirpe", "fajardo", "fuste", "gaita", "ganso",
    "garlopa", "gimotear", "glandula", "gremial", "grosero", "guarismo", "harapo",
    "hidalgo", "idoneidad", "inquisidor", "juglar", "lagar", "lecho", "lienzo",
    "liturgia", "llave", "luzbel", "maniqueo", "maravedis", "matutino", "mazo", "mezquino",
    "mirador", "mozarabe", "mujeril", "nazareno", "palafrenero", "peñon", "popa", "pregon",
    "quiral", "ramero", "resplandor", "retablo", "romano", "sajon", "señorio", "solar",
    "sor", "tartamudo", "tejar", "tizona", "trafico", "turbante", "valle", "vereda",
    "verdugillo", "vila", "vinatero", "yesca", "yermo"
];

const frases = ["¿De verdad pensabas que esa letra funcionaria?", "No has estado ni cerca", "Prueba otra", "Rindete ya",
    "Casi pero no", "¿No puedes hacerlo mejor que eso?","Lamentable", "*Se oyen risas al otro lado*",
    "Que decepción..."
];
let intentos = 6;
let puntosTotales = 2000;

window.addEventListener("load",iniciar);
function iniciar(){
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audioJuego");

    if (muteado) {
        audio.pause();
    } else {
        audio.play();
    }
    iniciarTemporizador();
    //Grabamos los intentos
    let intentosParrafo = document.getElementById("intentos");
    intentosParrafo.innerText = "Llaves: " + intentos;
    //Palabra aleatoria del array
    let numeroAleatorio = Math.floor(Math.random() * palabras.length);
    let palabra = palabras[numeroAleatorio];
    sessionStorage.setItem("palabraClave",palabra);
    //Creacion de la cantidad de divs en base a la longitud de la palabra
    let div_letras = document.getElementById("contenedores-letras");
    for(let i = 0; i < palabra.length; i++){
        let div = document.createElement("div");
        div.className = "letraPalabraSecreta";
        div.setAttribute("data-letra",palabra[i].toUpperCase());
        div_letras.appendChild(div);
    }
    // Llamada a la función con el Drag and Drop
    configurarDragAndDrop();

    //Evento del boton
    let botonLetra = document.getElementById("boton");
    botonLetra.addEventListener("click",enviarLetra);
    //Evento de las llaves
    let llaves = document.getElementsByClassName("llave");
    for(let i = 0; i < llaves.length; i++){
        llaves[i].addEventListener("mouseover",keySound);
    }
}

// --- BLOQUE CONFIGURACIÓN D&D:

function configurarDragAndDrop() {
    const letras = document.querySelectorAll(".letras");
    const letraInput = document.getElementById("letraInput");

    // Configuramos el dragstart en los divs de letras para que recoja cuando se empieza a arrastrar:
    letras.forEach(letra => {
        letra.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", letra.textContent); // Pasamos la letra como texto.
        });
    });

    // Configuración del dragover para que acepte el drop:
    letraInput.addEventListener("dragover", e => {
        e.preventDefault(); // Necesario para habilitar el dropeo.
    });

    // Configuración del drop para colocar la letra dentro del input:
    letraInput.addEventListener("drop", e => {
        e.preventDefault();
        const letraArrastrada = e.dataTransfer.getData("text/plain"); // Recuperamos la letra que habíamos cogido fnteriormente.
        letraInput.value = letraArrastrada; // Mostramos la letra en el input para poder enviarla a comproba.
    });
}
function enviarLetra(){
    let encontrado = false;
    let numeroAleatorio = Math.floor(Math.random() * frases.length);
    let frase = frases[numeroAleatorio];
    let intentosParrafo = document.getElementById("intentos");
    let letraInput = document.getElementById("letraInput");
    let letra = letraInput.value.toUpperCase().trim();
    let divLetrasPalabra = document.getElementsByClassName("letraPalabraSecreta");
    let llaves = document.getElementById("llaves");
    let boton = document.getElementById("boton");
    
    //Comprobaciones 
    if(intentos!=0){
        for(let i = 0; i < divLetrasPalabra.length; i++){
            //En caso de encontrarse , valoramos si se ha ganado
            if(letra === divLetrasPalabra[i].getAttribute("data-letra")){
                aparecerLetraSonido();
                divLetrasPalabra[i].innerText = letra; 
                divLetrasPalabra[i].classList.add("revelada");
                encontrado = true;
                if(ganar()){
                    localStorage.setItem("puntos", parseInt(puntosTotales + ((intentos/6) * 100)));
                    abrirPuerta();
                }
            } 
        }
        
        if(!encontrado){
            restarPuntos();
            intentos--;
            intentosParrafo.innerText = "Llaves: " + intentos;
            introducirTexto(frase);
            sonidoRomperLlave();
            llaves.removeChild(llaves.lastElementChild);
            //Añade la clase fallo para que se active la animacion (cambiemos esto a keyframes con JS)
            boton.className = "fallo";
            setTimeout(() => { //Esta parte de aqui
            boton.className = "";
            }, 300);
            if(intentos==0){
                mostrarPalabra(divLetrasPalabra);
            }
            if (intentos == 1) {
                empezarPalpitacion();
                let audioJuego = document.getElementById("audioJuego");
                audioJuego.src = "../../sonidos/ultimoIntento.mp3";
                audioJuego.load();
                audioJuego.play();
                const muteado = localStorage.getItem("mute") === "true";
                const audio = document.getElementById("audioJuego");
                if (muteado) {
                    audio.pause();
                } else {
                    audio.play();
                } 
            }
        }
         // Aquí buscamos la letra usada en el teclado y la marcamos cómo usada:
         const letraUsada = [...document.querySelectorAll(".letras")].find(
            l => l.textContent === letra
        );
        if (letraUsada) {
            marcarLetraComoUsada(letraUsada);
        }
    }
    
    
    letraInput.value = "";
}
// --- FUNCIÓN PARA MARCAR LA LETRA COMO USADA:
function marcarLetraComoUsada(letra) {
    // Deshabilitar la letra para que no sea draggable
    letra.setAttribute("draggable", "false");

    // Reducir la opacidad
    letra.style.opacity = "0.5";

    // La letra usada se tacha:
    letra.style.textDecoration = "line-through";

    // La letra usada cambia de color:
    letra.style.color="rgb(117, 0, 0)";
}
//FUNCION DEL TEMPORIZADOR 
function iniciarTemporizador(){
    const temporizador = document.getElementById('tiempo');
    let tiempoRestanteMinutos = 1; // Obtiene el tiempo inicial
    let tiempoRestanteSegundos = 60;

    const intervaloTiempo = setInterval(() => {
      if(tiempoRestanteSegundos%10==0){
        restarPuntos();
      }
      tiempoRestanteSegundos--; // Reduce el tiempo restante
      if(tiempoRestanteSegundos == 0 && tiempoRestanteMinutos != 0){
        tiempoRestanteMinutos--;
        tiempoRestanteSegundos = 59;
      }
      if(tiempoRestanteSegundos<10){
        temporizador.textContent = tiempoRestanteMinutos + ":0" + tiempoRestanteSegundos; // Actualiza el texto en la página
      }else{
        temporizador.textContent = tiempoRestanteMinutos + ":" + tiempoRestanteSegundos; // Actualiza el texto en la página
      }

      if (tiempoRestanteMinutos == 0 && tiempoRestanteSegundos == 0 || intentos == 0) {
        temporizador.textContent = "0:00" // Actualiza el texto en la página
        clearInterval(intervaloTiempo); // Detiene el temporizador cuando llega a 0
        let confirmar = confirm("Hasta aquí has llegado");
        if(confirmar != null){
            window.location.href = "../html/menuPrincipal.html";
        }
        
      }
    }, 1000); // Ejecuta el bloque cada 1000 ms (1 segundo)
  }
//FUNCIONES DE SONIDO
function keySound(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML=`
    <source src="../../sonidos/llave.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
    };
}
function sonidoRomperLlave(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML=`
    <source src="../../sonidos/fallar2.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
    };
}
function aparecerLetraSonido(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML=`
    <source src="../../sonidos/aparecer.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
    };
}

function mostrarPalabra(divLetras){
    divLetrasPalabra = divLetras;
    for(let i = 0; i < divLetrasPalabra.length; i++){
        divLetrasPalabra[i].innerText = divLetrasPalabra[i].getAttribute("data-letra"); 
        divLetrasPalabra[i].classList.add("revelada");
    }
}
function introducirTexto(texto){
    let parrafoTexto = document.getElementById("frasePuerta");
    parrafoTexto.classList.add("cambiar");
    if(intentos == 1){
        parrafoTexto.textContent = "Último intento..."
    }else if(intentos == 0){
        parrafoTexto.textContent = ". . ."
    }
    else{
        parrafoTexto.style.visibility = "visible";
        parrafoTexto.textContent = texto;
    }
}
function restarPuntos(){
    let elementoPuntos = document.getElementById("puntosNumero");
    let puntos = elementoPuntos.textContent;
    elementoPuntos.textContent = puntos - 100;
    puntosTotales -= 100;
}
//FUNCION PARA COMPROBAR LA VICTORIA
function ganar(){
    let espaciosLetras = document.getElementsByClassName("letraPalabraSecreta");
    let gana = true;
    let palabra = sessionStorage.getItem("palabraClave");
    for(let i = 0; i < palabra.length; i++){
        if(espaciosLetras[i].innerText == espaciosLetras[i].getAttribute("data-letra") && gana){
            gana = true;
        }else{
            gana = false;
        }
    }
    return gana;
}
function abrirPuerta(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML=`
    <source src="../../sonidos/desbloquear.mp3" type="audio/mpeg">
    `;
    body.appendChild(audio);
    audio.play();
    audio.onended = () => {
        body.removeChild(audio);
        let audio2 = document.createElement("audio");
            audio2.src = "../../sonidos/abrirPuerta.mp3";  // Segundo sonido
            audio2.type = "audio/mpeg";
            body.appendChild(audio2);
            audio2.play();  // Reproducir el segundo sonido
    };
    setTimeout(() => {
        alert("Sublime");
        window.location.href = "../html/ranking.html";
    },7000);
}
function empezarPalpitacion() {
    let body = document.body;

    // Crear la imagen y configurar estilos iniciales
    let imagenBorde = document.createElement("img");
    imagenBorde.src = "../../imagenes/borde-rojo.png";
    imagenBorde.className = "bordeRojo";
    imagenBorde.style.opacity = 0;

    // Añadir la imagen al body
    body.appendChild(imagenBorde);
    
    let visible = true;
    const intervaloTiempo = setInterval(() => {
        imagenBorde.style.opacity = visible ? 0.7 : 0;
        visible = !visible;
    }, 1000);
}


