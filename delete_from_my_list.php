<?php
$geojson = $_POST['geojson'];
$info = json_encode($geojson, JSON_NUMERIC_CHECK);
$file = fopen('data\\preference.geojson','w+');

fwrite($file, $info);
fclose($file);
?>