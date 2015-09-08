var broker = new astarte.Broker({}, {});

var infoBSegment = new astarte.InfoB({}, {
	"segment_id" : "info-b-segment",
});
var filtersSegment = new astarte.MenuSegment({}, {
	"segment_id" : "filters-segment",
});
var optionsSegment = new astarte.MenuSegment({}, {
	"segment_id" : "options-segment",
});
var generatorSegment = new astarte.MenuSegment({}, {
	"segment_id" : "generator-segment",
});

var markerCreator = new astarte.MarkerCreator({});

var timeline = new astarte.Timeline({}, {
	"timeline" : "timeline",
	"timeline_display" : "timeline-time",
	"range" : "timeline-range",
	"range_display_min" : "timeline-range-min",
	"range_display_max" : "timeline-range-max",
	"time_input" : "timeline-input",
	"stop_btn" : "timeline-stop",
	"play_btn" : "timeline-play",
});

var analizer = new astarte.ValAnalizer({}, {});

var filter = new astarte.Filter({}, {});

var map = new astarte.Map('map', 'mapbox.streets-satellite', {
	"broker" : broker,
	"timeline" : timeline,
	"filter" : filter,
	"infoB" : infoBSegment,
},{
	"zoomControl" : true,
	"attributionControl" : false,
	"contextmenu" : true,
}).setView([38.71297, -9.15977], 15);

filter.setObjNet({
	"map" : map,
});
broker.setObjNet({
	"map" : map,
});
timeline.setObjNet({
	"map" : map,
});
infoBSegment.setObjNet({
	"map" : map,
});

var uiFilter = new astarte.UiFilter({
	"map" : map,
}, {
	"heartbeat_slider" : "filter-slider-heartbeat",
	"heartbeat_display_min" : "filter-heartbeat-min",
	"heartbeat_display_max" : "filter-heartbeat-max",
	"battery_slider" : "filter-slider-battery",
	"battery_display_min" : "filter-battery-min",
	"battery_display_max" : "filter-battery-max",
	"movements_slider" : "filter-slider-movements",
	"movements_display_min" : "filter-movements-min",
	"movements_display_max" : "filter-movements-max",
	"screen_slider" : "filter-slider-screen",
	"screen_display_min" : "filter-screen-min",
	"screen_display_max" : "filter-screen-max",
});

var markerLayer = new astarte.MarkerLayer({
	"map" : map,
	"marker_creator" : markerCreator,
	"val_analizer" : analizer,
}, {});

map.addDataLayer("markers", markerLayer);

var heatLayer = new astarte.HeatLayer({
	"map" : map,
	"val_analizer" : analizer,
}, {});

map.addDataLayer("heatmap", heatLayer);

var routeLayer = new astarte.RouteLayer({
	"map" : map
}, {});

map.addDataLayer("routes", routeLayer);

var webService = new astarte.WebService({
	"broker" : broker,
}, {});

webService.start();