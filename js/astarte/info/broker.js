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
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		
		this.setOptions(options);
		this.setObjNet(objNet);
		// Holds all the sources available
		this._sources = {}
		
		this._minFound = "9999";
		this._maxFound = "0";
		
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
		}
		$.extend(objToFire, data);
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