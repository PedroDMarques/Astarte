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
		<script src="<?php echo base_url();?>js/astarte/vis/selectionLayer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/markerCreator.js"></script>
		<script src="<?php echo base_url();?>js/astarte/vis/valAnalizer.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/broker.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/filter.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/source.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/section.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/route.js"></script>
		<script src="<?php echo base_url();?>js/astarte/info/webService.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/timeline.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/menuComponent.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/infoBee.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/uiFilter.js"></script>
		<script src="<?php echo base_url();?>js/astarte/ui/quickStats.js"></script>
		
		<link rel="stylesheet" href="<?php echo base_url();?>css/astarte_view.css">
	
	</head>

	<body>

		<div id="page-wrapper">
			
			<div id="side-menu">
				
				<div class="ui vertical fluid menu">
					<div class="item">
						<div class="ui icon input">
							<input type="text" placeholder="Search...">
							<i class="circular search link icon"></i>
						</div>
					</div>
				</div>
				
				<ul id="side-menu-scroll">
					
					<div id="menu-component-info-bee" class="item astarte-menu-component">
						
						<h3 class="ui top attached block header astarte-menu-component-header">
							<i class="users icon"></i>
							<div class="content">
								<div class="main-header">Contextual Information</div>
								<div class="sub header"></div>
							</div>
						</h3>
						
						<div class="ui attached segment astarte-menu-component-body">
							
							<div class="astarte-menu-component-body-specifics">
								
								
								
							</div>
							
							<div class="ui dimmer astarte-menu-component-dimmer">
								<div class="ui text loader">Loading...</div>
							</div>
							
						</div>
						
					</div>
					
					<div id="menu-component-basic-filter" class="item astarte-menu-component">
						
						<h3 class="ui top attached block header astarte-menu-component-header">
							<i class="filter icon"></i>
							<div class="content">
								<div class="main-header">Basic Filters</div>
								<div class="sub header"></div>
							</div>
						</h3>
						
						<div class="ui attached segment astarte-menu-component-body">
							
							<div class="astarte-menu-component-body-specifics">
								
								<h3 class="ui header">Heartbeat:</h3>
								
								<div id="filter-slider-heartbeat" class="filter-slider"></div>
								<div class="filter-display-container">
									<p id="filter-heartbeat-min-display">0</p>
									<p id="filter-heartbeat-max-display">240</p>
								</div>
								
								<h3 class="ui header">Battery:</h3>
								
								<div id="filter-slider-battery" class="filter-slider"></div>
								<div class="filter-display-container">
									<p id="filter-battery-min-display">0</p>
									<p id="filter-battery-max-display">100</p>
								</div>
								
								<h3 class="ui header">Movements:</h3>
								
								<div id="filter-slider-movements" class="filter-slider"></div>
								<div class="filter-display-container">
									<p id="filter-movements-min-display">0</p>
									<p id="filter-movements-max-display">100</p>
								</div>
								
								<h3 class="ui header">Screen:</h3>
								
								<div id="filter-slider-screen" class="filter-slider"></div>
								<div class="filter-display-container">
									<p id="filter-screen-min-display">0</p>
									<p id="filter-screen-max-display">100</p>
								</div>
								
							</div>
							
							<div class="ui dimmer astarte-menu-component-dimmer">
								<div class="ui text loader">Loading...</div>
							</div>
							
						</div>
						
					</div>

				</ul>
				
			</div>
			
			<div id="map-bottom-container">
				<div id="map"></div>
				
				<div id="bottom-menu">
					
					<div id="timeline-container">
						<div class="ui raised segment">
							
							<div id="timeline-top">
								<div id="timeline-input-container" class="ui labeled input">
										<div class="ui label">
											Animation Time:
										</div>
										<input id="timeline-time-input" type="text" maxlength="3">
								</div>
								<div id="timeline-control-container">
									<button id="timeline-stop-button" type="button" class="ui basic circular icon button"><i class="stop icon"></i></button>
									<button id="timeline-play-button" type="button" class="ui basic circular big icon button"><i class="play icon"></i></button>
									<button type="button" class="ui basic circular icon button"><i class="pause icon"></i></button>
								</div>
								<p id="timeline-display">2015:22:22 12-12-12</p>
							</div>
							
							<div id="timeline-slider"></div>
							<div id="timeline-range"></div>
							
							<div id="timeline-bottom">
								<p id="timeline-range-min-display"></p>
								<p id="timeline-range-max-display"></p>
							</div>
							
						</div>
					</div>
					
					<div id="basic-stats-container">
						<div class="ui raised segment">
							<div class="flex-container flex-space-between">
								<h3 class="ui header">Quick Stats:</h3>
								<div class="ui disabled checkbox">
									<label>Ignore Time</label>
									<input id="quick-stats-ignore-time" type="checkbox" checked="" class="hidden">
								</div>
							</div>
							<div class="ui celled selection list">
								<div class="item">
									<div class="header">
										Drawn Markers:
										<div id="quick-stats-drawn-markers" class="right floated content">0</div>
									</div>
								</div>
								<div class="item">
									<div class="header">
										All Markers:
										<div id="quick-stats-all-markers" class="right floated content">0</div>
									</div>
								</div>
								<div class="item">
									<div class="header">
										Unique Devices:
										<div id="quick-stats-unique-devices" class="right floated content">0</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<script>
						$(".ui.checkbox").checkbox();
					</script>
					
				</div>
				
			</div>
			
		</div>
		
		<script src="<?php echo base_url();?>js/astarte_view.js"></script>

	</body>

