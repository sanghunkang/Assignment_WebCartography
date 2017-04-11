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
	id: 'res',
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

var popup = new ol.Overlay({
  element: document.getElementById('popup')
});

// var osmLayer = new ol.layer.Tile({
// 	source: new ol.source.OSM()
// });

// var selectEuropa = new ol.style.Style({
//   stroke: new ol.style.Stroke({
//     color: '#ff0000',
//     width: 2
// })
// });

// var defaultEuropa = new ol.style.Style({
// 	stroke: new ol.style.Stroke({
// 		color: '#0000ff',
// 		width: 2
// 	})
// });

// var vectorEuropa = new ol.layer.Vector({
// 	id: 'europa',
// 	source: new ol.source.GeoJSON({
// 	projection: 'EPSG:3857',
// 	url: '../assets/data/nutsv9_lea.geojson'
// }),
// 	style: defaultEuropa
// });

var selectInteraction = new ol.interaction.Select({
	layers: function (layer) {
		return layer.get('id') == 'res';
	}
});      

function pickRandomProperty() {
	var prefix = ['bottom', 'center', 'top'];
	var randPrefix = prefix[Math.floor(Math.random() * prefix.length)];
	var suffix = ['left', 'center', 'right'];
	var randSuffix = suffix[Math.floor(Math.random() * suffix.length)];
	return randPrefix + '-' + randSuffix;
}





// map.on('click', function(evt) {
// 	var coordinate = evt.coordinate;
// 	displayFeatureInfo(evt.pixel, coordinate);
// });

// Initialise the Document
$(document).ready(function(){
	var container = $('#popup');
	console.log(container);

	var displayFeatureInfo = function(pixel, coordinate) {
		var features = [];
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			features.push(feature);
		});

		if (features.length > 0) {
			var info = [];
			for (var i = 0, ii = features.length; i < ii; ++i) {
				info.push(features[i].get('N3NM'));
			}
			// container.innerHTML = info.join(', ') || '(unknown)';
			container.innerHTML = 'It is clicked finally';
			var randomPositioning = pickRandomProperty();
			popup.setPositioning(randomPositioning);
			popup.setPosition(coordinate);
		} else {
			container.innerHTML = '&nbsp;';
		}
	};

	map.addInteraction(selectClick);
	map.addInteraction(hoverInteraction);
	map.addOverlay(popup);
});
    
    