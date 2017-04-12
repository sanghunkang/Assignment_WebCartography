// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322



// lyr-tile
var lyr_tile = new ol.layer.Tile({
	source: new ol.source.OSM(),
});

// LAYER VECTOR1
var source_v1 = new ol.source.Vector({
	url: 'data/res.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});
// vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

function lyr_v1_style_text(feature){
	style_text = new ol.style.Text({
		text: feature.getProperties()['name'],
		font: '20px Calibri bold,sans-serif',
	});
	return style_text
};

function lyr_v1_style_image(feature) {
	var style_image = new ol.style.Circle({
		radius: 10,
		fill: new ol.style.Fill({color: 'rgba(0, 0, 255, 0.5)'}),
		stroke: new ol.style.Stroke({color: 'red', width: 1})
	});
	return style_image
};

function styleFunction_point(feature){
	var styles = new ol.style.Style({
		text: lyr_v1_style_text(feature),
		image: lyr_v1_style_image(feature),
	});
	return styles;
};

var styleFunction = function(feature) {
	var geom = feature.getGeometry().getType();
	if(geom == 'Point') {
		var styles = styleFunction_point(feature);
	};
	return styles;
};

var lyr_v1 = new ol.layer.Vector({
	source: source_v1,
	style: styleFunction,
});

// LAYER VECTOR2
var source_v2 = new ol.source.Vector({wrapX: false}); 
var lyr_v2 = new ol.layer.Vector({
	source: source_v2
});

// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_v1, lyr_v2],
	view: new ol.View({
		center: ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857'),
		zoom: 13,
	})
});




$(document).ready(function(){
	// ACTIONS
	var typeSelect = document.getElementById('type');
	// var typeSelect = $('#type');
	console.log($('#type'))
	var draw; // global so we can remove it later
	function addInteraction() {
		var value = typeSelect.value;
		if (value !== 'None') {
			draw = new ol.interaction.Draw({
				source: source_v2,
				type: typeSelect.value, /** @type {ol.geom.GeometryType} */ 
			});
			console.log(typeSelect.value);
			map.addInteraction(draw);
		}
	};

	/**
	* Handle change event.
	*/
	typeSelect.onchange = function() {
		map.removeInteraction(draw);
		addInteraction();
	};
	addInteraction();
});
