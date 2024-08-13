// funcion para no mostrar el resultado todavia
function condicionesIniciales() {
    document.getElementById("resultadoParrafo").style.display = "none";
    document.getElementById("resultadoBotonCopiar").style.display = "none";
}

function encriptar() {
    let texto = document.getElementById('texto').value;

    let encriptado = '';
    
    // se reemplaza cada vocal por su correspondiente encriptada
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];

        if (letra === "a") {
            letra = "ai";
        } else if (letra === "e") {
            letra = "enter";
        } else if (letra === "i") {
            letra = "imes";
        } else if (letra === "o") {
            letra = "ober";
        } else if (letra === "u") {
            letra = "ufat";
        }
        encriptado += letra;
    }

    // se muestra el resultado en la pantalla del usuario
    mostrarResultado(encriptado);
}

function desencriptar() {
    let texto = document.getElementById('texto').value;

    // objeto que contiene las vocales encriptadas y sus desencriptados
    let reemplazos = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    }

    let desencriptado = buscarCadenaReemplazar(texto, reemplazos);

    // se muestra el resultado en la pantalla del usuario
    mostrarResultado(desencriptado);
}

// funcion para buscar vocal encriptada y luego desencriptar
function buscarCadenaReemplazar(texto, reemplazos) {
    for (let [buscar, reemplazar] of Object.entries(reemplazos)) {
        texto = texto.split(buscar).join(reemplazar);
    }
    return texto;
}

function establecerDisenoValidaciones() {

    document.getElementById("resultadoImagen").style.display = "none";
    document.getElementById("resultadoTexto").style.display = "flex";
    document.getElementById("resultadoParrafo").style.display = "none";
    document.getElementById("resultadoBotonCopiar").style.display = "none";
    document.getElementById("encriptador__resultado").style.justifyContent = "center";
    document.getElementById("tituloMensaje").style.display = "none";
    document.getElementById("parrafoMensaje").style.fontSize = "18px";
    document.getElementById("parrafoMensaje").style.color = "#0a3871";

}

function mostrarResultado(texto) {

    // se valida si esta vacio el campo texto
    if (texto == "") {

        document.getElementById("resultadoImagen").style.display = "flex";
        document.getElementById("resultadoTexto").style.display = "flex";
        document.getElementById("resultadoParrafo").style.display = "none";
        document.getElementById("resultadoBotonCopiar").style.display = "none";
        document.getElementById("encriptador__resultado").style.justifyContent = "center";
        document.getElementById("tituloMensaje").style.display = "block";

        document.getElementById("tituloMensaje").innerText = "Ningún mensaje fue encontrado";
        document.getElementById("parrafoMensaje").innerText = "Ingresa el texto que deseas encriptar o desencriptar.";

    } else {
        
        // expresiones regulares
        let caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>[\]\\/¡¿~`+=;:'-]/;
        let letrasMayusculas = /[A-Z]/;

        // funciones para evaluar si existe caracteres especiales y mayusculas en el texto
        let contieneCaracteresEspeciales = caracteresEspeciales.test(texto);
        let contieneLetrasMayusculas = letrasMayusculas.test(texto);

        // condicionales para establecer las validaciones pertinentes y mostrar mensajes
        if (contieneCaracteresEspeciales) {
            establecerDisenoValidaciones();
            document.getElementById("parrafoMensaje").innerText = "el texto contiene caracteres especiales o acentos";

        } else if (contieneLetrasMayusculas) {
            establecerDisenoValidaciones();
            document.getElementById("parrafoMensaje").innerText = "El texto tiene letras mayusculas";

        } else {

            // si no existe ningun error, se muestra en pantalla el texto listo para copiar con todos sus estilos
            document.getElementById("resultadoParrafo").style.color = "#0a3871";
            document.getElementById("resultadoParrafo").style.display = "block";
            document.getElementById("resultadoBotonCopiar").style.display = "block";
            document.getElementById("resultadoImagen").style.display = "none";
            document.getElementById("resultadoTexto").style.display = "none";
            document.getElementById("encriptador__resultado").style.justifyContent = "space-between";
            document.getElementById("resultadoParrafo").innerText = texto;
        }

    }
}


function copiarTexto() {
    // Obtener el texto del resultado de la encriptación y desencriptación
    const texto = document.getElementById('resultadoParrafo').innerHTML;

    // Utilizo la API de Portapapeles para copiar el texto
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado al portapapeles");
    }).catch(err => {
        alert(`Error al copiar el texto: ${err}`);

    });
}

condicionesIniciales();