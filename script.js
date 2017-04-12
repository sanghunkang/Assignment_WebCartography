// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322



// lyr-tile
var lyr_tile = new ol.layer.Tile({
	source: new ol.source.OSM(),
});

// lyr-vector1
var vectorSource = new ol.source.Vector({
	url: '/data/res.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});
vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

var image = new ol.style.Circle({
	radius: 5,
	fill: null,
	stroke: new ol.style.Stroke({color: 'red', width: 1})
});


var styleFunction = function(feature) {
	// debugger;
	var styles = {
		'Point': new ol.style.Style({
			text: new ol.style.Text({text: feature.I.name}),
			image: image,
		}),
	};
	return styles[feature.getGeometry().getType()];
};

var vectorLayer = new ol.layer.Vector({
	// source: vectorSource,
	source: new ol.source.Vector({
		url: 'data/res.geojson',
		projection: 'EPSG:4326',
		format: new ol.format.GeoJSON(),
	}),
	style: styleFunction,
});

// lyr-vector2
var source = new ol.source.Vector({wrapX: false}); 
var lyr_vector2 = new ol.layer.Vector({
	source: source
});

// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_vector2, vectorLayer],
	view: new ol.View({
		center: ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857'),
		zoom: 13,
	})
});

// ACTIONS
var typeSelect = document.getElementById('type');
var draw; // global so we can remove it later
function addInteraction() {
	var value = typeSelect.value;
	if (value !== 'None') {
		draw = new ol.interaction.Draw({
			source: source,
			type: typeSelect.value, /** @type {ol.geom.GeometryType} */ 
		});
		console.log(typeSelect.value);
		map.addInteraction(draw);
	}
}

/**
* Handle change event.
*/
typeSelect.onchange = function() {
	map.removeInteraction(draw);
	addInteraction();
};
addInteraction();


$(document).ready(function(){
});