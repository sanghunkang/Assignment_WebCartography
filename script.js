// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322

// FUNCTIONS
function write_name(){
	return function(feature){
		var style_text = new ol.style.Text({
			font: 'bold 14px sans-serif',
			text: feature.get('name')
		});
		return style_text;
	}
};

// VARIABLES
// Coordinate of initial point
var coordinate = ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857');

// Load Tiles
var lyr_tile = new ol.layer.Tile({
	source: new ol.source.OSM()
});

// Load Restaurants
var lyr_vector_res = new ol.layer.Vector({
	source: new ol.source.Vector({
	    url: 'data/res.geojson',
	    projection: 'EPSG:4326',
	    format: new ol.format.GeoJSON()
	}),
	style: new ol.style.Style({
		image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: 'rgb(255,0,0)'
			}),
			radius: 5,
			stroke: new ol.style.Stroke({
				color: '#000000',
				width: 1
			}),
			// text: new ol.style.Text({
			// 	font: 'bold 14px sans-serif',
			// 	text: feature.get('name')
			// })
    	})
    })
});
lyr_vector_res.on('click', function(evt) {
    console.log('a point is clicked')
});


var vectorBuffers= new ol.layer.Vector({
  source: new ol.source.Vector({})
});

// Show the Map
var map = new ol.Map({
	layers: [
		lyr_tile,
		lyr_vector_res,
		vectorBuffers
	],
	view: new ol.View({center: coordinate,zoom: 13}),
	target: 'map'
});

// RESTAURANTS
// Styler function for restaurant features
var popup = new ol.Overlay({
  element: document.getElementById('popup')
});


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
	element: container,
	autoPan: true,
	autoPanAnimation: {
	  duration: 250
	}
}));



var selectClick = new ol.interaction.Select({
	multi: true,
	// condition: ol.events.condition.shiftKeyOnly 
});

selectClick.on('select', function(evt) {
	var features = evt.selected;
	console.log('Pointer is clicked');
	var coordinate = evt.coordinate;
	console.log(evt.selected[0]);
	console.log(evt.coordinate);
	var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));

	content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
	overlay.setPosition(coordinate);
});

var hoverInteraction = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove,
    // layers: lyr_vector_res  //Setting layers to be hovered
});

hoverInteraction.on('pointermove', function(evt){
	console.log('Pointer is on');
})


function toggleControl(element) {
    for(key in drawControls) {
        var control = drawControls[key];
        if(element.value == key && element.checked) {
            control.activate();
        } else {
            control.deactivate();
        }
    }
}

var polygonLayer = new ol.layer.Vector("Polygon Layer");

// Initialise the Document
$(document).ready(function(){
	// map.addOverlay(overlay);
	map.addInteraction(selectClick);
	map.addInteraction(hoverInteraction);
});

// map = new OpenLayers.Map('map');
// var wmsLayer = new OpenLayers.Layer.WMS( "OpenLayers WMS", 
//     "http://vmap0.tiles.osgeo.org/wms/vmap0?", {layers: 'basic'}); 

// map.addLayers([wmsLayer, polygonLayer]);
    
    
    