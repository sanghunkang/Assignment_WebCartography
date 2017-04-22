<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
<title>Exercise for Web Cartography</title>
<base href="http://localhost/exerciseWC/" target="_blank">	
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">
<link href="dashboard.css" rel="stylesheet">
<link href="style_main.css" rel="stylesheet" type="text/css">

<meta charset="utf-8">
<meta name="author" content="Kang, Sanghun"/>
<meta name="description" content="Exercise for Web Cartography"/>
<meta name="keywords" content="WEB, CARTOGRAPHY, EXERCISE">
</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">ASSIGNMENT WEB CARTOGRAPHY</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a target="_self" href="#">My Favourites</a></li>
				<li><a target="_self" href="#">Settings</a></li>
				<li><a target="_self" href="#">Profile</a></li>
				<li><a target="_self" href="#">Help</a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<input type="text" class="form-control" placeholder="Search...">
			</form>
		</div>
	</div>
</nav>

<div class="container-fluid">
<div class="row">
	<div class="col-sm-3 col-md-4 sidebar">
		<form class="form-inline" autocomplete="on">
			<label>Filter by...</label><br>
	    <label>Restaurant Type </label><br>
	    <select class="selectpicker" id="select_subCategory">
	    	<option>All Types</option>
	    </select><br>	    
	    <label>Ratings </label><br>
			<select class="selectpicker" id="select_num_stars">
				<option>All Ratings</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select><br>
			<button type="button" class="btn btn-primary" id="filter">Filter!</button><br><br>
<!-- https://silviomoreto.github.io/bootstrap-select/ -->
		  <label>Select from My Favourites </label><br>
		  <select class="selectpicker" id="select_favourites">
			</select><br>
			<button type="button" class="btn btn-primary" id="go_favourites">GO!</button><br>
			<label>Bring me Somewhere around...</label><br>
		  <select class="selectpicker" id="select_pois">
			</select><br>
			<button type="button" class="btn btn-primary" id="go_pois">GO!</button><br>
	  </form>
		<div id="box1">
			<h3>POTENTIAL SLOT FOR ADS</h3>
		</div>
		<div id="box2">
		</div>
	</div>


<div class="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-4 main" id="map">
	<div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
</div>

<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
<script src=https://openlayers.org/en/v4.0.1/build/ol.js type=text/javascript></script>
<script src=script.js type=text/javascript></script>

</body>


