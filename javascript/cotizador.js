/* -------------------------------------------------------------------------- */
/*                              Define constantes                             */
/* -------------------------------------------------------------------------- */
// Rango de distancias
const distanciaMinima = 10;
const distanciaMaxima = 100;

/* -------------------------------------------------------------------------- */
/*                              Define variables globales                             */
/* -------------------------------------------------------------------------- */
let kilometros = 0; //distancia al azar -temporalmente
let precio = 0; //precio calculado

// No hay mucho para animar... todos los elementos están en grid :(
$(document).ready(function(){
    $("#map").animate({
            right: -50,
            top: -10,
				},
				1000, );
        });