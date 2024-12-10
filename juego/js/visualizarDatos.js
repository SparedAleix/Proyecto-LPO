window.addEventListener("load", iniciar);
function iniciar(){
    const muteado = localStorage.getItem("mute") === "true";
    const audio = document.getElementById("audio");
    if (muteado) {
        audio.pause();
    } else {
        audio.play();
    }
    //En cuanto se inicia la ventana tiene que visualizar los datos
    let labelNombre = document.getElementById("nombre");
    let boton = document.getElementById("botonRomper");
    //let labelCorreo = document.getElementById("correo");
    //
    const nick = localStorage.getItem("nombre");
    labelNombre.textContent = "Fdo: " + nick;
    //Eventos
    boton.addEventListener("click", sonidoRomper);
    boton.addEventListener("mouseover", sonidoLatir);
    boton.addEventListener("mouseleave", pararLatido);
}
function sonidoRomper() {
    let body = document.body;

    // Crear el primer audio
    let audio = document.createElement("audio");
    //Recogo el div datos-usuario para hacer que se desvanezca
    let contrato = document.getElementById("datos-usuario");
    let confirmar = confirm("¿Estas segur@ de lo que estas a punto de hacer...?");
    if(confirmar == true){
        audio.src = "../../sonidos/romper.mp3";  // Establece el archivo de sonido
        audio.type = "audio/mpeg";  // Especifica el tipo de archivo
        body.appendChild(audio);  // Agregar el audio al DOM
        audio.play();  // Reproducir el sonido
        contrato.className = "roto";

        // Cuando termine el primer sonido
        audio.onended = () => {
            // Eliminar el primer audio
            body.removeChild(audio);

            // Crear y configurar el segundo audio
            let audio2 = document.createElement("audio");
            audio2.src = "../../sonidos/rugido.mp3";  // Segundo sonido
            audio2.type = "audio/mpeg";
            body.appendChild(audio2);
            audio2.play();  // Reproducir el segundo sonido
            alert("Solo los ignorantes rescinden del contrato... No vuelvas mas por aquí...");
            // Cuando termine el segundo sonido, eliminarlo
            audio2.onended = () => {
                localStorage.clear();
                body.removeChild(audio2);
                window.location.href="../html/menuPrincipal.html";
            };
        };
    }else{
        alert("Ten más en consideración tus actos...");
    }
}
function sonidoLatir(){
    let body = document.body;
    let audio = document.createElement("audio");
    audio.innerHTML = `
    <source src="../../sonidos/latir2.mp3" type="audio/mpeg">
    `;
    audio.loop = true;
    audio.id = "latir";
    body.appendChild(audio);
    audio.play();
}
function pararLatido(){
    let body = document.body;
    let audio = document.getElementById("latir");
    if(audio){
        body.removeChild(audio);
    } 
}
