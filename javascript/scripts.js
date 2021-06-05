// Pide datos al usuario
let nombre = prompt("¿Cómo es tu nombre?");
let apellido = prompt("¿Y tu apellido?");
let añoNacimiento = prompt("¿En qué año naciste?");

// Averigua el año actual - gracias, san Google
var fecha = new Date();
var añoActual = fecha.getFullYear();

// Salida
let edad = parseInt(añoActual - añoNacimiento);
let salida = "Bueno " + nombre + " " + apellido + ", tienes " + edad + " años.";
alert(salida);
