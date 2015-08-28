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
		
		this._highlightConnection = null;
		this._lastHighlightedDeviceMac = null;
		
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
				"iconCreateFunction" : function(cluster){
					return L.mapbox.marker.icon({
						"marker-size" : "large",
						"marker-symbol" : "circle",
						"marker-color" : "#22b",
					});
				}
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
		marker.highlighted = false;
		
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var objVal = analizer.calculateVal(obj);
		var worst = analizer.worstVal();
		marker.setIcon(markerCreator.createIcon(objVal, worst));
		
		marker.addEventListener("click", function(event){
			this.highlightMarkers(event.target.deviceMac, event.target.genTime);
		}, this);
		
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
	redraw: function(curTime){
		for(var deviceMac in this._markers){
			var cg = this._getUserCG(deviceMac);
			var markers = this._markers[deviceMac];
			var foundLatest = false;
			
			for(var i = markers.length - 1; i > -1; i--){
				var marker = markers[i];
				if(foundLatest){
					cg.removeLayer(marker);
				}else{
					if(marker.genTime <= curTime){
						cg.addLayer(marker);
						foundLatest = true;
					}else{
						cg.removeLayer(marker);
					}
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
	},
	
	// -----------------------------------------------------------------
	highlightMarkers: function(deviceMac, genTime){
		if(this._lastHighlightedDeviceMac){
			this.removeHighlight(this._lastHighlightedDeviceMac);	
		}
		
		this._highlightConnection = new L.Polyline([],{
			"color" : "black",
			"opacity" : 1,
		});
		
		var markers = this._markers[deviceMac];
		var cg = this._getUserCG(deviceMac);
		for(var i = 0; i < markers.length; i++){
			var marker = markers[i];
			if(cg.hasLayer(marker)){
				var icon = L.mapbox.marker.icon({
					"marker-size" : "large",
					"marker-symbol" : "pitch",
					"marker-color" : "#aa0",
				});
				marker.setIcon(icon);
				marker.highlighted = true;
				this._highlightConnection.addLatLng(marker.getLatLng());
			}
			
		}
		this._lastHighlightedDeviceMac = deviceMac;
		
		this.addLayer(this._highlightConnection);
		
		var infoBubble = astarte.ffon(this, ["map", "info_bubble"]);
		var broker = astarte.ffon(this, ["map", "broker"]);
		var dataToDisplay = broker.getSource(deviceMac).getLocationData(genTime);
		infoBubble.setContent(deviceMac, dataToDisplay);
		
	},
	
	// -----------------------------------------------------------------
	removeHighlight: function(deviceMac){
		
		var markers = this._markers[deviceMac];
		
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var broker = astarte.ffon(this, ["map", "broker"]);
		
		for(var i = 0; i < markers.length; i++){
			var marker = markers[i];
			if(marker.highlighted){
				var data = broker.getSource(deviceMac).getLocationData(marker.genTime);
				var objVal = analizer.calculateVal(data);
				var worst = analizer.worstVal();
				marker.setIcon(markerCreator.createIcon(objVal, worst));
				marker.highlighted = false;
			}
		}
		
		this.removeLayer(this._highlightConnection);
	}
	
});