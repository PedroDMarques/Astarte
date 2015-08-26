/*global astarte*/
/*global L*/

astarte.MarkerLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"marker_creator" : null,
		"val_analizer" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.DataLayer.prototype.initialize.call(this, objNet, options);
		
		// Holds all the markers
		this._markers = {};
		this._clusterGroups = {};
		
		astarte.ffon(this, ["map", "broker"]).addEventListener("source_added", this.addSource, this);
		astarte.ffon(this, ["map", "broker"]).addEventListener("location_added", this.addLocation, this);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	addClusterGroup: function(name){
		if(!this._clusterGroups[name]){
			this._clusterGroups[name] = new L.MarkerClusterGroup({
				"maxClusterRadius" : 40,
				"disableClusteringAtZoom" : 20,
			});
			this.addLayer(this._clusterGroups[name]);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	toggleClusterGroup: function(name){
		var cg = this._clusterGroups[name];
		if(cg){
			if(this.hasLayer(cg)){
				this.removeLayer(cg);
			}else{
				this.addLayer(cg);
			}
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	addSource: function(obj){
		if(!this._markers[obj.deviceMac]){
			this._markers[obj.deviceMac] = [];
			this.addClusterGroup(obj.userType);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	addLocation: function(obj){
		
		var marker = new L.marker([obj.lat, obj.lng], {
			"riseOnHover" : true,
		});
		
		marker.genTime = obj.genTime;
		marker.deviceMac = obj.deviceMac;
		
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var objVal = analizer.calculateVal(obj);
		var worst = analizer.worstVal();
		marker.setIcon(markerCreator.createIcon(objVal, worst));
		
		var markers = this._markers[obj.deviceMac];
		var added = false;
		var i = 0;
		
		while(!added){
			if(i === markers.length){
				this._markers[obj.deviceMac].push(marker);
				added = true;
			}else if(obj.genTime <= markers[i].genTime){
				this._markers[obj.deviceMac].splice(i, 0, marker);
				added = true;
			}
			i++;
		}
		
		return this;
		
	},
	
	// -----------------------------------------------------------------
	redraw: function(minTime, maxTime){
		for(var deviceMac in this._markers){
			var cg = this._getUserCG(deviceMac);
			var markers = this._markers[deviceMac];
			
			for(var i = 0; i < markers.length; i++){
				var marker = markers[i];
				if(marker.genTime >= minTime && marker.genTime <= maxTime){
					cg.addLayer(marker);
				
				}else{
					cg.removeLayer(marker);
				}
			}
			
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	_getMarkerCG: function(marker){
		var broker = astarte.ffon(this, ["map", "broker"]);
		var userType = broker.getSource(marker.deviceMac).getUserType();
		return this._clusterGroups[userType];
	},
	
	// -----------------------------------------------------------------
	_getUserCG: function(deviceMac){
		var broker = astarte.ffon(this, ["map", "broker"]);
		var userType = broker.getSource(deviceMac).getUserType();
		return this._clusterGroups[userType];
	}
	
	
});