<?php

function write_tag_script($src, $type=NULL){	
	if($type == NULL) {
		echo '<script src='.$src.'></script>';
	} else if ($type != NULL) {
		echo '<script src='.$src.' type='.$type.'></script>';
	}
}

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// 	echo "<h2>$title</h2>";
// 	for($i=$min; $i<=$max; $i++) {
// 		echo $i . "*" . $i . "=" . $i*$i . "<br>";
// 	}
// }


// function test_input($data) {
// 	$data = trim($data);
// 	$data = stripslashes($data);
// 	$data = htmlspecialchars($data);
// 	return $data;
// }

// $title = $min = $max = "";

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// 	$title = test_input($_POST["title"]);
// 	if(is_numeric($_POST["min"])) {
// 		$min = $_POST["min"];
// 	}
// 	if(is_numeric($_POST["max"])) {
// 		$max = $_POST["max"];
// 	}
// }

?>
