var map = new astarte.Map('map', 'mapbox.streets-satellite', {
	"zoomControl" : false,
	"attributionControl" : false,
	"contextmenu" : true,
}).setView([38.71297, -9.15977], 15);

var broker = new astarte.Broker({});
var filter = new astarte.Filter({});
var markerLayer = new astarte.MarkerLayer(map, broker, filter, {});

map.addDataLayer("markers", markerLayer);

var request = new XMLHttpRequest();

request.onreadystatechange = function(){

    if(request.readyState === 4){
        if(request.status === 200){

            var sources = JSON.parse(request.responseText);

            for(var i = 0; i < sources.length; i++){

                var deviceMac = sources[i].id;

				broker.addSource(deviceMac, "victim");

                for(var j = 0; j < sources[i].positions.length; j++){

                    var lat = sources[i].positions[j].lat;
                    var lng = sources[i].positions[j].lng;
                    var genTime = sources[i].positions[j].gen_time;

                    var data = {};
                    for(var k = 0; k < sources[i].positions[j].data.length; k++){
                        data[sources[i].positions[j].data[k].type] = sources[i].positions[j].data[k].value;
                    }

                    broker.addLocation(deviceMac, lat, lng, genTime, data);

                }

            }

        }
    }

}

request.open("GET", "http://localhost/astarte/index.php/astarte_api/get_all_sources", true);
request.send();