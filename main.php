<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
<title>Exercise for Web Cartography</title>
<base href="http://localhost/exerciseWC/" target="_blank">	

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">
<link href="dashboard.css" rel="stylesheet">
<link href="style.css" rel="stylesheet" type="text/css">

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
				<li><a href="#">Dashboard</a></li>
				<li><a href="#">Settings</a></li>
				<li><a href="#">Profile</a></li>
				<li><a href="#">Help</a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<input type="text" class="form-control" placeholder="Search...">
			</form>
		</div>
	</div>
</nav>

<div class="container-fluid">
<div class="row">
	<div class="col-sm-3 col-md-2 sidebar">
		<ul class="nav nav-sidebar">
			<li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
			<li><a href="#">Reports</a></li>
			<li><a href="#">Analytics</a></li>
			<li><a href="#">Export</a></li>
		</ul>
		<ul class="nav nav-sidebar">
			<li><a href="">Nav item</a></li>
			<li><a href="">Nav item again</a></li>
			<li><a href="">One more nav</a></li>
			<li><a href="">Another nav item</a></li>
			<li><a href="">More navigation</a></li>
		</ul>
		<ul class="nav nav-sidebar">
			<li><a href="">Nav item again</a></li>
			<li><a href="">One more nav</a></li>
			<li><a href="">Another nav item</a></li>
		</ul>
	</div>
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	<h1 class="page-header">Today's Recommendations</h1>
	<div class="row placeholders">
		<div class="col-xs-6 col-sm-3 placeholder">
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
			<h4>Label</h4>
			<span class="text-muted">Something else</span>
		</div>
		<div class="col-xs-6 col-sm-3 placeholder">
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
			<h4>Label</h4>
			<span class="text-muted">Something else</span>
		</div>
		<div class="col-xs-6 col-sm-3 placeholder">
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
			<h4>Label</h4>
			<span class="text-muted">Something else</span>
		</div>
		<div class="col-xs-6 col-sm-3 placeholder">
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
			<h4>Label</h4>
			<span class="text-muted">Something else</span>
		</div>
	</div>

	<div class="map" style="width:510px; height:360px" id="map">
		<div id="popup" class="ol-popup"></div>
	</div>
	<form class="form-inline">
		<label>Geometry type &nbsp;</label>
		<select id="type">
			<option value="Point">Point</option>
			<option value="LineString">LineString</option>
			<option value="Polygon">Polygon</option>
			<option value="Circle">Circle</option>
			<option value="None">None</option>
		</select>
	</form>
</div>

<script src=https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src=https://openlayers.org/en/v4.0.1/build/ol.js type=text/javascript></script>
<script src=script.js type=text/javascript></script>


</body>


