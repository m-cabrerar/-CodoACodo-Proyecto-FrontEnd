var DESCUENTO = {
    0: 0.8,
    1: 0.5,
    2: 0.15,
    3: 0,
}

var PRECIO = 200;

form = document.getElementById("form");
nombre = document.getElementById("nombre");
apellido = document.getElementById("apellido");
email = document.getElementById("email");
cantidad = document.getElementById("cantidad");
categoria = document.getElementById("categoria");

document.getElementById("borrar").addEventListener("click", function(){
    borrarAlerta();
    nombre.value = "";
    apellido.value = "";
    email.value = "";
    cantidad.value = "";
    categoria.value = "";
});

function validarForm() {
    if (nombre.value == "" || apellido.value == "" || email.value == "" || cantidad.value == "" || categoria.value == "") {
        return { 
            error: true,
            mensaje: "Por favor, complete todos los campos",
        }
    }
    if (email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
        return {
            error: true,
            mensaje: "Por favor, ingrese un email válido",
        }
    }
    if (cantidad.value < 1) {
        return {
            error: true,
            mensaje: "Por favor, ingrese una cantidad válida",
        }
    }
    return {
        error: false,
        mensaje: "",
    }
}

function calcularTotal(cant, desc) {
    return (cant * PRECIO * (1-desc)).toFixed(2);
}

function crearError(mensaje) {
    error = document.getElementById("alert");
    error.className = "alert col-12 alert-danger mb-0";
    error.textContent = mensaje;
}

function resumenCompra(total) {
    resumen = document.getElementById("alert");
    resumen.className = "alert col-12 alert-success mb-0";
    resumen.textContent = "Total a Pagar: $" + total;
}

function borrarAlerta() {
    alertas = document.getElementById("alert");
    alertas.className = "d-none";
}

document.getElementById("resumen").addEventListener("click", function(){
    var validacion = validarForm();
    borrarAlerta();
    if(validacion.error) {
        crearError(validacion.mensaje);
    }else{
        total = calcularTotal(cantidad.value, DESCUENTO[categoria.value]);
        resumen = resumenCompra(total);
    }
});