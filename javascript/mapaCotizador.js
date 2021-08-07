function initMap() {
	const map = new google.maps.Map(document.getElementById("map"), {
		mapTypeControl: false,
		center: { lat: -33.4852941, lng: -70.6720072 },
		zoom: 14,
	});
	new AutocompleteDirectionsHandler(map);

	// const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
	// let inicio = document.getElementById("direccionInicio").value;
	// let termino = document.getElementById("direccionTermino").value;
	// const matrixOptions = {
	// 	origins: [inicio], 
	// 	destinations: [termino], 
	// 	travelMode: 'DRIVING',
	// 	unitSystem: google.maps.UnitSystem.METRIC
	// };
	// // Call Distance Matrix service
	// service.getDistanceMatrix(matrixOptions, callback);

	// // Callback function used to process Distance Matrix response
	// function callback(response, status) {
	// 	if (status !== "OK") {
	// 		alert("Error with distance matrix");
	// 		return;
	// 	}
	// 	console.log(response);
	// }


}

class AutocompleteDirectionsHandler {
	map;
	originPlaceId;
	destinationPlaceId;
	travelMode;
	directionsService;
	directionsRenderer;
	constructor(map) {
		this.map = map;
		this.originPlaceId = "";
		this.destinationPlaceId = "";
		this.travelMode = google.maps.TravelMode.DRIVING;
		this.directionsService = new google.maps.DirectionsService();
		this.directionsRenderer = new google.maps.DirectionsRenderer();
		this.directionsRenderer.setMap(map);
		const originInput = document.getElementById("direccionInicio");
		const destinationInput = document.getElementById("direccionTermino");
		const originAutocomplete = new google.maps.places.Autocomplete(originInput);
		originAutocomplete.setFields(["place_id"]);
		const destinationAutocomplete = new google.maps.places.Autocomplete(
			destinationInput
		);
		destinationAutocomplete.setFields(["place_id"]);
		this.setupPlaceChangedListener(originAutocomplete, "ORIG");
		this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
	}

	setupPlaceChangedListener(autocomplete, mode) {
		autocomplete.bindTo("bounds", this.map);
		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();

			if (!place.place_id) {
				window.alert("Please select an option from the dropdown list.");
				return;
			}

			if (mode === "ORIG") {
				this.originPlaceId = place.place_id;
			} else {
				this.destinationPlaceId = place.place_id;
			}
			this.route();
		});
	}
	route() {
		if (!this.originPlaceId || !this.destinationPlaceId) {
			return;
		}
		const me = this;
		this.directionsService.route(
			{
				origin: { placeId: this.originPlaceId },
				destination: { placeId: this.destinationPlaceId },
				travelMode: this.travelMode,
			},
			(response, status) => {
				if (status === "OK") {
					me.directionsRenderer.setDirections(response);
				} else {
					window.alert("Directions request failed due to " + status);
				}
			}
		);
	}
}
