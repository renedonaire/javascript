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
if (edad < 18) {
    let salida = nombre + ", debes tener más de 18 años. Tú tienes sólo " + edad + " años.";
    alert(salida);
} else if (edad >= 18 && edad < 25) {
    let salida = nombre + " " + apellido + ", tú tienes entre 18 y 24 años";
    alert(salida);
} else if (edad >= 25 && edad < 40) {
    let salida = nombre + " " + apellido + ", tú tienes entre 25 y 39 años";
    alert(salida);
} else {
    let salida = nombre + " " + apellido + ", tú tienes al menos 40 años";
    alert(salida);
}
