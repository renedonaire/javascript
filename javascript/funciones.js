/* -------------------------------------------------------------------------- */
/*                               Define funciones                             */
/* -------------------------------------------------------------------------- */
/* ------- Función para almacenar los datos del formulario localmente ------- */
// Ver cómo se puede simplificar, al parecer se repite la lógica
function guardarLocal(servicio, nombre, telefono, direccionInicio, direccionTermino) {
    this.servicio = servicio;
    localStorage.setItem("servicio", this.servicio);
    this.nombre = nombre;
    localStorage.setItem("nombre", this.nombre);
    this.telefono = telefono;
    localStorage.setItem("telefono", this.telefono);
    this.direccionInicio = direccionInicio;
    localStorage.setItem("direccionInicio", this.direccionInicio);
    this.direccionTermino = direccionTermino;
    localStorage.setItem("direccionTermino", this.direccionTermino);
};

/* ------------------- Asigna valor aleatorio a Distancia ------------------- */
function defineDistancia() {
    kilometros = Math.random() * (distanciaMaxima - distanciaMinima) + distanciaMinima;
    kilometros = parseFloat(kilometros.toFixed(1));  //Kilómetros con un decimal
};

/* ------------- Calcula un precio según el rango de kilómetros ------------- */
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

/* ---------------------------- Función de salida --------------------------- */
function redactaResultado() {
    // Carga los datos almacenados previamente en el localStorage
    this.kilometros = kilometros;
    this.precio = precio;
    this.name = localStorage.getItem("nombre");
    this.direccionInicio = localStorage.getItem("direccionInicio");
    this.direccionTermino = localStorage.getItem("direccionTermino");
    // Construye texto de salida y lo agrega al modal
    let textoSalida = this.nombre + ", un viaje desde " + this.direccionInicio + " hasta " + this.direccionTermino + " son " + this.kilometros + " kilómetros, y te costará $" + this.precio;
    // Elimina elemento si es que existe y lo reemplaza por el elemento fresco
    let existeTexto = document.getElementById("textoModal");
    if (existeTexto) {
            let text = document.getElementById("textoModal");
            text.remove();
    };
    let text = document.createElement("p");
    text.innerHTML = textoSalida;
    text.id = "textoModal";
    document.getElementById("salidaModal").appendChild(text);
};

/* -------------------- Valida los campos del formulario -------------------- */
// Al hacer click en el botón y muestra los hints corresponientes
// Ver cómo se puede simplificar, al parecer se repite la lógica
function valida() {
    // Array para validar las entradas con True o False
    let validado = [];
    // Valida que el tipo de servicio no esté vacío
    let servicio = document.getElementById("servicio").value;
    if (servicio == ".") {
        document.getElementById("labelServicio").innerHTML = "Tipo de servicio requerido";
        document.getElementById("labelServicio").classList = "error";
        validado.push("false");
    } else {
        document.getElementById("labelServicio").innerHTML = "";
        validado.push("true");
    };
    // Valida que el nombre no esté vacío o sean sólo números
    let nombre = document.getElementById("nombre").value;
    if (nombre === "" || parseInt(nombre) || !nombre) {
        document.getElementById("labelNombre").innerHTML = "Nombre requerido, sin cifras";
        document.getElementById("labelNombre").classList = "error";
        validado.push("false");
    } else {
        document.getElementById("labelNombre").innerHTML = "";
        validado.push("true");
    };
    // Valida que el teléfono contenga sólo números
    let telefono = document.getElementById("telefono").value;
    if (!parseInt(telefono)) {
        document.getElementById("labelTelefono").innerHTML = "Teléfono requerido, sólo cifras";
        document.getElementById("labelTelefono").classList = "error";
        validado.push("false");
    } else {
        document.getElementById("labelTelefono").innerHTML = "";
        validado.push("true");
    };
    // Valida que haya una dirección de inicio
    let direccionInicio = document.getElementById("direccionInicio").value;
    if (direccionInicio === "" || parseInt(direccionInicio) || !direccionInicio) {
        document.getElementById("labelDireccionInicio").innerHTML = "Se requiere dirección de inicio";
        document.getElementById("labelDireccionInicio").classList = "error";
        validado.push("false");
    } else {
        document.getElementById("labelDireccionInicio").innerHTML = "";
        validado.push("true");
    };
    // Valida que exista una dirección de destino
    let direccionTermino = document.getElementById("direccionTermino").value;
    if (direccionTermino === "" || parseInt(direccionTermino) || !direccionTermino) {
        document.getElementById("labelDireccionTermino").innerHTML = "Se requiere dirección de término";
        document.getElementById("labelDireccionTermino").classList = "error";
        validado.push("false");
    } else {
        document.getElementById("labelDireccionTermino").innerHTML = "";
        validado.push("true");
    };
    // Si en el array de control todos los valores son True, agrega el botón al DOM
    // Primero, verifica si ya existe un botón para que no aparezcan múltiples botones al modificar un campo
    let existeBoton = document.getElementById("botonCotizar");
    if (!validado.includes("false")) {
        // Guarda los datos en el localStorage
        guardarLocal(servicio, nombre, telefono, direccionInicio, direccionTermino);
        if (existeBoton == null) {
            let btn = document.createElement("button");
            btn.innerHTML = "Cotizar";
            btn.id = "botonCotizar";
            // Estos atributos son necesarios para mostrar el modal
            btn.dataset.toggle = "modal";
            btn.dataset.target = "#modalSalida";
            document.getElementById("formulario").appendChild(btn);
            btn.className += "boton";
            // Evita que la página se refresque para que el modal se visualice correctamente
            document.getElementById("botonCotizar").addEventListener("click", function (event) {
                event.preventDefault()
            });
        }
    } else {
        if (validado.includes("false") && existeBoton) {
            let btn = document.getElementById("botonCotizar");
            btn.remove();
        }
    }
    // Modifica texto del modal de salida
    calculaPrecio();
    redactaResultado();
};
