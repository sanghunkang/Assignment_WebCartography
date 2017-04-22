// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170406(yyyymmdd)
// project 		: 20170322


/* lyr-tile
** A tile layer, the map base on which all the geographical features will be 
** displayed.
*/
var lyr_tile = new ol.layer.Tile({
	source: new ol.source.OSM(),
});


/* styler_icon
** Function for styling icons depending on the specific attributes of features.
** Of most importance is the type of 
** For the determination of which icon to use, three
** If 'is_favorite' is "TRUE", then a star will be shown on its position.
** Otherwise, either an icon with culinaries - representing a restaurant, = or 
** an icon with an exclamation mark - representing a POI, will be shown 
** following the value of 'category'.
*/
function styler_icon(feature) {
	if ( feature.getProperties()['is_favorite'] == "TRUE" ){
		var style_image = new ol.style.Icon({
			scale: 0.1,
			src: 'assets/favourite.png',
		});
	} else {
		var category = feature.getProperties()['category'];
		var path_source = 'assets/' + category + '.png';
		var style_image = new ol.style.Icon({
			scale: 0.1,
			src: path_source,
		});
	}
	return style_image;
};

// LAYER VECTOR1
var source_v1 = new ol.source.Vector({
	url: 'data/db.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});

function styleFunction_lyr_v1(feature){
	var styles = new ol.style.Style({
		// text: lyr_v1_style_text(feature),
		image: styler_icon(feature),
	});
	return styles;
};

var style_lyr_v1 = function(feature) {
	var geom = feature.getGeometry().getType();
	if (geom == 'Point') {
		var styles = styleFunction_lyr_v1(feature);
	};
	return styles;
};

var lyr_v1 = new ol.layer.Vector({
	source: source_v1,
	style: style_lyr_v1,
});

// LAYER VECTOR4
var source_v4 = new ol.source.Vector({
	url: 'data/preference.geojson',
	projection: 'EPSG:4326',
	format: new ol.format.GeoJSON(),
});

function lyr_v4_style_image(feature) {
	var style_image = new ol.style.Icon({
		scale: 0.1,
		src: 'assets/favourite.png',
	});
	return style_image
};

function styleFunction_lyr_v4(feature){
	var styles = new ol.style.Style({
		// text: lyr_v4_style_text(feature),
		image: lyr_v4_style_image(feature),
	});
	return styles;
};

var style_lyr_v4 = function(feature) {
	var geom = feature.getGeometry().getType();
	if( geom == 'Point' ) {
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

// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_v1, lyr_v4],
	view: new ol.View({
		center: ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857'),
		zoom: 13,
	})
});

$(document).ready(function(){
	$.getJSON('data/res.geojson', function(response) {
		var list_types = []
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

	function switch_button(is_favorite){
		$('#box2').empty();
		if( is_favorite == "TRUE"){
			$('#box2').append('<form action="action_preference.php" method="post"><button type="button" class="btn btn-danger" id="delete_from_my_list">Delete from My List</button></form>');
		} else {
			$('#box2').append('<form action="action_preference.php" method="post"><button type="button" class="btn btn-primary" id="add_to_my_list">Add to My List</button></form>');
		}
	};

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

/* make_object_from_selected
** Function to
** Its return will be used to identify the index if its position in the geoJSON
** file, to further pop itself out of there and re-insert after updating its 
** 'is_favorite' value
*/
	function get_object_from_selected(selected){
		var coordinate = selected.getGeometry().getCoordinates();
		var properties = selected.getProperties();
		var selectedObject = {
			'geometry':{
				'coordinates': ol.proj.transform(coordinate,'EPSG:3857','EPSG:4326'),
				'type': 'Point',
			},
			'properties': {
				'address': properties['address'], 
				'id': properties['id'], 
				'name': properties['name'],
				'subCategory': properties['subCategory'],
				'category': properties['category'],
				'is_favorite': properties['is_favorite'],
			}, 
			'type': 'Feature',
	    };
		return selectedObject;
	};

/* find_index_by_id(geojson, selectedObject)
** Function to
** Its return will be used to identify the index if its position in the geoJSON
** file, to further pop itself out of there and re-insert after updating its 
** 'is_favorite' value
** Help from:
** http://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
*/
	function find_index_by_id(geojsonObject, selectedObject) {
		var id = selectedObject.properties['id'];
	    for(var i = 0; i < geojsonObject.features.length; i += 1) {
	        if(geojsonObject.features[i].properties['id'] == id) {
	            return i;
	        };
	    };
	    return -1;
	}

/* get_geojsonObject
** Make a geoJSON object from the source, to use it for updating purpose
*/
	function get_geojsonObject() {
		var request = new XMLHttpRequest();
		request.open('GET', 'data/db.geojson', false);
		request.send(null);
		geojsonObject = JSON.parse(request.responseText);
		return geojsonObject;
	}
/* update_geojson
** 
*/
	function update_geojson(geojsonObject) {
		$.ajax({
	        type : 'POST',
	        url : 'action_preference.php',
	        dataType : 'geojson',
	        data : {
	            geojson : geojsonObject,
	        },
	        success: [
	        	location.reload(true),
	        ],
	    });
	};

	function make_html_stars(num_stars){
		var html_stars = '';
		for (var i = 0; i < num_stars; i += 1){
			html_stars = html_stars + '<img src="assets/star_on.png" height="30" width="30">';
		};
		for (var j = 0; j < (5-num_stars); j += 1){
			html_stars = html_stars + '<img src="assets/star_off.png" height="30" width="30">';
		};
		return html_stars;
	};

	map.addInteraction(selectPointerMove);
	selectPointerMove.on('select', function(e) {
		var coordinate = e.selected[0].getGeometry().getCoordinates();
		var properties = e.selected[0].getProperties();
		selectedObject = get_object_from_selected(e.selected[0]);

		$('#popup-content').empty();
		$('#popup-content').append('<h3="name_res">' + properties['name'] + '</h3>');
		$('#popup-content').append('<p id="address_res">' + properties['address'] + '</p>');
		$('#popup-content').append('<p id="subCategory_res">' + properties['subCategory'] + '</p>');
		$('#popup-content').append('<div id="stars_popup"></div>');
		
		var html_stars = make_html_stars(properties['num_stars']);
		$('#stars_popup').append(html_stars);

		lyr_o1.setPosition(coordinate);
	});

	map.addInteraction(selectClick);
	selectClick.on('select', function(e) {
		var coordinate = e.selected[0].getGeometry().getCoordinates();
		var properties = e.selected[0].getProperties();
		selectedObject = get_object_from_selected(e.selected[0]);

		$('#box1').empty();
		$('#box1').append('<h3="name_res">' + properties['name'] + '</h3>');
		$('#box1').append('<p id="address_res">' + properties['address'] + '</p>');
		$('#box1').append('<p id="subCategory_res">' + properties['subCategory'] + '</p>');
		$('#box1').append('<div><button type="button" class="btn btn-default btn-sm" id="star_plus"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><div id="stars_box1"></div><button type="button" class="btn btn-default btn-sm" id="star_minus"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><div id="stars_box1"></div>');

		lyr_o1.setPosition(coordinate);
		switch_button(properties['is_favorite']);

		var html_stars = make_html_stars(properties['num_stars']);
		$('#stars_box1').append(html_stars);

		$('#star_plus').click(function () {
			var num_stars = properties['num_stars'];
			if (num_stars <= 5) {
				num_stars += 1;
			};
			$('#stars').empty();
			$('#stars').append(make_html_stars(num_stars));

			geojsonObject = get_geojsonObject();
			
			// Delete the object correspoding to the selected object
		 	var index_pop = find_index_by_id(geojsonObject, selectedObject);
	    	geojsonObject.features.splice(index_pop, 1);

	    	// Insert the selected object
	    	selectedObject.properties['num_stars'] = num_stars;
	    	geojsonObject.features.push( selectedObject );

			update_geojson(geojsonObject);
		});

		$('#star_minus').click(function () {
			var num_stars = properties['num_stars'];
			if (num_stars >= 0){
				num_stars -= 1;
			};
			$('#stars').empty();
			$('#stars').append(make_html_stars(num_stars));

			geojsonObject = get_geojsonObject();
			
			// Delete the object correspoding to the selected object
		 	var index_pop = find_index_by_id(geojsonObject, selectedObject);
	    	geojsonObject.features.splice(index_pop, 1);

	    	// Insert the selected object
	    	selectedObject.properties['num_stars'] = num_stars;
	    	geojsonObject.features.push( selectedObject );

			update_geojson(geojsonObject);
		});

		// Update action upon click on '#add_to_my_list'
		$('#add_to_my_list').click(function (e) {
			geojsonObject = get_geojsonObject();
			
			// Delete the object correspoding to the selected object
		 	var index_pop = find_index_by_id(geojsonObject, selectedObject);
	    	geojsonObject.features.splice(index_pop, 1);

	    	// Insert the selected object
	    	selectedObject.properties['is_favorite'] = "TRUE";
	    	geojsonObject.features.push( selectedObject );

			update_geojson(geojsonObject);
		});

		// Update action upon click on '#delete_from_my_list'
		$('#delete_from_my_list').click(function () {
			geojsonObject = get_geojsonObject();

			// Delete the object correspoding to the selected object
		    var index_pop = find_index_by_id(geojsonObject, selectedObject);
	    	geojsonObject.features.splice(index_pop, 1);

			// Insert the selected object
	    	selectedObject.properties['is_favorite'] = "FALSE";
	    	geojsonObject.features.push( selectedObject );

	    	update_geojson(geojsonObject);
		});
	});

	$('#go').click(function () {
		$('#popup-content').empty();
		var value_target = $('#select1').val();
		var features = lyr_v1.getSource().getFeatures();

		for(var i = 0; i < features.length; i++) {
			if(features[i].getProperties()['name'] == value_target) {
				var coord = features[i].getGeometry().getCoordinates();
				var view = new ol.View({
					center: coord,
					zoom: 13,
				});
				map.setView(view);
				/*
				view.animate({
					center: coord,
					duration: 3000,
				});
				*/
			};
		};
	});
});
