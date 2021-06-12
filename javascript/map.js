// Según tutorial de Google
function initMap() {
	// Ubicación de mi empresa
	const empresa = { lat: -33.476738, lng: -70.690431 };
	// Mapa ubicado en mi empresa
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: empresa,
	});
	// Marcador en mi empresa
	const marker = new google.maps.Marker({
		position: empresa,
		map: map,
	});
	const cityCircle = new google.maps.Circle({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 1,
		fillColor: "#FF0000",
		fillOpacity: 0.05,
		map,
		center: empresa,
		radius: 30000,
	});
}
