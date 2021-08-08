/* -------------------------------------------------------------------------- */
/*                               Define funciones                             */
/* -------------------------------------------------------------------------- */
/* ------- Función para almacenar los datos del formulario localmente ------- */
// Guarda en formato JSON, uno para las direcciones y otro para los datos del cliente
function guardarLocal(servicio, nombre, telefono, direccionInicio, direccionTermino) {
    this.servicio = servicio;
    this.nombre = nombre;
    this.telefono = telefono;
    let user = { nombre: this.nombre, servicio: this.servicio, telefono: this.telefono };
    let userJson = JSON.stringify(user);
    localStorage.setItem("userJson", userJson);

    this.direccionInicio = direccionInicio;
    this.direccionTermino = direccionTermino;
    let address = { direccionInicio: this.direccionInicio, direccionTermino: this.direccionTermino };
    let addressJson = JSON.stringify(address);
    localStorage.setItem("addressJson", addressJson);
};

/* ------------------- Calcula Distancia usando Google ------------------- */
function defineDistancia() {
    kilometros = 0;
    const service = new google.maps.DistanceMatrixService(); 
    let inicio = document.getElementById("direccionInicio").value;
    let termino = document.getElementById("direccionTermino").value;
    const matrixOptions = {
        origins: [inicio],
        destinations: [termino],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };
    // Llama el servicio  Distance Matrix
    service.getDistanceMatrix(matrixOptions, callback);
    // Función callback usada para procesar la respuesta de Distance Matrix
    function callback(response, status) {
        if (status !== "OK") {
            alert("Error - no se puede obtener la distancia");
            return;
        }
        console.log(response);
        direccionInicialMap = response.originAddresses[0];
        direccionFinalMap = response.destinationAddresses[0];
        // $("#direccionInicio").value = direccionInicialMap;
        // $("#direccionTermino").value = direccionFinalMap;
        kilometros = response.rows[0].elements[0].distance.value / 1000;
        kilometros = parseFloat(kilometros.toFixed(1));  //Kilómetros con un decimal
        alert("Salida defineDistancia: inicio " + direccionInicialMap + "; fin " +  direccionFinalMap + "; km " + kilometros);
    }
};

/* ------------- Calcula un precio según el rango de kilómetros ------------- */
function calculaPrecio() {
    if (kilometros <= 30) {
        precio = kilometros * 2000;
    } else if (kilometros > 30 && kilometros <= 60) {
        precio = kilometros * 1500;
    } else {
        precio = kilometros * 1000;
    };
    alert("Salida calculaPrecio: " + precio);
};

/* ---------------------------- Función de salida --------------------------- */
function redactaResultado() {
    // Carga los datos almacenados en variables globales
    this.kilometros = kilometros;
    this.precio = precio;
    // Carga los datos almacenados previamente en el localStorage
    let userJson = localStorage.getItem("userJson");
    let user = JSON.parse(userJson);
    let addressJson = localStorage.getItem("addressJson");
    let address = JSON.parse(addressJson);
    this.nombre = user.nombre;
    this.servicio = user.servicio;
    this.direccionInicio = address.direccionInicio;
    this.direccionTermino = address.direccionTermino;
    // Construye texto de salida
    let textoSalida = this.nombre + ", un viaje de " + this.servicio + " desde " + this.direccionInicio + " hasta " + this.direccionTermino + " son " + this.kilometros + " kilómetros, y te costará $" + this.precio;
    // Refresca texto del modal
    $("#salidaModal").empty();
    // Agrega texto de salida al modal
    $("#salidaModal").append(function () {
        return textoSalida;
    });
};

/* ------------ Trae datos de un ejecutivo ficticio mediante AJAX ----------- */
function buscaEjecutivo() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=1&inc=name,email,cell,picture&noinfo',
        dataType: 'json',
        success: function (data) {
            // Asigna variables
            let nombreEjecutivo = data.results[0].name.first + " " + data.results[0].name.last;
            let celularEjecutivo = data.results[0].cell;
            let emailEjecutivo = data.results[0].email;
            let fotoEjecutivo = data.results[0].picture.large;
            // Construye respuesta desde el array que entrega la API
            let agregar = "<img src='" + fotoEjecutivo + "' alt=''><p>Tu Ejecutivo asignado es: " + nombreEjecutivo + "</p><p>Llámalo al " + celularEjecutivo + "</p><p>O escríbele a " + emailEjecutivo + "</p>"
            // Inserta el html con los nuevos datos en el modal
            $("#ejecutivo").html(agregar);
        }
    });
};

