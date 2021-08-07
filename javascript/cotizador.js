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
// Objeto con los tipos de servicio y su precio
let services = [
  { "tipoServicio": "Delivery", "precioPorKm": "100" },
  { "tipoServicio": "Mudanza", "precioPorKm": "300" },
  { "tipoServicio": "Camioneta Rampa", "precioPorKm": "600" }
];
/* ------------ Construye el desplegable de servicios disponibles ----------- */
let text = document.getElementById("servicio");
// Recorre el array de servicios y los añade al desplegable
for (var i = 0; i < services.length; i++) {
  text.innerHTML = text.innerHTML + '<option value="' + services[i].tipoServicio + '">' + services[i].tipoServicio + '</option>';
};

// No hay mucho para animar... todos los elementos están en grid :(
$(document).ready(function () {
  $("#map").animate({
    right: -50,
    top: -10,
  },
    1000);
});