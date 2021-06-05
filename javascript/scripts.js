/* -------------------------------------------------------------------------- */
/*                            Pide datos al usuario                           */
/* -------------------------------------------------------------------------- */
let nombre = prompt("¿Cómo es tu nombre?");
if (nombre == "") {
    alert("Dejaste tu nombre vacío.")
    // ¿Cómo vuelvo a pedir el nombre?
}

let apellido = prompt("¿Y tu apellido?");
if (apellido == "") {
    alert("No me diste tu apellido.")
    //¿Cómo vuelvo a pedir el apellido?
}

let añoNacimiento = prompt("¿En qué año naciste?");
// ¿Cómo verifico que sea un año válido?


/* -------------------------------------------------------------------------- */
/*                Averigua el año actual - gracias, san Google                */
/* -------------------------------------------------------------------------- */
var fecha = new Date();
var añoActual = fecha.getFullYear();


/* -------------------------------------------------------------------------- */
/*                                   Salida                                   */
/* -------------------------------------------------------------------------- */
let edad = parseInt(añoActual - añoNacimiento);
let salida = "Bueno " + nombre + " " + apellido + ", tienes " + edad + " años.";
alert(salida);
