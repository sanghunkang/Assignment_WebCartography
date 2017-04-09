<?php

function write_tag_script($src, $type=NULL){	
	if($type == NULL) {
		echo '<script src='.$src.'></script>';
	} else if ($type != NULL) {
		echo '<script src='.$src.' type='.$type.'></script>';
	}
}

?>