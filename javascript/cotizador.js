/* -------------------------------------------------------------------------- */
/*                              Define constantes                             */
/* -------------------------------------------------------------------------- */
// Rango de distancias
const distanciaMinima = 10;
const distanciaMaxima = 100;

/* -------------------------------------------------------------------------- */
/*                              Define variables                              */
/* -------------------------------------------------------------------------- */
let kilometros = 0;
let precio = 0; //precio calculado

/* -------------------------------------------------------------------------- */
/*                               Llama funciones                              */
/* -------------------------------------------------------------------------- */
//Ya que se validaron y capturaron los datos del formulario, calcula el precio y muestra el resultado
calculaPrecio();
muestraResultado();