</html>


<!--
	
	Marker Cluster ::::
	-------------------
	
	<div id="marker-cluster-filter-dropdown" class="ui fluid selection dropdown">
		<input type="hidden">
		<i class="dropdown icon"></i>
		<div class="text">Generation Time</div>
		<div class="menu">
			<div class="divider"></div>
			<div class="item" data-value="genTime" data-text="Generation Time">Generation Time</div>
			<div class="item" data-value="heartbeat" data-text="Heartbeat">Heartbeat</div>
			<div class="item" data-value="battery" data-text="Battery">Battery</div>
			<div class="item" data-value="movements" data-text="Movements">Movements</div>
			<div class="item" data-value="screen" data-text="Screen">Screen</div>
		</div>
	</div>
	
	<div class="ui celled selection list marker-cluster-list">
		<div class="item">
			<i class="big marker icon"></i>
			<div class="content">
				<div class="header">Device Mac here</div>
				<div class="description">More information</div>
			</div>
		</div>
	</div>
	
	<button class='ui fluid button'>Close</button>
	
	Marker Information ::::
	-----------------------
	
	<h3 class="ui header">Basic Information:</h3>
								
	<div class="ui celled selection list">
		<div class="item">
			<div class="header">
				Latitude:
				<div class="right floated content">35.555</div>
			</div>
		</div>
		<div class="item">
			<div class="header">
				Longitude:
				<div class="right floated content">-9.200156</div>
			</div>
		</div>
		<div class="item">
			<div class="header">
				Generation Time:
				<div class="right floated content">2015-02-15 / 12:00:00</div>
			</div>
		</div>
	</div>
	
	<div class="four ui icon buttons">
		<button type="button" class="ui icon button"><i class="step backward icon"></i></button>
		<button type="button" class="ui icon button"><i class="left chevron icon"></i></button>
		<button type="button" class="ui icon button"><i class="right chevron icon"></i></button>
		<button type="button" class="ui icon button"><i class="step forward icon"></i></button>
	</div>
	
	<h3 class="ui header">Data Sent:</h3>
	
	<div class="ui celled selection list">
		<div class="item">
			<div class="header">
				Heartbeat:
				<div class="right floated content">214</div>
			</div>
		</div>
		<div class="item">
			<div class="header">
				Battery:
				<div class="right floated content">214</div>
			</div>
		</div>
		<div class="item">
			<div class="header">
				Movements:
				<div class="right floated content">214</div>
			</div>
		</div>
		<div class="item">
			<div class="header">
				Screen:
				<div class="right floated content">214</div>
			</div>
		</div>
	</div>
	
	<div class="three ui buttons">
		<button type="button" class="ui button">Focus</button>
		<button type="button" class="ui button">Pan</button>
		<button type="button" class="ui button">History</button>
	</div>
	
	<div class="ui divider"></div>
	
	<div class="two ui buttons">
		<button type="button" class="ui button">Back</button>
		<button type="button" class="ui button">Close</button>
	</div>

-->