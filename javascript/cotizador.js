/* -------------------------------------------------------------------------- */
/*                              Define constantes                             */
/* -------------------------------------------------------------------------- */
// Rango de distancias
const distanciaMinima = 10;
const distanciaMaxima = 100;

/* -------------------------------------------------------------------------- */
/*                              Define variables                              */
/* -------------------------------------------------------------------------- */
let nombre = "";
let kilometros = 0;
let precio = 0;
let direcciones = [];

/* -------------------------------------------------------------------------- */
/*                               Define funciones                             */
/* -------------------------------------------------------------------------- */
// Pide el nombre del usuario y repite mientras no se ingrese un texto
function pideNombre() {
    nombre = prompt("¿Cual es su nombre?");
    while (nombre === "" || parseInt(nombre) || !nombre){
        nombre = prompt("Su nombre no puede estar vacío ni ser un número - por favor repita:");
    };
};

// Pide la dirección de inicio, repite mientras no se ingrescorrectamente
function pideDireccionInicio() {
    calleInicio = prompt("Dirección de inicio: Indique la calle");
    while (calleInicio === "" || parseInt(calleInicio) || !calleInicio) {
        calleInicio = prompt("La calle no puede estar vacía ni ser sólo un número - por favor repita:");
    };
    numeroInicio = prompt("Dirección de inicio: Indique el número");
    while (numeroInicio === "" || !parseInt(numeroInicio) || !numeroInicio) {
        numeroInicio = prompt("El número no puede estar vacío ni contener letras - por favor repita:");
    };
    ciudadInicio = prompt("Dirección de inicio: Indique la ciudad");
    while (ciudadInicio === "" || parseInt(ciudadInicio) || !ciudadInicio) {
        ciudadInicio = prompt("La ciudad no puede estar vacía ni ser sólo un número - por favor repita:");
    };
};

// Pide la dirección de término, repite mientras no se ingrese correctamente
function pideDireccionTermino() {
    calleTermino = prompt("Dirección de término: Indique la calle");
    while (calleTermino === "" || parseInt(calleTermino) || !calleTermino) {
        calleTermino = prompt("La calle no puede estar vacía ni ser sólo un número - por favor repita:");
    };
    numeroTermino = prompt("Dirección de término: Indique el número");
    while (numeroTermino === "" || !parseInt(numeroTermino) || !numeroTermino) {
        numeroTermino = prompt("El número no puede estar vacío ni contener letras - por favor repita:");
    };
    ciudadTermino = prompt("Dirección de término: Indique la ciudad");
    while (ciudadTermino === "" || parseInt(ciudadTermino) || !ciudadTermino) {
        ciudadTermino = prompt("La ciudad no puede estar vacía ni ser sólo un número - por favor repita:");
    };
};

// Ya que aún no puedo calcular la distancia, le asigno un valor aleatorio
function defineDistancia() {
    kilometros = Math.random() * (distanciaMaxima - distanciaMinima) + distanciaMinima;
    kilometros = parseFloat(kilometros.toFixed(1));
};

// Calcula un precio según el rango de kilómetros
function calculaPrecio() {
    defineDistancia();
    if (kilometros <= 30) {
        precio = kilometros * 2000;
    } else if (kilometros > 30 && kilometros <= 60) {
        precio = kilometros * 1500;
    } else {
        precio = kilometros * 1000;
    };
};

//Clase Direccion, construye las direcciones como objetos
class Direccion {
    constructor(calle, numero, ciudad) {
        this.calle = calle;
        this.numero = numero;
        this.ciudad = ciudad;
    }
};

//Esta función guarda las direcciones en un array
function guardaDirecciones (direccion) {
    guardar = this.direccion;
    direcciones.push(guardar);
}

// Función de salida
function muestraResultado() {
    alert(nombre + ", un viaje desde " + direccionInicio.calle + " hasta " + direccionTermino.calle + " son " + kilometros + " kilómetros, y te costará $" + precio);
};


/* -------------------------------------------------------------------------- */
/*                               Llama funciones                              */
/* -------------------------------------------------------------------------- */
//Pide los datos
pideNombre();
pideDireccionInicio();
pideDireccionTermino();
const direccionInicio = new Direccion(calleInicio, numeroInicio, ciudadInicio);
const direccionTermino = new Direccion(calleTermino, numeroTermino, ciudadTermino);
console.log(direccionInicio);
console.log(direccionTermino);

//Guarda direcciones en un array
guardaDirecciones(direccionInicio);
guardaDirecciones(direccionTermino);
console.log(direcciones);

//Calcula el precio y muestra el resultado
calculaPrecio();
muestraResultado();
