/* -------------------------------------------------------------------------- */
/*                               Define funciones                             */
/* -------------------------------------------------------------------------- */

/* ------- Función para almacenar los datos del formulario localmente ------- */
// Guarda en formato JSON, uno para las direcciones y otro para los datos del cliente
function guardarLocal(servicio, nombre, telefono, direccionInicialMap, direccionFinalMap) {
    this.servicio = servicio;
    this.nombre = nombre;
    this.telefono = telefono;
    let user = { nombre: this.nombre, servicio: this.servicio, telefono: this.telefono };
    let userJson = JSON.stringify(user);
    localStorage.setItem("userJson", userJson);

    this.direccionInicio = direccionInicialMap;
    this.direccionTermino = direccionFinalMap;
    let address = { direccionInicio: this.direccionInicio, direccionTermino: this.direccionTermino };
    let addressJson = JSON.stringify(address);
    localStorage.setItem("addressJson", addressJson);
};


/* ------------- Calcula un precio según el rango de kilómetros ------------- */
function calculaPrecio(servicio, kilometros) {
    //Filtra array con precios de servicios
    let result = services.find(servicio => servicio.tipoServicio === this.servicio);
    //Transforma el precio en número
    let precioKm = parseInt(result.precioPorKm);
    //Calcula importe
    precio = kilometros * precioKm;
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


/* ---------------------------- Función de salida --------------------------- */
function redactaResultado() {
    // Carga los datos almacenados previamente en el localStorage
    let userJson = localStorage.getItem("userJson");
    console.log("userJson: "+userJson)
    let user = JSON.parse(userJson);
    let addressJson = localStorage.getItem("addressJson");
    let address = JSON.parse(addressJson);
    this.nombre = user.nombre;
    this.servicio = user.servicio;
    this.direccionInicio = address.direccionInicio;
    this.direccionTermino = address.direccionTermino;
    // Construye texto de salida
    let textoSalida = this.nombre + ", un viaje de " + this.servicio + " desde " + this.direccionInicio + " hasta " + this.direccionTermino + " son " + kilometros + " kilómetros, y te costará $" + precio;
    // Refresca texto del modal
    $("#salidaModal").empty();
    // Agrega texto de salida al modal
    $("#salidaModal").append(function () {
        return textoSalida;
    });
};


/* ------------------- Refresca los campos del formulario ------------------- */
function refrescarFormulario() {
    $("#servicio").val(".");
    $("#nombre").val("");
    $("#telefono").val("");
    $("#direccionInicio").val("");
    $("#direccionTermino").val("");
    valida();
};


/* -------------------------------------------------------------------------- */
/*                      FUNCIONES DE VALIDACION DE CAMPOS                     */
/* -------------------------------------------------------------------------- */

/* ------------------------ Resetea array de control ------------------------ */
function resetValidado() {
    validado = [];
    proof = false;
}

/* -------------- Valida que el tipo de servicio no esté vacío -------------- */
function validaServicio() {
    let servicio = $("#servicio").val();
    if (servicio == ".") {
        $("#labelServicio").html("Tipo de servicio requerido");
        $("#labelServicio").addClass("error");
        validado.push("mal");
    } else {
        $("#labelServicio").html("");
        validado.push("bien");
    };
};


/* --------- Valida que el nombre no esté vacío o sean sólo números --------- */
function validaNombre() {
    let nombre = $("#nombre").val();
    if (nombre === "" || parseInt(nombre) || !nombre) {
        $("#labelNombre").html("Nombre requerido, sin cifras");
        $("#labelNombre").addClass("error");
        validado.push("mal");
    } else {
        $("#labelNombre").html("");
        validado.push("bien");
    };
};


/* -------------- Valida que el teléfono contenga sólo números -------------- */
function validaTelefono() {
    let telefono = $("#telefono").val();
    if (!parseInt(telefono)) {
        $("#labelTelefono").html("Teléfono requerido, sólo cifras");
        $("#labelTelefono").addClass("error");
        validado.push("mal");
    } else {
        $("#labelTelefono").html("");
        validado.push("bien");
    };
};


/* ---------- Valida direcciones y Calcula Distancia usando Google ---------- */
async function validaDirecciones() {
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
    const ok = await service.getDistanceMatrix(matrixOptions, callback);

    // Función callback usada para procesar la respuesta de Distance Matrix
    function callback(response, status) {
        if (status !== "OK") {
            alert("Error - no se puede obtener la distancia");
            return;
        }
        console.log("Respuesta API Distance: ");
        console.log(response);
        //Asigna valor a direccion de inicio
        if (response.originAddresses[0] === "") {
            $("#labelDireccionInicio").html("Se requiere dirección de inicio válida");
            $("#labelDireccionInicio").addClass("error");
            validado.push("mal");
        } else {
            direccionInicialMap = response.originAddresses[0];
            $("#direccionInicio").value = direccionInicialMap;
            $("#labelDireccionInicio").html("");
            validado.push("bien");
        };
        //Asigna valor a direccion de termino
        if (response.destinationAddresses[0] === "") {
            $("#labelDireccionTermino").html("Se requiere dirección de término válida");
            $("#labelDireccionTermino").addClass("error");
            validado.push("mal");
        } else {
            direccionFinalMap = response.destinationAddresses[0];
            $("#labelDireccionTermino").html("");
            validado.push("bien");
        };
        //Asigna valor a kilometros
        if (response.rows[0].elements[0].status === "NOT_FOUND") {
            kilometros = 0;
        } else {
            kilometros = response.rows[0].elements[0].distance.value / 1000;
            kilometros = parseFloat(kilometros.toFixed(1));  //Kilómetros con un decimal
        };
    };
};


/* ---------------------------- Función principal --------------------------- */
async function valida() {
    resetValidado();
    validaServicio();
    validaNombre();
    validaTelefono();
    const ok = await validaDirecciones();

    // Cambia el botón por uno desactivado
    let btn = "<button class='boton--desactivado'  disabled id='botonCotizar'>Cotizar</button>";
    $("#finFormulario").html(btn);

    // Si el array de control tiene solo valores "bien", cambia la clase del botón a activo y habilita acciones
    proof = !validado.includes("mal");
    if (proof) {
        // Guarda los datos en el localStorage
        let servicio = $("#servicio").val();
        let nombre = $("#nombre").val();
        let telefono = $("#telefono").val();
        guardarLocal(servicio, nombre, telefono, direccionInicialMap, direccionFinalMap);
        // Envía los datos a una API externa - ver función
        enviarDatosAPI(servicio, nombre, telefono, direccionInicialMap, direccionFinalMap);
        //Trae datos de ejecutivo ficticio desde API externa
        buscaEjecutivo();
        //Calcula el precio según el servicio seleccionado
        calculaPrecio(servicio, kilometros);
        //Redacta el resultado
        redactaResultado();
        // Cambia el botón por uno activo
        let btn = "<button type=submit class='boton' id='botonCotizar' data-toggle='modal' data-target ='#modalSalida' >Cotizar</button>"
        $("#finFormulario").html(btn);
        // Evita que la página se refresque para que el modal se visualice correctamente
        $("#botonCotizar").click(function (e) {
            e.preventDefault();
        });
    }
};
