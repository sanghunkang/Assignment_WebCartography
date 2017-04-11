<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
	<title>Exercise for Web Cartography</title>
	<base href="http://localhost/exerciseWC/" target="_blank">	
	<script src="https://openlayers.org/en/v3.20.0/build/ol.js"></script>
	<link rel="stylesheet" href="https://openlayers.org/en/v3.20.0/css/ol.css" type="text/css">
	<link href="style.css" rel="stylesheet" type="text/css">	

	<meta charset="utf-8">
	<meta name="author" content="Kang, Sanghun"/>
	<meta name="description" content="Exercise for Web Cartography"/>
	<meta name="keywords" content="WEB, CARTOGRAPHY, EXERCISE">

<?php
include("template.php");

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

$title = $min = $max = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$title = test_input($_POST["title"]);
	if(is_numeric($_POST["min"])) {
		$min = $_POST["min"];
	}
	if(is_numeric($_POST["max"])) {
		$max = $_POST["max"];
	}
}
?>

</head>
<body>
	<h1>ASSIGNMENT WEB CARTOGRAPHY</h1>	

	<div class="map" style="width:510px; height:360px" id="map">
		<div id="popup" class="ol-popup"></div>
	</div>
	
	<!-- <ul id="controlToggle">
        <li>
            <input type="radio" name="type" value="none" id="noneToggle" onclick="toggleControl(this);" checked="checked" />
            <label for="noneToggle">navigate</label>
        </li>
        <li>
            <input type="radio" name="type" value="polygon" id="polygonToggle" onclick="toggleControl(this);" />
            <label for="polygonToggle">draw polygon</label>
        </li>
        <li>
            <input type="radio" name="type" value="select" id="selectToggle" onclick="toggleControl(this);" />
            <label for="selectToggle">select polygon on click</label>
        </li>
    </ul>
 -->

<?php
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// 	echo "<h2>$title</h2>";
// 	for($i=$min; $i<=$max; $i++) {
// 		echo $i . "*" . $i . "=" . $i*$i . "<br>";
// 	}
// }

// JS
write_tag_script($src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
write_tag_script($src="script.js", $type="text/javascript");
?>

</body>

