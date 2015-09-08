/*global astarte*/
/*global L*/

astarte.WebService = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"REQUEST_URL" : "http://localhost/astarte/index.php/astarte_api/",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,	
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		return this;
	},
	
	// -----------------------------------------------------------------
	start: function(){
		this.getAllSources();
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
		
							var data = {};
							for(var k = 0; k < sources[i].positions[j].data.length; k++){
								data[sources[i].positions[j].data[k].type] = sources[i].positions[j].data[k].value;
							}
		
							broker.addLocation(deviceMac, lat, lng, genTime, data);
		
						}
		
					}
		
				}
			}
		
		}).bind(this);
		
		request.open("GET", this.options["REQUEST_URL"] + "get_all_sources", true);
		request.send();
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
	},
	
});