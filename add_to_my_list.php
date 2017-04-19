<?php
$geojson = $_POST['geojson'];
$info = json_encode($geojson);
$file = fopen('data\\preference.geojson','a+');
fwrite($file, $info);
fclose($file);
?>