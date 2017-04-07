// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322


var coordinate = ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857');

// Load the Map
var map = new ol.Map({
	target: 'map',
	layers: [
		new ol.layer.Tile({source: new ol.source.OSM()})
	],
	view: new ol.View({
		center: coordinate,
		zoom: 13
	})
});

// Load Restaurants
// var marker = new ol.layer.Vector({
// 	new ol.source.Vector({
// 		// url: 'http://tour-pedia.org/api/getPlaceDetails?id=324453',
// 		url: 'http://localhost/exerciseWC/geojson.geojson',
// 		projection: 'EPSG:4326',
// 		format: new ol.format.GeoJSON()
// 	})
// 	style: createPolygonStyle()
// });

// var coordinate2 = ol.proj.transform([52.515183, 13.337202],'EPSG:4326','EPSG:3857');

// var gjOverlay = new ol.layer.Vector({
// 	source: new ol.source.Vector({
// 		url: 'WorldPopulation.geojson',
// 		projection: 'EPSG:4326',
// 		format: new ol.format.GeoJSON()
// 	}),
// 	style: createPolygonStyle()
// });



var marker = new ol.layer.Vector({
	source: new ol.source.Vector({
	    url: 'geojson.geojson',
	    // url: 'WorldPopulation.geojson',
	    projection: 'EPSG:4326',
	    format: new ol.format.GeoJSON()
	}),
	style: new ol.style.Style({
		text: new ol.style.Text({
			text: 'TIERGARTEN QUELLE'
		})
	})
});




// var marker = new ol.Overlay({
// 	element: document.getElementById('easierelement1'),
// 	// element: $(popupStr)[0],
// 	position: coordinate2
// });




// Initialise the Document
$(document).ready(function(){
	// map.addOverlay(gjOverlay);
	map.addOverlay(marker);
	// animation = setInterval(showValuesOnMap, 500, 'feature');
});