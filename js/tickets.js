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
    return cant * PRECIO * (1-desc);
}

function crearError(mensaje) {
    error = document.createElement("div");
    error.className = "alert alert-danger mb-0";
    error.textContent = mensaje;
    return error;
}

function resumenCompra(total) {
    resumen = document.createElement("div");
    resumen.className = "alert alert-success mb-0";
    resumen.textContent = "Total a Pagar: $" + total;
    return resumen;
}

function borrarAlerta() {
    alertas = document.getElementsByClassName("alert");
    if(alertas.length > 0) {
        alertas[0].remove();
    }
}

document.getElementById("resumen").addEventListener("click", function(){
    var validacion = validarForm();
    borrarAlerta();
    if(validacion.error) {
        error = crearError(validacion.mensaje);
        form.insertBefore(error, document.getElementById("buttons"));
    }else{
        total = calcularTotal(cantidad.value, DESCUENTO[categoria.value]);
        resumen = resumenCompra(total);
        form.insertBefore(resumen, document.getElementById("buttons"));
    }
});