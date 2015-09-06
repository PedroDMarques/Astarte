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
		this._highlightedDevice = null;
		this._clusterGroups = {};
		
		var broker = astarte.ffon(this, ["map", "broker"]);
		broker.addEventListener("source_added", this.addSource, this);
		broker.addEventListener("location_added", this.addLocation, this);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	addClusterGroup: function(name){
		if(!this._clusterGroups[name]){
			var cluster = new L.MarkerClusterGroup({
				"maxClusterRadius" : 40,
				"zoomToBoundsOnClick" : false,
				"disableClusteringAtZoom" : 20,
				"iconCreateFunction" : function(cluster){
					return L.mapbox.marker.icon({
						"marker-size" : "large",
						"marker-symbol" : "circle",
						"marker-color" : "#22b",
					});
				}
			});
			
			var clusterClickFunc = function(e){
				astarte.ffon(this, ["map", "infoB"]).setClusterInformation(e.layer.getAllChildMarkers());
			}
			
			cluster.on("clusterclick", clusterClickFunc.bind(this));
			cluster.on("clusterdblclick", function(e){
				e.layer.zoomToBounds();
			});
			this._clusterGroups[name] = cluster; 
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
		
		var marker = L.marker([obj.lat, obj.lng], {
			"riseOnHover" : true,
			"riseOffset" : 1000,
		});
		
		marker.genTime = obj.genTime;
		marker.deviceMac = obj.deviceMac;
		
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		
		var val = analizer.calculateVal(obj.data);
		var icon = markerCreator.createIcon(val, 10, marker);
		
		marker.setIcon(icon);
		
		var markers = this._markers[obj.deviceMac];
		var i = 0;
		var added = false;
		
		while(!added){
			if(i === markers.length){
				this._markers[obj.deviceMac].push(marker);
				added = true;
			}else if(marker.genTime <= markers[i].genTime){
				this._markers[obj.deviceMac].splice(i, 0, marker);
				added = true;
			}
			i++;
		}
		
		// Events
		marker.addEventListener("click", function(event){
			this.highlightDevice(event.target.deviceMac);
			this.setInfoB(event.target);
		}, this);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(curTime){
		
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var filter = astarte.ffon(this, ["map", "filter"]);
		
		for(var deviceMac in this._markers){
			var markers = this._markers[deviceMac];
			var cg = this._getUserCG(deviceMac);
			var foundLatest = false;
			
			if(this._highlightedDevice === deviceMac){
				for(var i = 0; i < markers.length; i++){
					var marker = markers[i];
					cg.addLayer(marker);	
				}
				
			}else{
				for(var i = markers.length - 1; i > -1; i--){
					var marker = markers[i];
					var broker = astarte.ffon(this, ["map", "broker"]);
					var data = broker.getSource(deviceMac).getLocationData(marker.genTime);
					if(foundLatest){
						cg.removeLayer(marker);
					}else{
						if(marker.genTime <= curTime && filter.filter(data)){
							var opacity = markerCreator.calculateOpacity(marker.genTime, curTime);
							marker.setOpacity(opacity);
							cg.addLayer(marker);
							foundLatest = true;
						}else{
							cg.removeLayer(marker);
						}
					}
				}
			}
			
		}
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
	highlightDevice: function(deviceMac){
		this._highlightedDevice = deviceMac;
		var timeline = astarte.ffon(this, ["map", "timeline"]);
		this.redraw(timeline.getCurTime());
	},
	
	// -----------------------------------------------------------------
	removeHighlight: function(deviceMac){
		
	},
	
	// -----------------------------------------------------------------
	setInfoB: function(marker){
		var infoB = astarte.ffon(this, ["map", "infoB"]);
		infoB.setMarkerInformation(marker);
	},
	
	// -----------------------------------------------------------------
	panZoomToMarker: function(marker){
		var cg = this._getMarkerCG(marker);
		if(this.hasLayer(cg) && cg.hasLayer(marker)){
			var map = astarte.ffon(this, ["map"]);
			map.panTo(marker.getLatLng());
			setTimeout(function(){
				cg.zoomToShowLayer(marker, function(){});	
			}, 250);
		}
	}
	
});