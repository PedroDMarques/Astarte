/*global astarte*/
/*global L*/

astarte.Broker = L.Class.extend({
	
	// -----------------------------------------------------------------
	includes: L.Mixin.Events,
	
	// -----------------------------------------------------------------
	options: {
		
		"info-bubble" : null,
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
		"web_service" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		
		this.setOptions(options);
		this.setObjNet(objNet);
		// Holds all the sources available
		this._sources = {}
		
		this._minFound = "9999";
		this._maxFound = "0";
		
		this._sections = {};
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	addSource: function(deviceMac, userType){
		
		// Don't overwrite any existing source with the same deviceMac
		if(this._sources[deviceMac]){
			return;
		}
		
		this._sources[deviceMac] = new astarte.Source(deviceMac, userType, {
			"broker" : this,
		}, {});
		
		this.fireEvent("source_added", {
			"deviceMac" : deviceMac,
			"userType" : userType,
		});
		
		return this._sources[deviceMac];
	},
	
	// -----------------------------------------------------------------
	addLocation: function(deviceMac, lat, lng, genTime, data){
		
		// Verifying variables
		if(!this._sources[deviceMac] || !lat || !lng || !genTime){
			return;
		}
		
		this._sources[deviceMac].addLocation(lat, lng, genTime, data);
		
		var objToFire = {
			"deviceMac" : deviceMac,
			"lat" : lat,
			"lng" : lng,
			"genTime" : genTime,
			"data" : data,
		}
		
		this.fireEvent("location_added", objToFire);
		
		var timeline = astarte.ffon(this, ["map", "timeline"]);
		
		if(genTime < this._minFound){
			this._minFound = genTime;
			timeline.setMin(genTime);
		}
		
		if(genTime > this._maxFound){
			this._maxFound = genTime;
			timeline.setMax(genTime);
		}
		
		return this;
	},
	
	addSection: function(id, start, end, isOpen, risks){
		var section = new astarte.Section(id, start, end, isOpen, risks);
		section.setObjNet({"routeLayer" : astarte.ffon(this, ["map"]).getDataLayer("routes")});
		this._sections[id] = section;
	},
	
	addRoute: function(name, desc, sections){
		console.log("broker: addRoute");
		var sectionsToSend = [];
		
		for(var i = 0; i < sections.length; i++){
			sectionsToSend.push(this._sections[sections[i]]);
		}
		this.fireEvent("route_added", {
			"name" : name,
			"desc" : desc,
			"sections" : sectionsToSend});
	},
	
	// -----------------------------------------------------------------
	getSources: function(){
		return this._sources;
	},
	
	// -----------------------------------------------------------------
	getSource: function(deviceMac){
		return this._sources[deviceMac];
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
	}
	
})