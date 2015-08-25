/*global astarte*/
/*global L*/

astarte.Source = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
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
		var markerCreator = astarte.util.findFirstObjNetwork(this, ["broker", "map", "marker_creator"]);
		
		var marker = L.marker([lat, lng], {
			"riseOnHover" : true,
		});
		
		marker.genTime = genTime;
		marker.highlighted = false;
		
		marker.setIcon(markerCreator.createIcon(marker, data));
		
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
		
		marker.addEventListener("click", this._infoBubbleEvent, this);
		marker.addEventListener("click", this.highlightMarkers, this);
		
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
	
	// -----------------------------------------------------------------
	highlightMarkers: function(){
		
		for(var i = 0; i < this._markers.length; i++){
			var marker = this._markers[i];
			
			marker.highlighted = true;
			
			var markerCreator = astarte.util.findFirstObjNetwork(this, ["broker", "map", "marker_creator"]);
			
			marker.setIcon(markerCreator.createIcon(marker, this._locationData[marker.genTime]));
		}
		
		var map = astarte.util.findFirstObjNetwork(this, ["broker", "map"]);
		map.addEventListener("click", this.removeHighlight, this);
		
		return this;
		
	},
	
	// -----------------------------------------------------------------
	removeHighlight: function(){
		
		for(var i = 0; i < this._markers.length; i++){
			var marker = this._markers[i];
			
			marker.highlighted = false;
			
			var markerCreator = astarte.util.findFirstObjNetwork(this, ["broker", "map", "marker_creator"]);
			
			marker.setIcon(markerCreator.createIcon(marker, this._locationData[marker.genTime]));
		}
		return this;
		
	},
	
	// -----------------------------------------------------------------
	_infoBubbleEvent: function(event){
		var marker = event.target;
		var infoB = astarte.util.findFirstObjNetwork(this, ["broker", "map", "info_bubble"]);
			
		if(infoB){
			
			var props = this._locationData[marker.genTime];
			props.genTime = marker.genTime;
			props.lat = marker.getLatLng().lat;
			props.lng = marker.getLatLng().lng;
			
			infoB.setContent(this._deviceMac, props);
			
		}
	},
	
	// -----------------------------------------------------------------
	getLatestInfo: function(maxTime){
		
		var marker = astarte.util.lastInArr(this._markers);
		
		var toRet = this._locationData[marker.genTime];
		toRet.genTime = marker.genTime;
		toRet.lat = marker.getLatLng().lat;
		toRet.lng = marker.getLatLng().lng;
		
		return toRet;
	}
	
});