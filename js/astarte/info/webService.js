/*global astarte*/
/*global L*/

astarte.WebService = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"REQUEST_URL" : "http://localhost/astarte/index.php/astarte_api/",
		"latMin" : "0",
		"latMax" : "0",
		"lngMin" : "0",
		"lngMax" : "0",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,	
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	start: function(){
		this.getAllSources();
		this.getRoutes();
		return this;
	},
	
	// -----------------------------------------------------------------
	getAllSources: function(){
		var request = new XMLHttpRequest();
		request.onreadystatechange = (function(){
			if(request.readyState === 4){
				if(request.status === 200){
					
					var sources = JSON.parse(request.responseText);
					var broker = astarte.ffon(this, ["broker"]);
					
					for(var i = 0; i < sources.length; i++){
						var deviceMac = sources[i].id;
						broker.addSource(deviceMac, "victim");
						for(var j = 0; j < sources[i].positions.length; j++){
							var lat = sources[i].positions[j].lat;
							var lng = sources[i].positions[j].lng;
							var genTime = sources[i].positions[j].gen_time;
							var recTime = sources[i].positions[j].rec_time;
		
							var data = {};
							for(var k = 0; k < sources[i].positions[j].data.length; k++){
								data[sources[i].positions[j].data[k].type] = sources[i].positions[j].data[k].value;
							}
		
							broker.addLocation(deviceMac, lat, lng, genTime, recTime, data);
		
						}
		
					}
		
				}
			}
		
		}).bind(this);
		
		request.open("GET", this.options["REQUEST_URL"] + "get_sources_in_area/" + this.options.latMin + "/" + this.options.latMax + "/" + this.options.lngMin + "/" + this.options.lngMax, true);
		request.send();
		return this;
	},
	
	// -----------------------------------------------------------------
	getRoutes: function(){
		var reply = {
		"sections": [{
			"id": 5,
			"startLat": 38.724090458957,
			"startLng": -9.238128662109,
			"endLat": 38.796343623484,
			"endLng": -9.243579206796,
			"isOpen": true,
			"timestamp": "2015-07-13 19:20:38",
			"risks": [24, 35, 89, 58]
		}, {
			"id": 4,
			"startLat": 38.724090458957,
			"startLng": -9.238128662109,
			"endLat": 38.754083275791,
			"endLng": -9.321899414063,
			"isOpen": true,
			"timestamp": "2015-07-13 19:20:03",
			"risks": [79, 0, 2, 68]
		}, {
			"id": 9,
			"startLat": 38.754083275791,
			"startLng": -9.321899414063,
			"endLat": 38.713911463041,
			"endLng": -9.293060302734,
			"isOpen": true,
			"timestamp": "2015-09-08 09:22:02",
			"risks": [67, 24, 56, 58]
		}],
		"routes": [{
			"id": 1,
			"name": "test",
			"desc": "",
			"sections": [5]
		}, {
			"id": 2,
			"name": "adf",
			"desc": "sdf",
			"sections": [4, 5]
		}, {
			"id": 3,
			"name": "umnome",
			"desc": "umadescricao",
			"sections": [4, 5, 9]
		}]
		};
		
		var broker = astarte.ffon(this, ["broker"]);
		for(var i = 0; i < reply.sections.length; i++){
			var section = reply.sections[i];
			broker.addSection(section.id, new L.LatLng(section.startLat, section.startLng), new L.LatLng(section.endLat, section.endLng), section.isOpen, section.risks);
		}
		
		for(var i = 0; i < reply.routes.length; i++){
			var route = reply.routes[i];
			broker.addRoute(route.name, route.desc, route.sections);
		}
	}
	
});