var infoBubble = new astarte.InfoBubble("info-bubble", {});

var broker = new astarte.Broker({}, {});

var markerCreator = new astarte.MarkerCreator({});

var timeline = new astarte.Timeline("timeline-container", {});

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