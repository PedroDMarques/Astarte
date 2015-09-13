var broker = new astarte.Broker({}, {});

var markerCreator = new astarte.MarkerCreator({});

var timeline = new astarte.Timeline({}, {
	"timeline" : "timeline-slider",
	"timeline_display" : "timeline-display",
	"range" : "timeline-range",
	"range_display_min" : "timeline-range-min-display",
	"range_display_max" : "timeline-range-max-display",
	"time_input" : "timeline-time-input",
	"stop_btn" : "timeline-stop-button",
	"play_btn" : "timeline-play-button",
});

var infoBee = new astarte.InfoBee($("#menu-component-info-bee"), {
	"broker" : broker,
}, {
	"start_open" : false,
});

var analizer = new astarte.ValAnalizer({}, {});

var filter = new astarte.Filter({}, {});

var uiFilter = new astarte.UiFilter($("#menu-component-basic-filter"), {
	
}, {
	"heartbeat_slider" : "filter-slider-heartbeat",
	"heartbeat_min_display" : "filter-heartbeat-min-display",
	"heartbeat_max_display": "filter-heartbeat-max-display",
	"battery_slider" : "filter-slider-battery",
	"battery_min_display" : "filter-battery-min-display",
	"battery_max_display": "filter-battery-max-display",
	"movements_slider" : "filter-slider-movements",
	"movements_min_display" : "filter-movements-min-display",
	"movements_max_display": "filter-movements-max-display",
	"screen_slider" : "filter-slider-screen",
	"screen_min_display" : "filter-screen-min-display",
	"screen_max_display": "filter-screen-max-display",
});

var map = new astarte.Map('map', 'mapbox.streets-satellite', {
	"broker" : broker,
	"timeline" : timeline,
	"filter" : filter,
	"infoBee" : infoBee,
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
infoBee.setObjNet({
	"map" : map,
});
uiFilter.setObjNet({
	"map" : map,
})

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

var webService = new astarte.WebService({
	"broker" : broker,
}, {});

$("#side-menu-scroll").sortable({
	"items" : "> .astarte-menu-component",
	"handle" : ".astarte-menu-component-header",
	"containment" : "parent",
});

webService.start();