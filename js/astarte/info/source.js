/*global astarte*/
/*global L*/
/*global $*/

astarte.Source = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(deviceMac, userType, objNet, options){
		
		this.setOptions(options);
	
		this.setObjNet(objNet);
	
		this._deviceMac = deviceMac;
		this._userType = userType;
		
		// Holds basic information as well as being markers that can be drawn (have marker.lat, marker.lng, marker.genTime)
		this._locations = [];
		// Holds all data from each location (maps genTime -> data)
		this._locationData = {};
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	addLocation: function(lat, lng, genTime, data){
		
		// Store the data immediately
		this._locationData[genTime] = data;
		
		var locObj = {
			"lat" : lat,
			"lng" : lng,
			"genTime" : genTime,
		};
		
		// Order the marker into this._markers
		var added = false;
		var i = 0;
		
		while(!added){
			if(i === this._locations.length){
				this._locations.push(locObj);
				added = true;
			}else if(genTime <= this._locations[i].genTime){
				this._locations.splice(i, 0, locObj);
				added = true;
			}
			i++;
		}
		
	},
	
	// -----------------------------------------------------------------
	getAllLocations: function(){
		return this._locations;
	},
	
	// -----------------------------------------------------------------
	getUserType: function(){
		return this._userType;	
	},

	// -----------------------------------------------------------------
	getLatestInfo: function(curTime){
		var toRet = null;
		for(var i = this._locations.length - 1; i > -1; i--){
			var locObj = this._locations[i];
			if(locObj.genTime <= curTime){
				toRet = this._locationData[locObj.genTime];
				toRet.genTime = locObj.genTime;
				toRet.lat = locObj.lat;
				toRet.lng = locObj.lng;
				break;
				
			}
		}
		return toRet;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	},
	
	// -----------------------------------------------------------------
	getLocationData: function(genTime){
		return this._locationData[genTime];
	}
	
});