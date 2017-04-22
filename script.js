// Author		: Kang, Sanghun
// Contact		: sanghunkang.dev@gmail.com
// Started on 	: 20170322(yyyymmdd)
// Last modified: 20170423yyyymmdd)


/* lyr-tile
** A tile layer, the map base on which all the geographical features will be 
** displayed.
*/
var lyr_tile = new ol.layer.Tile({
	source: new ol.source.OSM(),
});


/* styler_icon
** Function for styling icons depending on the specific attributes of features.
** If 'is_favorite' is "TRUE", then a star will be shown on its position.
** Otherwise, either an icon with culinaries, - representing a restaurant - or 
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


var selectClick = new ol.interaction.Select({
	condition: ol.events.condition.click
});

var selectPointerMove = new ol.interaction.Select({
	condition: ol.events.condition.pointerMove
});

// MAP
var map = new ol.Map({
	target: 'map',
	layers: [lyr_tile, lyr_v1],
	view: new ol.View({
		center: ol.proj.transform([13.327091, 52.512181],'EPSG:4326','EPSG:3857'),
		zoom: 13,
	})
});

$(document).ready(function(){
	function switch_button(is_favorite){
		$('#box2').empty();
		if( is_favorite == "TRUE"){
			$('#box2').append('<form action="action_preference.php" method="post"><button type="button" class="btn btn-danger" id="delete_from_my_list">Delete from My List</button></form>');
		} else {
			$('#box2').append('<form action="action_preference.php" method="post"><button type="button" class="btn btn-primary" id="add_to_my_list">Add to My List</button></form>');
		}
	};

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
				'num_stars': properties['num_stars'],
				'price': properties['price'],
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
**
** Help from:
** http://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
**
** The idea came from there, and modified to fit here.
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
	};

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

/* Help from:
** http://openlayers.org/en/latest/examples/popup.html?q=popup
**
** The way a popup is realised was quite fundamental in implementing this
** functionality, although I had to go quite further from there.
*/
	function make_popup(properties, coordinate){
		$('#popup-content').empty();
		$('#popup-content').append('<h3="name_res">' + properties['name'] + '</h3>');
		$('#popup-content').append('<p id="address_res">' + properties['address'] + '</p>');
		$('#popup-content').append('<p id="subCategory_res">' + properties['subCategory'] + '</p>');
		$('#popup-content').append('<div id="stars_popup"></div>');
		lyr_o1.setPosition(coordinate);
	};

	// Make containers for the popup
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

	var geojsonObject = get_geojsonObject();
	var list_types = [];
	for(var i =0; i < geojsonObject.features.length; i ++) {
		var name = geojsonObject.features[i].properties['name'];
		
		// Make restaurant type dropdown
		if (geojsonObject.features[i].properties['category'] == "res") {
			var type = geojsonObject.features[i].properties['subCategory'];
			if (list_types.indexOf(type) == -1){
				var html = '<option>' + geojsonObject.features[i].properties['subCategory'] + '</option>';
				$('#select_subCategory').append(html);
				list_types.push(type);
			}
		};

		// Make my favourites dropdown
		if (geojsonObject.features[i].properties['is_favorite'] == "TRUE"){
			var html = '<option>' + name + '</option>';
			$('#select_favourites').append(html);
		};

		// Make POIs dropdown
		if (geojsonObject.features[i].properties['category'] == "poi"){
			var html = '<option>' + name + '</option>';
			$('#select_pois').append(html);
		};
	};


	/* Too many erros are invoked by this funcionality.
	**
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
	*/

	map.addInteraction(selectClick);
	selectClick.on('select', function(e) {
		var coordinate = e.selected[0].getGeometry().getCoordinates();
		var properties = e.selected[0].getProperties();
		selectedObject = get_object_from_selected(e.selected[0]);
		make_popup(properties, coordinate);

		// Add some contents to the box1
		$('#box1').empty();
		$('#box1').append('<h3="name_res">' + properties['name'] + '</h3>');
		$('#box1').append('<p id="address_res">' + properties['address'] + '</p>');
		$('#box1').append('<p id="subCategory_res">' + properties['subCategory'] + '</p>');
		$('#box1').append('<div style="display: inline-block;"><button type="button" class="btn btn-default btn-sm" id="star_minus"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><div id="stars_box1"></div><button type="button" class="btn btn-default btn-sm" id="star_plus"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><div id="stars_box1"></div>');

		switch_button(properties['is_favorite']);

		var html_stars = make_html_stars(properties['num_stars']);
		$('#stars_box1').append(html_stars);

		// Action to add a star
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

		// Action to remove a star
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

	$('#filter').click(function () {		
		var subCategory = $('#select_subCategory').val();		
		var num_stars = $('#select_num_stars').val();

		// Categorised into 4 cases
		if (subCategory == 'All Types' && num_stars == 'All Ratings') {
			var style_lyr_v1_filter = function(feature) {
				var styles = styleFunction_lyr_v1(feature);
				return styles;
			};
		} else if (subCategory == 'All Types'){
			var style_lyr_v1_filter = function(feature) {
				if (feature.getProperties()['num_stars'].toString() == num_stars) {
					var styles = styleFunction_lyr_v1(feature);
				};
				return styles;
			};
		} else if (num_stars == 'All Ratings'){
			var style_lyr_v1_filter = function(feature) {
				if (feature.getProperties()['subCategory'] == subCategory) {
					var styles = styleFunction_lyr_v1(feature);
				};
				return styles;
			};
		} else {
			var style_lyr_v1_filter = function(feature) {
				if (feature.getProperties()['subCategory'] == subCategory && feature.getProperties()['num_stars'].toString() == num_stars) {
					var styles = styleFunction_lyr_v1(feature);
				};
				return styles;
			};
		};

		// Reset the style
		lyr_v1.setStyle(style_lyr_v1_filter);
	});
	
	// On click '#go_favourites'
	$('#go_favourites').click(function () {
		$('#popup-content').empty();
		var value_target = $('#select_favourites').val();
		var features = lyr_v1.getSource().getFeatures();

		for(var i = 0; i < features.length; i++) {
			if(features[i].getProperties()['name'] == value_target) {
				var coordinate = features[i].getGeometry().getCoordinates();
				var view = new ol.View({
					center: coordinate,
					zoom: 13,
				});
				map.setView(view);
				/*
				view.animate({
					center: coordinate,
					duration: 3000,
				});
				*/
				var properties = features[i].getProperties()
			};
		};
		make_popup(properties, coordinate);
	});

	// On click '#go_pois'
	$('#go_pois').click(function () {
		$('#popup-content').empty();
		var value_target = $('#select_pois').val();
		var features = lyr_v1.getSource().getFeatures();

		for(var i = 0; i < features.length; i++) {
			if(features[i].getProperties()['name'] == value_target) {
				var coordinate = features[i].getGeometry().getCoordinates();
				var view = new ol.View({
					center: coordinate,
					zoom: 13,
				});
				map.setView(view);
				/*
				view.animate({
					center: coordinate,
					duration: 3000,
				});
				*/
				var properties = features[i].getProperties()
			};
		};
	});
});
