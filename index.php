<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
	<title>Exercise for Web Cartography</title>
	<base href="http://localhost/exerciseWC/" target="_blank">	

	<link rel="stylesheet" href="https://openlayers.org/en/v4.0.1/css/ol.css" type="text/css">
	<link href="style.css" rel="stylesheet" type="text/css">	

	<meta charset="utf-8">
	<meta name="author" content="Kang, Sanghun"/>
	<meta name="description" content="Exercise for Web Cartography"/>
	<meta name="keywords" content="WEB, CARTOGRAPHY, EXERCISE">

<?php
include("template.php");

?>

</head>
<body>
<h1>ASSIGNMENT WEB CARTOGRAPHY</h1>	

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


<?php


// JS

write_tag_script($src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
write_tag_script($src="https://openlayers.org/en/v4.0.1/build/ol.js", $type="text/javascript");
write_tag_script($src="script.js", $type="text/javascript");
?>

</body>

