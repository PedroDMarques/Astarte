/*global astarte*/
/*global L*/
/*global $*/

astarte.Source = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(sourceVars, objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._deviceMac = sourceVars.deviceMac;
		this._userType = sourceVars.userType;
		
		this._locations = {
			
			// Objects containing all the information pertinent to a location
			"objects" : [],
			
			// Lists specifying the order of each location object regarding a particular time type
			"ordering" : {
				"genTime" : [],
				"recTime" : [],
				"coordTime" : [],
			},
			
			// Lists specifying which objects cannot be ordered by a specific time. (should always be show)
			"unorderable" : {
				"genTime" : [],
				"recTime" : [],
				"coordTime" : [],
			},
		}
		
	},
	
	/* -----------------------------------------------------------------
	Add a new location corresponding to this source
		obj = {
			"lat" : lat,
			"lng" : lng,
			"genTime" : genTime,
			"recTime" : recTime,
			"coordTime" : coordTime,
			"data" : data,
		}
	Also does the ordering that for each timeType present in the obj supplied
	----------------------------------------------------------------- */
	addLocation: function(obj){
		
		// Get the id for this location object so that we can order them
		var locationId = this._locations.objects.length;
		
		var locObj = obj;
		locObj.locationId = locationId;
		
		// Add the location object to the list of objects
		this._locations.objects.push(locObj);
		
		// Order by each type of time type
		for(var timeType in this._locations.ordering){
			
			// If we can other it by this time type (i.e. it has information for this time type)
			if(locObj[timeType]){
				var found = false;
				var i = 0;
				
				while(!found){
					if(i === this._locations.ordering[timeType].length){
						this._locations.ordering[timeType].push(locationId);
						found = true;
						
					}else{
						var otherId = this._locations.ordering[timeType][i];
						var otherObj = this._locations.objects[otherId];
						if(locObj[timeType] <= otherObj[timeType]){
							this._locations.ordering[timeType].splice(i, 0, locationId);
							found = true;
						}
						
					}
					i++;
				}
				
			}else{
				this._locations.unorderable[timeType].push(locationId);
			}
			
		}
		
	},
	
	// -----------------------------------------------------------------
	getDeviceMac: function(){
		return this._deviceMac;
	},
	
	// -----------------------------------------------------------------
	getUserType: function(){
		return this._userType;
	}
	
});