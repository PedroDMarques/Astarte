<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>

<html>

	<head>

		<!--
			Jquery
		-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

		<!--
			Bootstrap
		-->
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

		<!--
			Mapbox (and leaflet)
		-->
		<script src='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
		<link href='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />
		
		<!--
			Plugins
		-->
		<link href="<?php echo base_url();?>bower_components/Leaflet.contextmenu/dist/leaflet.contextmenu.css" rel='stylesheet' />
		<script src="<?php echo base_url();?>bower_components/Leaflet.contextmenu/dist/leaflet.contextmenu.js"></script>
		
		<link href="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/MarkerCluster.css" rel='stylesheet' />
		<link href="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css" rel='stylesheet' />
		<script src="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
		
		<!--
			Astarte
		-->
		
		
		<link rel="stylesheet" href="<?php echo base_url();?>css/astarte_view.css">
	
	</head>

	<body>

		<div id="wrapper">
			<div id="map"></div>
		</div>

		<script src="<?php echo base_url();?>js/astarte_view.js"></script>

	</body>

</html>
