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

//Variables para las direcciones
let calleInicio = "";
let numeroInicio = 0;
let ciudadInicio = "";
let calleTermino = "";
let numeroTermino = 0;
let ciudadTermino = "";
let direcciones = [];

/* -------------------------------------------------------------------------- */
/*                               Llama funciones                              */
/* -------------------------------------------------------------------------- */
//Guarda direcciones en un array
guardaDirecciones(direccionInicio);
guardaDirecciones(direccionTermino);

//Calcula el precio y muestra el resultado
muestraRuta(direcciones);
calculaPrecio();
muestraResultado();
