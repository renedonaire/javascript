/* -------------------------------------------------------------------------- */
/*                              Define constantes                             */
/* -------------------------------------------------------------------------- */
// Rango de distancias
const distanciaMinima = 10;
const distanciaMaxima = 100;

/* -------------------------------------------------------------------------- */
/*                              Define variables                              */
/* -------------------------------------------------------------------------- */
let nombre = ""; //nombre del usuario
let kilometros = 0;
let precio = 0; //precio calculado

//Variables para la dirección de origen
let calleInicio = "";
let numeroInicio = 0;
let ciudadInicio = "";

//Variables para la dirección de término
let calleTermino = "";
let numeroTermino = 0;
let ciudadTermino = "";

let direcciones = [];

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
