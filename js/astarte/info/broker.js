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
	objNetwork: {
		
		"map" : null,
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(options){
		
		this.setOptions(options);
		
		// Holds all the sources available
		this._sources = {}
		
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
		
		this.fireEvent("location_added", {
			"deviceMac" : deviceMac,
			"lat" : lat,
			"lng" : lng,
			"genTime" : genTime,
			"data" : data,
		});
		
		return this;
	},
	
	// -----------------------------------------------------------------
	getSources: function(){
		return this._sources;
	},
	
	// -----------------------------------------------------------------
	getUserType: function(deviceMac){
		return this._sources[deviceMac].getUserType();
	},
	
	// -----------------------------------------------------------------
	setMap: function(map){
		this.objNetwork["map"] = map;
		return this;
	}
	
})