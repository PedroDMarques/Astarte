/*global astarte*/
/*global L*/

astarte.Source = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
		"marker_create_function" : astarte.markerCreator.createMarker,
		
	},
	
	// -----------------------------------------------------------------
	objNetwork: {
		
		"broker" : null,
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(deviceMac, userType, objNetwork, options){
		
		this.setOptions(options);
	
		$.extend(this.objNetwork, objNetwork);
	
		this._deviceMac = deviceMac;
		this._userType = userType;
		
		// Holds basic information as well as being markers that can be drawn (have marker.lat, marker.lng, marker.genTime)
		this._markers = [];
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
		
		// Get a marker made
		var marker = this.options["marker_create_function"]({
			"deviceMac" : this._deviceMac,
			"userType" : this._userType,
			"lat" : lat,
			"lng" : lng,
			"genTime" : genTime,
			"data" : data,
		});
		
		marker.genTime = genTime;
		
		// Order the marker into this._markers
		var added = false;
		var i = 0;
		
		while(!added){
			if(i === this._markers.length){
				this._markers.push(marker);
				added = true;
			}else if(genTime <= this._markers[i].genTime){
				this._markers.splice(i, 0, marker);
				added = true;
			}
			i++;
		}
		
		marker.addEventListener("click", function(){
			
			var infoB = astarte.util.findFirstObjNetwork(this, ["broker", "map", "info_bubble"]);
			
			if(infoB){
				
				var props = data;
				props.genTime = genTime;
				props.lat = lat;
				props.lng = lng;
				
				infoB.setContent(this._deviceMac, props);
				
			}
		}, this);
		
	},
	
	// -----------------------------------------------------------------
	getAllMarkers: function(){
		return this._markers;
	},
	
	// -----------------------------------------------------------------
	getFilteredMarkers: function(filter){
		return filter.filterMany(this._markers);
	},
	
	// -----------------------------------------------------------------
	getUserType: function(){
		return this._userType;	
	},
	
});