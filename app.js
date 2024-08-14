const resultadoImagen = document.getElementById("resultadoImagen");
const resultadoTexto = document.getElementById("resultadoTexto");
const resultadoParrafo = document.getElementById("resultadoParrafo");
const resultadoBotonCopiar = document.getElementById("resultadoBotonCopiar");
const encriptadorResultado = document.getElementById("encriptador__resultado");
const tituloMensaje = document.getElementById("tituloMensaje");
const parrafoMensaje = document.getElementById("parrafoMensaje");

// funcion para no mostrar el container del resultado

function condicionesIniciales() {
    resultadoParrafo.style.display = "none";
    resultadoBotonCopiar.style.display = "none";
}

// funcion para encriptar el texto

function encriptar() {
    let texto = document.getElementById('texto').value;

    //se valida si la funcion validarTexto retorna true, para luego mandar mensaje de error
    if (validarTexto(texto)) {

        return;

    } else {

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
        mostrarResultado(encriptado); // se muestra el resultado en la pantalla del usuario
    }
}

// funcion para desencriptar el texto

function desencriptar() {
    let texto = document.getElementById('texto').value;

    //se valida si la funcion validarTexto retorna true, para luego mandar mensaje de error
    if (validarTexto(texto)) {

        return;

    } else {

        let desencriptado = buscarVocalEncriptadaReemplazar(texto);
        mostrarResultado(desencriptado); // se muestra el resultado en la pantalla del usuario
    }
}

// Función para reemplazar vocales encriptadas

function buscarVocalEncriptadaReemplazar(texto) {

    let vocalesEncriptadas = ["ai", "enter", "imes", "ober", "ufat"];
    let vocales = ["a", "e", "i", "o", "u"];

    // Iterar sobre cada par de vocales encriptadas y reemplazos
    for (let i = 0; i < vocalesEncriptadas.length; i++) {
        // Reemplazar todas las ocurrencias de la vocal encriptada con la vocal correspondiente
        texto = texto.split(vocalesEncriptadas[i]).join(vocales[i]);
    }
    return texto;
}

// Funcion para validar texto

function validarTexto(texto) {

    // Expresiones regulares
    const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>[\]\\/¡¿~`+=;´:'-]/;
    const letrasMayusculas = /[A-Z]/;
    const textoAcentos = /[\u00C0-\u017F]/;

    // Funciones para evaluar si existe caracteres especiales, acentos y mayúsculas en el texto
    const contieneCaracteresEspeciales = caracteresEspeciales.test(texto);
    const contieneLetrasMayusculas = letrasMayusculas.test(texto);
    const contieneAcentos = textoAcentos.test(texto);

    // Condicionales para establecer las validaciones pertinentes y mostrar mensajes
    if (texto === "") {

        resultadoImagen.style.display = "flex";
        resultadoTexto.style.display = "flex";
        resultadoParrafo.style.display = "none";
        resultadoBotonCopiar.style.display = "none";
        encriptadorResultado.style.justifyContent = "center";
        tituloMensaje.style.display = "block";
        tituloMensaje.innerText = "Ningún mensaje fue encontrado";
        parrafoMensaje.innerText = "Ingresa el texto que deseas encriptar o desencriptar.";
        parrafoMensaje.style.color = "black";
        return true;

    } else if (contieneCaracteresEspeciales) {

        establecerDisenoValidaciones();
        parrafoMensaje.innerText = "El texto contiene caracteres especiales";
        return true;

    } else if (contieneLetrasMayusculas) {

        establecerDisenoValidaciones();
        parrafoMensaje.innerText = "El texto tiene letras mayúsculas";
        return true;

    } else if (contieneAcentos) {

        establecerDisenoValidaciones();
        parrafoMensaje.innerText = "El texto tiene acentos";
        return true;

    } else {
        return false;
    }
}

// Funcion para copiar el resultado de la encriptacion y desencriptacion

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

// funcion para establecer diseño en las validaciones

function establecerDisenoValidaciones() {

    resultadoImagen.style.display = "none";
    resultadoTexto.style.display = "flex";
    resultadoParrafo.style.display = "none";
    resultadoBotonCopiar.style.display = "none";
    encriptadorResultado.style.justifyContent = "center";
    tituloMensaje.style.display = "none";
    parrafoMensaje.style.fontSize = "18px";
    parrafoMensaje.style.color = "#0a3871";

}

function mostrarResultado(texto) {

    // Si no existe ningún error, se muestra en pantalla el texto listo para copiar con todos sus estilos
    resultadoParrafo.style.color = "#0a3871";
    resultadoParrafo.style.display = "block";
    resultadoBotonCopiar.style.display = "block";
    resultadoImagen.style.display = "none";
    resultadoTexto.style.display = "none";
    encriptadorResultado.style.justifyContent = "space-between";
    resultadoParrafo.innerText = texto;

}

condicionesIniciales();