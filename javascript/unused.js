/* -------------------------------------------------------------------------- */
/*           Código que no utilizao pero podría servir más adelante           */
/* -------------------------------------------------------------------------- */
//Clase Direccion, construye las direcciones como objetos
class Direccion {
    constructor(calle, numero, ciudad) {
        this.calle = calle;
        this.numero = numero;
        this.ciudad = ciudad;
    }
};

//Esta función guarda las direcciones en un array
function guardaDirecciones(direccion) {
    this.direccion = direccion;
    guardar = Object.values(this.direccion); //transforma los valores del Objeto en un Array
    direcciones.push(guardar);
};

//Esta función muestra un mapa con la ruta definida por las direcciones
function muestraRuta(direcciones) {
    // Toma el array de direcciones, interactúa con Google maps para obtener distancia
    // y colocar los marcadores en la posición correspondiente.
    // Por ahora no retorna nada
}