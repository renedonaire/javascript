/* -------------------------------------------------------------------------- */
/*                               Define funciones                             */
/* -------------------------------------------------------------------------- */
// Valida los campos del formulario al hacer click en el botón y muestra los hints corresponientes
function valida() {
        let servicio = document.getElementById("servicio").value;
    if (servicio == ".") {
        document.getElementById("labelServicio").innerHTML = "Tipo de servicio requerido";
        document.getElementById("labelServicio").classList = "error";
    } else {
        document.getElementById("labelServicio").innerHTML = "";
    };

    let nombre = document.getElementById("nombre").value;
        if (nombre === "" || parseInt(nombre) || !nombre) {
        document.getElementById("labelNombre").innerHTML = "Nombre requerido, sin cifras";
        document.getElementById("labelNombre").classList = "error";
    } else {
        document.getElementById("labelNombre").innerHTML = "";
    };

    let telefono = document.getElementById("telefono").value;
        if (!parseInt(telefono)) {
        document.getElementById("labelTelefono").innerHTML = "Teléfono requerido, sólo cifras";
        document.getElementById("labelTelefono").classList = "error";
    } else {
        document.getElementById("labelTelefono").innerHTML = "";
    };

    let direccionInicio = document.getElementById("direccionInicio").value;
        if (direccionInicio === "" || parseInt(direccionInicio) || !direccionInicio) {
        document.getElementById("labelDireccionInicio").innerHTML = "Se requiere dirección de inicio";
        document.getElementById("labelDireccionInicio").classList = "error";
    } else {
        document.getElementById("labelDireccionInicio").innerHTML = "";
    };

    let direccionTermino = document.getElementById("direccionTermino").value;
    if (direccionTermino === "" || parseInt(direccionTermino) || !direccionTermino) {
        document.getElementById("labelDireccionTermino").innerHTML = "Se requiere dirección de término";
        document.getElementById("labelDireccionTermino").classList = "error";
    } else {
        document.getElementById("labelDireccionTermino").innerHTML = "";
    };
};

// Ya que aún no puedo calcular la distancia, le asigno un valor aleatorio
function defineDistancia() {
    kilometros = Math.random() * (distanciaMaxima - distanciaMinima) + distanciaMinima;
    kilometros = parseFloat(kilometros.toFixed(1));  //Kilómetros con un decimal
};

// Calcula un precio según el rango de kilómetros
// Espero más adelante poder pedirle este dato a mapas de Google
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

// Función de salida
function muestraResultado() {
    alert(nombre + ", un viaje desde el " + direccionInicio.numero + " de calle " + direccionInicio.calle + " hasta el " + direccionTermino.numero + " de calle " + direccionTermino.calle + " son " + kilometros + " kilómetros, y te costará $" + precio);
};
