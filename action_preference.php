<?php
/* Help from:
** http://stackoverflow.com/questions/3921520/writing-json-object-to-json-file-on-server
**
** The only thing I had to change was changing json into geojson.
*/
$geojson = $_POST['geojson'];
$info = json_encode($geojson, JSON_NUMERIC_CHECK);
$file = fopen('data\\db.geojson','w+');

fwrite($file, $info);
fclose($file);
?>