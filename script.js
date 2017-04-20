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
	url: 'data/preference.geojson',
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

// LAYER VECTOR4
var source_v4 = new ol.source.Vector({
	url: 'data/preference.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});

function lyr_v4_style_text(feature){
	style_text = new ol.style.Text({
		text: feature.getProperties()['name'],
		font: '50px Calibri bold,sans-serif',
	});
	return style_text
};

function lyr_v4_style_image(feature) {
	var style_image = new ol.style.Circle({
		radius: 10,
		fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 1)'}),
		stroke: new ol.style.Stroke({color: 'green', width: 1})
	});
	return style_image
};

function styleFunction_lyr_v4(feature){
	var styles = new ol.style.Style({
		text: lyr_v4_style_text(feature),
		image: lyr_v4_style_image(feature),
	});
	return styles;
};

var style_lyr_v4 = function(feature) {
	var geom = feature.getGeometry().getType();
	if(geom == 'Point') {
		var styles = styleFunction_lyr_v4(feature);
	};
	return styles;
};

var lyr_v4 = new ol.layer.Vector({
	source: source_v4,
	style: style_lyr_v4,
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


// // LAYER VECTOR2
// var source_v4 = new ol.source.Vector({wrapX: false}); 
// var lyr_v4 = new ol.layer.Vector({
// 	source: source_v4
// });


// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_v1, lyr_v4],//, lyr_v3, lyr_v4],
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
	];
	$( '#tags' ).autocomplete({
		source: availableTags
	});
	$('#tags').attr('autocomplete','on');

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

	$.getJSON('data/preference.geojson', function(response) {
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

	map.addOverlay(lyr_o1)

	$('#popup-closer').click(function() {
		lyr_o1.setPosition(undefined);
		$(this).blur();
		return false;
	});

	
	map.on('singleclick', function(e) {
		var coordinate = e.coordinate;
		var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
		var res_name = e.target.getProperties()['name'];
		$('#popup-content').innerHTML = '<p>You clicked here:</p><code>' + hdms + res_name + '</code>';
		lyr_o1.setPosition(coordinate);
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
		$('#box1').append('<p>' + properties['is_favorite'] + '</p>');

		$('#popup-content').empty();
		$('#popup-content').append('<p>You clicked here:</p><code>' + properties['name'] + '</code>');
		
		lyr_o1.setPosition(coordinate);
		console.log(properties['is_favorite']);
		if( properties['is_favorite'] == "TRUE" ) {
			$('#box2').empty();
			$('#box2').append('<form action="delete_from_my_list.php" method="post"><button type="button" class="btn btn-danger" id="delete_from_my_list">Delete from My List</button></form>');		
		} else {
			$('#box2').empty();
			$('#box2').append('<form action="add_to_my_list.php" method="post"><button type="button" class="btn btn-primary" id="add_to_my_list">Add to My List</button></form>');
		};

		$('#delete_from_my_list').click(function () {
			var request = new XMLHttpRequest();
			request.open("GET", "data/preference.geojson", false);
			request.send(null)
			var geojsonObject = JSON.parse(request.responseText);
			var coordinate_write = ol.proj.transform(coordinate,'EPSG:3857','EPSG:4326');
			coordinate_write =  [parseFloat(coordinate_write[0]), parseFloat(coordinate_write[1])];

			var selectedObject = {
				"geometry":{
					"coordinates": [parseFloat(coordinate_write[0]), parseFloat(coordinate_write[1])],
					"type": "Point",
				},
				"properties": {
					"address": properties['address'], 
					"id": properties['id'], 
					"name": properties['name'],
					"subCategory": properties['subCategory'],
					"is_favorite": properties['is_favorite'],
				}, 
				"type": "Feature",
		    };
		    index_pop = geojsonObject.features.indexOf(selectedObject);
		    geojsonObject.features.splice(index_pop, 1);

			$.ajax({
		        type : "POST",
		        url : "delete_from_my_list.php",
		        dataType : 'geojson',
		        data : {
		            geojson : geojsonObject,
		        },
		    });
		    $(document).reload();
		});

		$('#add_to_my_list').click(function (e) {
			var request = new XMLHttpRequest();
			request.open("GET", "data/preference.geojson", false);
			request.send(null)
			var geojsonObject = JSON.parse(request.responseText);
			var coordinate_write = ol.proj.transform(coordinate,'EPSG:3857','EPSG:4326');
			console.log(coordinate_write);
			coordinate_write =  [parseFloat(coordinate_write[0]), parseFloat(coordinate_write[1])];
			console.log(coordinate_write);

			var selectedObject = {
				"geometry":{
					"coordinates": [parseFloat(coordinate_write[0]), parseFloat(coordinate_write[1])],
					"type": "Point",
				},
				"properties": {
					"address": properties['address'], 
					"id": properties['id'], 
					"name": properties['name'],
					"subCategory": properties['subCategory'],
					"is_favorite": "TRUE",
				}, 
				"type": "Feature",
		    };
		    geojsonObject["features"].push( selectedObject );

			$.ajax({
		        type : "POST",
		        url : "add_to_my_list.php",
		        dataType : 'geojson',
		        data : {
		            geojson : geojsonObject,
		        },
		    });
		});
	});

	$('#go').click(function () {
		// debugger;
		var value_target = $('#select1').val();
		for(var f = 0; f < lyr_v1.getSource().getFeatures().length; f++) {
			if(lyr_v1.getSource().getFeatures()[f].getProperties()['name'] == value_target) {
				console.log(lyr_v1.getSource().getFeatures()[f].getProperties()['name']);
				var coord = lyr_v1.getSource().getFeatures()[f].getGeometry().getCoordinates();
				console.log(coord);
				var view = new ol.View({
					center: coord,
					zoom: 13,
				});
				map.setView(view);
				view.animate({
					center: coord,
					duration: 3000,
				});
			};
		};
	});
});
