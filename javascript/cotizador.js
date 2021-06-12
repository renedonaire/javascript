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
let direccionInicio = "";
let direccionFin = "";
let kilometros = 0;
let precio = 0;

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

// Pide la dirección de inicio, repite mientras no se ingrese una
function pideDireccionInicio() {
    direccionInicio = prompt("Indique la dirección de inicio:");
    while (direccionInicio === "" || parseInt(direccionInicio) || !direccionInicio) {
        direccionInicio = prompt("La dirección de inicio no puede estar vacía ni ser sólo un número - por favor repita:");
    };
};

// Pide la dirección de término, repite mientras no se ingrese una
function pideDireccionTermino() {
    direccionFin = prompt("Indique la dirección de destino:");
    while (direccionFin === "" || parseInt(direccionFin) || !direccionFin) {
        direccionFin = prompt("La dirección de destino no puede estar vacía ni ser sólo un número - por favor repita:");
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
}

// Función de salida
function muestraResultado() {
    alert(nombre + ", un viaje desde " + direccionInicio + " hasta " + direccionFin + " son " + kilometros + " kilómetros, y te costará $" + precio);
};


/* -------------------------------------------------------------------------- */
/*                               Llama funciones                              */
/* -------------------------------------------------------------------------- */
pideNombre();
pideDireccionInicio();
pideDireccionTermino();
calculaPrecio();
muestraResultado();
