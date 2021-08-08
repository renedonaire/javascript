/* -------------------------------------------------------------------------- */
/*                              Define variables globales                             */
/* -------------------------------------------------------------------------- */
let kilometros = 0; //distancia del servicio
let precio = 0; //precio calculado
let direccionInicialMap = ""; //dirección inicial calculada por Google
let direccionFinalMap = ""; //dirección final calculada por Google
let validado = []; //array usado como control 
let proof = true; //variable de control

// Objeto con los tipos de servicio y su precio
let services = [
  { "tipoServicio": "Delivery", "precioPorKm": "1000" },
  { "tipoServicio": "Mudanza", "precioPorKm": "4000" },
  { "tipoServicio": "Camioneta Rampa", "precioPorKm": "2000" }
];
/* ------------ Construye el desplegable de servicios disponibles ----------- */
let text = document.getElementById("servicio");
// Recorre el array de servicios y los añade al desplegable
for (var i = 0; i < services.length; i++) {
  text.innerHTML = text.innerHTML + '<option value="' + services[i].tipoServicio + '">' + services[i].tipoServicio + '</option>';
};

// Se ejecuta enla primera carga del documento
$(document).ready(function () {
  validado = []; 
  valida();
  
  // No hay mucho para animar... todos los elementos están en grid :(
  $("#map").animate({
    right: -50,
    top: -10,
  },
    1000);
});