<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<head>
	<title>Exercise for Web Cartography</title>
	<base href="http://localhost/exerciseWC/" target="_blank">	
	<script src="https://openlayers.org/en/v3.20.0/build/ol.js"></script>
	<link rel="stylesheet" href="https://openlayers.org/en/v3.20.0/css/ol.css" type="text/css">
	<link href="style.css" rel="stylesheet" type="text/css">	

	<meta charset="utf-8">
	<meta name="author" content="allqoow"/>
	<meta name="description" content="Exercise for Web Cartography"/>
	<meta name="keywords" content="WEB, CARTOGRAPHY, EXERCISE">

<?php
include("template.php");

// write_header();
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

	<!-- Sometimes percentage doesn't work for height. Don't forget to write in pixels -->
	<div class="map" style="width:510px; height:360px" id="map">
	</div>


<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		echo "<h2>$title</h2>";
		for($i=$min; $i<=$max; $i++) {
			echo $i . "*" . $i . "=" . $i*$i . "<br>";
		}
	}
?>

	<!-- JS -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="script.js" type="text/javascript"></script>

</body>