/* ------------------- Esta función envía datos a una API ------------------- */
// usando fetch. En este caso es una API de prueba
// pero podría usarse para guardar los datos de clientes en una base de datos
function enviarDatosAPI(servicio, nombre, telefono, direccionInicio, direccionTermino) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            nombre: this.nombre,
            teléfono: this.telefono,
            servicio: this.servicio,
            direccionInicio: this.direccionInicio,
            direccionTermino: this.direccionTermino,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        // Recibe respuesta y la muestra por consola
        .then((response) => response.json())
        .then((json) => console.log(json));
};


/* -------------------- Valida los campos del formulario -------------------- */
// Al hacer click en el botón y muestra los hints correspondientes
// Ver cómo se puede simplificar, al parecer se repite la lógica
function valida() {
    //Trae datos de ejecutivo ficticio
    buscaEjecutivo();
    // Array para validar las entradas con True o False
    let validado = [];
    // Valida que el tipo de servicio no esté vacío
    let servicio = $("#servicio").val();
    if (servicio == ".") {
        $("#labelServicio").html("Tipo de servicio requerido");
        $("#labelServicio").addClass("error");
        validado.push("false");
    } else {
        $("#labelServicio").html("");
        validado.push("true");
    };
    // Valida que el nombre no esté vacío o sean sólo números
    let nombre = $("#nombre").val();
    if (nombre === "" || parseInt(nombre) || !nombre) {
        $("#labelNombre").html("Nombre requerido, sin cifras");
        $("#labelNombre").addClass("error");
        validado.push("false");
    } else {
        $("#labelNombre").html("");
        validado.push("true");
    };
    // Valida que el teléfono contenga sólo números
    let telefono = $("#telefono").val();
    if (!parseInt(telefono)) {
        $("#labelTelefono").html("Teléfono requerido, sólo cifras");
        $("#labelTelefono").addClass("error");
        validado.push("false");
    } else {
        $("#labelTelefono").html("");
        validado.push("true");
    };
    // Valida que haya una dirección de inicio validada por servicio de Google
    let direccionInicio = $("#direccionInicio").val();
    if (direccionInicio === "" || parseInt(direccionInicio) || !direccionInicio) {
        $("#labelDireccionInicio").html("Se requiere dirección de inicio");
        $("#labelDireccionInicio").addClass("error");
        validado.push("false");
    } else {
        $("#labelDireccionInicio").html("");
        validado.push("true");
    };
    // Valida que exista una dirección de destino validada por servicio de Google
    let direccionTermino = $("#direccionTermino").val();
    if (direccionTermino === "" || parseInt(direccionTermino) || !direccionTermino) {
        $("#labelDireccionTermino").html("Se requiere dirección de término");
        $("#labelDireccionTermino").addClass("error");
        validado.push("false");
    } else {
        $("#labelDireccionTermino").html("");
        validado.push("true");
    };
    // Si en el array de control todos los valores son True, cambia la clase del botón a activo y habilita acciones
    if (!validado.includes("false")) {
        // Guarda los datos en el localStorage
        guardarLocal(servicio, nombre, telefono, direccionInicio, direccionTermino);
        // Envía los datos a una API externa - ver función
        enviarDatosAPI(servicio, nombre, telefono, direccionInicio, direccionTermino);
        // Cambia el botón por uno activo
        let btn = "<button class='boton' id='botonCotizar' data-toggle='modal' data-target ='#modalSalida' >Cotizar</button>"
        $("#finFormulario").html(btn);
        // Evita que la página se refresque para que el modal se visualice correctamente
        $("#botonCotizar").click(function (e) {
            e.preventDefault();
        });
    } else {
        if (validado.includes("false")) {
            // Cambia el botón por uno desactivado
            let btn = "<button class='boton--desactivado'  disabled id='botonCotizar'>Cotizar</button>";
            $("#finFormulario").html(btn);
            // Evita que la página se refresque para que el modal se visualice correctamente
            $("#botonCotizar").click(function (e) {
                e.preventDefault();
            });
        }
    }
    // Modifica texto del modal de salida
    defineDistancia();
    calculaPrecio();
    redactaResultado();



};
