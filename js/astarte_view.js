var infoBubble = new astarte.InfoBubble({}, {
	"container" : "info-bubble-container",
	"device_mac_display" : "info-bubble-device-mac",
	"basic_info_list" : "info-bubble-basic-info-list",
	"data_gen_list" : "info-bubble-data-gen-list",
	"info_bubble_close" : "info-bubble-close",
	"info_bubble_pan" : "info-bubble-pan",
	"info_bubble_focus" : "info-bubble-focus",
});

var broker = new astarte.Broker({}, {});

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

var map = new astarte.Map('map', 'mapbox.streets-satellite', {
	"broker" : broker,
	"timeline" : timeline,
	"info_bubble" : infoBubble,
},{
	"zoomControl" : false,
	"attributionControl" : false,
	"contextmenu" : true,
}).setView([38.71297, -9.15977], 15);

broker.setObjNet({
	"map" : map,
});
timeline.setObjNet({
	"map" : map,
});
infoBubble.setObjNet({
	"map" : map,
});

var uiFilter = new astarte.UiFilter({}, {
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

var filter = new astarte.Filter({});
var markerLayer = new astarte.MarkerLayer({
	"map" : map,
	"marker_creator" : markerCreator,
	"val_analizer" : analizer,
	"filter" : filter,
}, {});

map.addDataLayer("markers", markerLayer);

var heatLayer = new astarte.HeatLayer({
	"map" : map,
	"filter" : filter,
	"val_analizer" : analizer,
}, {});

map.addDataLayer("heatmap", heatLayer);

var webService = new astarte.WebService({
	"broker" : broker,
}, {});

webService.start();