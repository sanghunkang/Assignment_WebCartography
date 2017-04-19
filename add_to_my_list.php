<?php
$geojson = $_POST['geojson'];
$info = json_encode($geojson);
$file = fopen('new_map_data.geojson','a+');
fwrite($file, $info);
fclose($file);
?>