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
		font: '10px Calibri bold, sans-serif',
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

function styleFunction_lyr_v1(feature){
	var styles = new ol.style.Style({
		text: lyr_v1_style_text(feature),
		image: lyr_v1_style_image(feature),
	});
	return styles;
};

var style_lyr_v1 = function(feature) {
	var geom = feature.getGeometry().getType();
	if(geom == 'Point') {
		var styles = styleFunction_lyr_v1(feature);
	};
	return styles;
};

var lyr_v1 = new ol.layer.Vector({
	source: source_v1,
	style: style_lyr_v1,
});

// LAYER VECTOR2
var source_v2 = new ol.source.Vector({
	url: 'data/poi.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});
// vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

function lyr_v2_style_text(feature){
	style_text = new ol.style.Text({
		text: feature.getProperties()['name'],
		font: '20px Calibri bold,sans-serif',
	});
	return style_text
};

function lyr_v2_style_image(feature) {
	var style_image = new ol.style.Circle({
		radius: 10,
		fill: new ol.style.Fill({color: 'rgba(0, 255, 255, 0.5)'}),
		stroke: new ol.style.Stroke({color: 'green', width: 1})
	});
	return style_image
};

function styleFunction_lyr_v2(feature){
	var styles = new ol.style.Style({
		text: lyr_v2_style_text(feature),
		image: lyr_v2_style_image(feature),
	});
	return styles;
};

var style_lyr_v2 = function(feature) {
	var geom = feature.getGeometry().getType();
	if(geom == 'Point') {
		var styles = styleFunction_lyr_v2(feature);
	};
	return styles;
};

var lyr_v2 = new ol.layer.Vector({
	source: source_v2,
	style: style_lyr_v2,
});

// LAYER VECTOR3
var source_v3 = new ol.source.Vector({
	url: 'data/att.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});
// vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

function lyr_v3_style_text(feature){
	style_text = new ol.style.Text({
		text: feature.getProperties()['name'],
		font: '5px Calibri bold,sans-serif',
	});
	return style_text
};

function lyr_v3_style_image(feature) {
	var style_image = new ol.style.Circle({
		radius: 10,
		fill: new ol.style.Fill({color: 'rgba(255, 0, 0, 0.5)'}),
		stroke: new ol.style.Stroke({color: 'blue', width: 1})
	});
	return style_image
};

function styleFunction_lyr_v3(feature){
	var styles = new ol.style.Style({
		text: lyr_v3_style_text(feature),
		image: lyr_v3_style_image(feature),
	});
	return styles;
};

var style_lyr_v3 = function(feature) {
	var geom = feature.getGeometry().getType();
	if(geom == 'Point') {
		var styles = styleFunction_lyr_v3(feature);
	};
	return styles;
};

var lyr_v3 = new ol.layer.Vector({
	source: source_v3,
	style: style_lyr_v3,
});

var selectClick = new ol.interaction.Select({
	condition: ol.events.condition.click
});

var selectPointerMove = new ol.interaction.Select({
	condition: ol.events.condition.pointerMove
});

function onMouseMove(browserEvent) {
	var coordinate = browserEvent.coordinate;
	var pixel = map.getPixelFromCoordinate(coordinate);
	var el = document.getElementById('name');
	el.innerHTML = '';
	map.forEachFeatureAtPixel(pixel, function(feature) {
	  el.innerHTML += feature.get('name') + '<br>';
	});
};


// LAYER VECTOR2
var source_v4 = new ol.source.Vector({wrapX: false}); 
var lyr_v4 = new ol.layer.Vector({
	source: source_v4
});

// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_v1, lyr_v2, lyr_v3, lyr_v4],
	view: new ol.View({
		center: ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857'),
		zoom: 13,
	})
});


$(document).ready(function(){
	$.getJSON('data/res.geojson', function(response) {
		for(var i =0; i < 10; i ++) {
			var name_res = response.features[i].properties.name;
			var html = '<option data-tokens="ketchup mustard">'+ name_res +'</option>';
			$('#select1').append( html ).selectpicker('refresh');
		};
	});

	$.getJSON('data/poi.geojson', function(response) {
		for(var i =0; i < 10; i ++) {
			var name_res = response.features[i].properties.name;
			var html = '<option data-tokens="ketchup mustard">'+ name_res +'</option>';
			$('#select2').append( html ).selectpicker('refresh');
		};
	});

	$.getJSON('data/att.geojson', function(response) {
		for(var i =0; i < 10; i ++) {
			var name_res = response.features[i].properties.name;
			var html = '<option data-tokens="ketchup mustard">'+ name_res +'</option>';
			$('#select3').append( html ).selectpicker('refresh');
		};
	});

	// ACTIONS
	/**
	* Add a click handler to hide the popup.
	* @return {boolean} Don't follow the href.
	*/
	// LAYER OVERLAY1
	var container = document.getElementById('popup');
	// var content = document.getElementById('popup-content');
	var closer = document.getElementById('popup-closer');

	// var typeSelect = $(document).getElementById('type');
	var lyr_o1 = new ol.Overlay(({
		element: container,
		autoPan: true,
		autoPanAnimation: {
			duration: 250
		}
	}));

	closer.onclick = function() {
		lyr_o1.setPosition(undefined);
		closer.blur();
		return false;
	};

	map.addOverlay(lyr_o1)
	map.on('singleclick', function(e) {
		var coordinate = e.coordinate;
		var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
		console.log(e.target);
		var res_name = e.target.getProperties()['name'];
		// content.innerHTML = '<p>You clicked here:</p><code>' + hdms + res_name
		// 	'</code>';
		// lyr_o1.setPosition(coordinate);
	});

	var select = selectClick;  // ref to currently selected interaction
	// var select = selectPointerMove;  // ref to currently selected interaction
	// var selectElement = document.getElementById('type');
	
	map.addInteraction(select);
	select.on('select', function(e) {
		var properties = e.selected[0].getProperties();
		$('#status').append('&nbsp;' + properties['name']);

		$('#some-box').empty();
		$('#some-box').append(properties['name']);

		$('#popup-content').empty()
		$('#popup-content').append('<p>You clicked here:</p><code>' + properties['name'] + '</code>');
		// content.innerHTML = '<p>You clicked here:</p><code>' + properties['name'] + '</code>';
		var coordinate = e.selected[0].getGeometry().getCoordinates();
		lyr_o1.setPosition(coordinate);
	});
});
