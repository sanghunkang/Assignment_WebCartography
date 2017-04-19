<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
<title>Exercise for Web Cartography</title>
<base href="http://localhost/exerciseWC/" target="_blank">	

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css">
<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">
<link href="dashboard.css" rel="stylesheet">
<link href="style.css" rel="stylesheet" type="text/css">

<style>
      .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 280px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
    </style>

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
		<form class="form-inline">
	    <label>Action type &nbsp;</label>
	      <select id="type" class="form-control">
	        <option value="click" selected>Click</option>
	        <option value="singleclick">Single-click</option>
	        <option value="pointermove">Hover</option>
	        <option value="altclick">Alt+Click</option>
	        <option value="none">None</option>
	      </select>
	    <span id="status">&nbsp;0 selected features</span>
	    <br>
	    <label>Style &nbsp;</label>
	    <select class="form-control selectpicker" data-live-search="true" id="select1">
			  <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
			</select>
	    <label>Price &nbsp;</label>
			<select class="form-control selectpicker" data-live-search="true" id="select2">
			  <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
			</select>

			<label>Point of Interest &nbsp;</label>
			<select class="form-control selectpicker" data-live-search="true" id="select3">
			  <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
			</select>
	  </form>
		
		<ul class="nav nav-sidebar">
			<li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
			<li><a target="_self" href="#">Reports</a></li>
			<li><a target="_self" href="#">Analytics</a></li>
			<li><a target="_self" href="#">Export</a></li>
		</ul>
		<div id="some-box">
			<h3>Some Box</h3>
			<form action="save_preference.php" method="post">
				<button type="button" class="btn btn-danger" id="add">Add to My List</button>
			</form>
		</div>
	</div>
<div class="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-4 main" id="map">
	<h1 class="page-header">Today's Recommendations Bring me... &nbsp;</h1>
	<div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
</div>

<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
<script src=https://openlayers.org/en/v4.0.1/build/ol.js type=text/javascript></script>
<script src=script.js type=text/javascript></script>


</body>


