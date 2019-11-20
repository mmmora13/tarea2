//funciones
function updateOpacity() {
	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
	temperaturaLayer.setOpacity(document.getElementById("sld-opacity").value);
}

// Creación de un mapa de Leaflet
var map = L.map("mapid");

// Centro del mapa y nivel de acercamiento
var zoomInicio = L.latLng([9.9326673, -84.0787633]);
var zoomLevel = 7; //llega hasta el 20

// Definición de la vista del mapa
map.setView(zoomInicio, zoomLevel);


// Adición de capa
//L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
esriLayer = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
//openRailwayLayer = L.tileLayer.provider("OpenRailwayMap").addTo(map);

//Cargar capas consumiendo servicios WMS
var cantonesWMSLayer = L.tileLayer.wms('http://geos.snitcr.go.cr/be/IGN_5/wms?', {
	layers: 'limitecantonal_5k',
	format: 'image/png',
	transparent: true
}).addTo(map);

var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer
};

var DEMLayer = L.imageOverlay("3.png", 
	[[11.2197734290000000, -85.9790724540000042], 
	[8.0364413690000003, -82.5540738239999996]], 
	{opacity:0.5}
).addTo(map);


var overlayMaps = {
	"Cantón": cantonesWMSLayer,
	"DEM": DEMLayer
};

//controles
control_layers = L.control.layers(baseMaps, overlayMaps,{position: 'topleft'}).addTo(map);	

//Escala del mapa
L.control.scale({imperial:false}).addTo(map);

//capa de provincias en GeoJSON
$.getJSON("provincias.geojson", function(geodata) {
	var layer_geojson_provincias = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#00ffff", 'weight': 4, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Provincia: " + feature.properties.provincia;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_provincias,'Provincia');
});	

//capa de redpasiva en GeoJSON
$.getJSON("redpasiva.geojson", function(geodata) {
	var layer_geojson_redpasiva = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#00ffff", 'weight': 4, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Red_pasiva: " + feature.properties.redpasiva;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_redpasiva,'Red_pasiva');
});

// En Est.Libe: marcador personalizado para la Estacion Liberia de Costa Rica
var MarkerLiberia = L.marker([10.63061, -85.43788],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.CQ: marcador personalizado para la Estacion Ciudad Quesada de Costa Rica
var MarkerCQ = L.marker([10.32259, -84.43089],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.Limón: marcador personalizado para la Estacion Limón de Costa Rica
var MarkerLimon = L.marker([9.99309, -83.02637],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.CN: marcador personalizado para la Estacion Ciudad Neily de Costa Rica
var MarkerCN = L.marker([8.64435, -82.94439],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.Nico: marcador personalizado para la Estacion Nicoya de Costa Rica
var MarkerN = L.marker([10.14401, -85.45501],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.Pun: marcador personalizado para la Estacion Puntarenas de Costa Rica
var MarkerPun = L.marker([9.97988, -84.83214],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.Curri: marcador personalizado para la Estacion Curridabat de Costa Rica
var MarkerCurri = L.marker([9.91968, -84.04907],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);

// En Est.SG: marcador personalizado para la Estacion San Isidro del General de Costa Rica
var MarkerSG = L.marker([9.37314, -83.70425],
	{ icon: L.divIcon(
		{ html: '<i class="fas fa-broadcast-tower"></i>'}
	)}
).addTo(map);



