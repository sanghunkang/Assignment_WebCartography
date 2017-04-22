<?php
$geojson = $_POST['geojson'];
$info = json_encode($geojson, JSON_NUMERIC_CHECK);
$file = fopen('data\\db.geojson','w+');

fwrite($file, $info);
fclose($file);
?>