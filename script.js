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
    var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme",
	];
	$( "#tags" ).autocomplete({
		source: availableTags
	});

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

	var lyr_o1 = new ol.Overlay(({
		element: document.getElementById('popup'),
		autoPan: true,
		autoPanAnimation: {
			duration: 250
		}
	}));

	$('#popup-closer').click(function() {
		lyr_o1.setPosition(undefined);
		$(this).blur();
		return false;
	});

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

	map.addInteraction(selectClick);
	selectClick.on('select', function(e) {
		var coordinate = e.selected[0].getGeometry().getCoordinates();
		var properties = e.selected[0].getProperties();
		
		$('#status').empty();
		$('#status').append('&nbsp;' + properties['name']);

		$('#box1').empty();
		$('#box1').append('<hidden id="coord_res">' + coordinate + '</hidden>');
		$('#box1').append('<p id="name_res">' + properties['name'] + '</p>');
		$('#box1').append('<p id="address_res">' + properties['address'] + '</p>');
		$('#box1').append('<p id="id_res">' + properties['id'] + '</p>');
		$('#box1').append('<p id="subCategory_res">' + properties['subCategory'] + '</p>');

		$('#popup-content').empty();
		$('#popup-content').append('<p>You clicked here:</p><code>' + properties['name'] + '</code>');
		
		lyr_o1.setPosition(coordinate);
	});


	$('#go').click(function () {
		console.log(lyr_v1.getProperties());
		for(var i = 0; i < lyr_v1.features.length; i++) { 
		    if(lyr_v1.features[i].attributes.searchedAttribute == 'BurgerKing'){ 
		    	selectFeatureControl.select(lyr_v1.features[i]); 
		    	break; 
			} 
		};
	});

	$('#add_to_my_list').click(function () {
		var geojsonObject = {
			"features": [
				{
					"geometry":{
						"coordinates": $('#coord_res').val(),
						"type": "Point",
					},
					"properties": {
						"address": $('#address_res').val(), 
						"id": $('#id_res').val(), 
						"name": $('#name_res').val(), 
						"subCategory": $('#subCategory_res').val(),
					}, 
					"type": "Feature",
				},
			],
	    };
		$.ajax({
	        type : "POST",
	        url : "add_to_my_list.php",
	        dataType : 'geojson',
	        data : {
	            json : geojsonObject
	        }
	    });
	});
});