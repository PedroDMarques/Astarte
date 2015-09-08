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
			Jquery UI
		-->
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>

		<!--
			Bootstrap
		-->
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

		<!--
			Semantic
		-->
		<link rel="stylesheet" href="<?php echo base_url();?>semantic/semantic.min.css">
		<script src="<?php echo base_url();?>semantic/semantic.min.js"></script>

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
		
		<script src="<?php echo base_url();?>plugins/jQuery-xcolor-master/jquery.xcolor.min.js"></script>
		
		<link href="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/MarkerCluster.css" rel='stylesheet' />
		<link href="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css" rel='stylesheet' />
		<script src="<?php echo base_url();?>bower_components/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
		
		<link href="<?php echo base_url();?>plugins/webgl-heatmap-leaflet-master/css/shCoreEclipse.css" rel='stylesheet' />
		<script src="<?php echo base_url();?>plugins/webgl-heatmap-leaflet-master/js/webgl-heatmap.js"></script>
		<script src="<?php echo base_url();?>plugins/webgl-heatmap-leaflet-master/js/webgl-heatmap-leaflet.js"></script>
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		
		<!--
			Astarte
		-->
		<script src="<?php echo base_url();?>js/astarte/main.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/map.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/dataLayer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/markerLayer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/heatLayer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/routeLayer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/markerCreator.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/valAnalizer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/broker.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/filter.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/source.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/section.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/route.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/webService.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/timeline.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/uiFilter.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/menuSegment.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/infoB.js"></script>
		
		<link rel="stylesheet" href="<?php echo base_url();?>css/astarte_view.css">
		<link rel="stylesheet" href="<?php echo base_url();?>css/timeline.css">
	
	</head>

	<body>

		<div id="wrapper">

			<div id="map"></div>
			
			<div id="side-menu">
				
				<!-- Info Bee -->
				
				<div id="info-b-segment" class="segment-container">
					<div class="ui segments">
						<div class="ui raised segment">
							<h2 class="ui header segment-header">
								<i class="info icon"></i>
								<div class="content">
									Context Info
								</div>
							</h2>
							<div class="segment-body">
								<div class="ui segments">
									
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Filters -->
				
				<div id="filters-segment" class="segment-container">
					<div class="ui segments">
						<div class="ui raised segment">
							<h2 class="ui header segment-header">
								<i class="filter icon"></i>
								<div class="content">
									Filters
								</div>
							</h2>
							<div class="segment-body">
								
								<div id="filter-slider-heartbeat"></div>
								<div class="filter-value-container">
									<span id="filter-heartbeat-min">13</span>
									<span id="filter-heartbeat-max">13</span>
								</div>
								
								<div id="filter-slider-battery"></div>
								<div class="filter-value-container">
									<span id="filter-battery-min">13</span>
									<span id="filter-battery-max">13</span>
								</div>
								
								<div id="filter-slider-movements"></div>
								<div class="filter-value-container">
									<span id="filter-movements-min">13</span>
									<span id="filter-movements-max">13</span>
								</div>
								
								<div id="filter-slider-screen"></div>
								<div class="filter-value-container">
									<span id="filter-screen-min">13</span>
									<span id="filter-screen-max">13</span>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				
				<!-- Options -->
				
				<div id="options-segment" class="segment-container">
					<div class="ui segments">
						<div class="ui raised segment">
							<h2 class="ui header segment-header">
								<i class="settings icon"></i>
								<div class="content">
									Options
								</div>
							</h2>
							<div class="segment-body">
								<div class="ui segments">
									<div class="ui segment">1</div>
									<div class="ui segment">2</div>
									<div class="ui segment">3</div>
									<div class="ui segment">4</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Point Generation -->
				
				<div id="generator-segment" class="segment-container">
					<div class="ui segments">
						<div class="ui raised segment">
							<h2 class="ui header segment-header">
								<i class="wizard icon"></i>
								<div class="content">
									Point Generation
								</div>
							</h2>
							<div class="segment-body">
								<div class="ui segments">
								</div>
							</div>
						</div>
					</div>
				</div>	
				
			</div>
		
			<div id="timeline-container" class="panel panel-default">
				<div id="timeline-container-body" class="panel-body">
					
					<div id="timeline-top">
						<span id="timeline-control" class="input-group input-group-sm">
							<span class="input-group-btn">
								<button id="timeline-stop" type="button" class="btn btn-default"><i class="fa fa-stop"></i></button>
							</span>
							<input id="timeline-input" type="text" class="form-control" maxlength="3"></input>
							<span class="input-group-btn">
								<button id="timeline-play" type="button" class="btn btn-default"><i class="fa fa-play"></i></button>
							</span>
						</span>
						
						<p id="timeline-time"></p>
					</div>
					
					<div id="timeline"></div>
					<div id="timeline-range"></div>
					
					<div id="timeline-bottom">
						<p id="timeline-range-min"></p>
						<p id="timeline-range-max"></p>
					</div>
				</div>
			</div>
			
		</div>
		
		<script src="<?php echo base_url();?>js/astarte_view.js"></script>

	</body>

</html>
