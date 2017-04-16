// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322


var popupStr = '<div class="box_yellow" id="easierelement1"><b><a href="20170103.html">Einfacheres Element</a></b></div>';


// var map.on('click', function(evt){
// 	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
// 		popup = new ol.Overlay({});
// 		popup.set
// 	})
// })

// var createPolygonStyle = function(){
// 	return function(feature, resolution){
// 		var style = new ol.style.Style({
			
// 		})
// 	}
// }

// var classifyColors = function(feature, countIter){
// 	var valRgb;
// 	try {
// 		var val = parseInt(feature.get('valuesRel').split(',')[countIter]);
// 		if(val < 10){
// 			valRgb = '#F5F500';
// 		} else if(val < 25){
// 			valRgb = '#F5D000';
// 		} else if(val < 50){
// 			valRgb = '#F5AB00';
// 		} else if(val < 100){
// 			valRgb = '#F58B00';
// 		} else if(val < 150){
// 			valRgb = '#F56600';
// 		} else if(val < 250){
// 			valRgb = '#F54500';
// 		} else if(val < 500){
// 			valRgb = '#F52100';
// 		}
// 	} catch(TypeError) {
// 		valRgb = '#F50000';
// 	}
// 	return(valRgb);
// }

function createPolygonStyle() {
	return function(feature, resolution) {
		var style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'black',
				width: 1
			}),
			fill: new ol.style.Fill({
				// color: setInterval(classifyColors(feature), 3000)
				color: classifyColors(feature, countIter)
			})
		});
		return style;
	};
};
			


var gjOverlay = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'WorldPopulation.geojson',
		projection: 'EPSG:4326',
		format: new ol.format.GeoJSON()
	}),
	style: createPolygonStyle()
});


// feature!!
var marker = new ol.Overlay({
	element: document.getElementById('easierelement1'),
	// element: $(popupStr)[0],
	position: coordinate
});

// console.log(gjOverlay.features);

var countIter = 0;
// function showValuesOnMap(){
// 	classifyColors(feature, countIter);
	
// 	gjOverlay.changed();
// 	if(countIter == 30){
// 		clearInterval(animation);
// 	}
// 	countIter += 1;
// 	console.log(countIter);
// }


function showValuesOnMap(feature){
	classifyColors(feature, countIter);
	gjOverlay.changed();
	console.log(countIter);

	if(countIter == 29){
		// clearInterval(animation);
		countIter = 0;
	}
	countIter += 1;
}

var gjOverlay = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'http://fbinter.stadt-berlin.de/fb/wms/senstadt/lsa',
		projection: 'EPSG:4326',
		// format: new ol.format.GeoJSON()
	}),
	style: createPolygonStyle()
});

var gjOverlay = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		// url: 'http://fbinter.stadt-berlin.de/fb/wms/senstadt/lsaREQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&BBOX=389197,5819298,390997,5820998&LAYERS=1,2&STYLES=gdi_default,gdi_default&CRS=EPSG:25833&WIDTH=800&HEIGHT=600&FORMAT=image/png',
		url: 'http://fbinter.stadt-berlin.de/fb/wms/senstadt/lsa',
		projection: 'EPSG:4326',
		params: {
			LAYERS: 1
		}
		// format: new ol.format.GeoJSON()
	})
})


$(document).ready(function(){
	map.addOverlay(gjOverlay);
	map.addOverlay(marker);
	// animation = setInterval(showValuesOnMap, 500, 'feature');

});