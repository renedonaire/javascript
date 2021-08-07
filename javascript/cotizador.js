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
let services = {
  "services": [
    { "tipoServicio": "Delivery", "precioPorKm": "100" },
    { "tipoServicio": "Mudanza", "precioPorKm": "300" },
    { "tipoServicio": "Camioneta Rampa", "precioPorKm": "600" }
  ]
};



// No hay mucho para animar... todos los elementos están en grid :(
$(document).ready(function(){
    $("#map").animate({
            right: -50,
            top: -10,
				},
				1000, );
        });