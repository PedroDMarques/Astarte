/*global astarte*/
/*global L*/

astarte.MarkerLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		"draw_all_markers_from_highlighted" : false,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"marker_creator" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.DataLayer.prototype.initialize.call(this, objNet, options);
		
		// Holds all the markers
		this._markers = {};
		this._highlightedMarker = {};
		this._highlightedConnection = null;
		
		this._drawnMarkers = 0;
		
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
				this.removeHighlight();
				this.setOptions({
					"draw_all_markers_from_highlighted" : false,
				});
				astarte.ffon(this, ["map", "infoBee"]).setClusterInformation(e.layer.getAllChildMarkers());
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
		markerCreator.setIcon(marker, val, 100);
		
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
			this.highlightDevice(event.target);
		}, this);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(curTime){
		
		this._drawnMarkers = 0;
		
		if(!curTime){
			var timeline = astarte.ffon(this, ["map", "timeline"]);
			curTime = timeline.getCurTime();
		}
		
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var filter = astarte.ffon(this, ["map", "filter"]);
		
		if(!this.options["draw_all_markers_from_highlighted"]){
			if(this._highlightConnection){
				this.removeLayer(this._highlightConnection);
			}
		}
		
		for(var deviceMac in this._markers){
			var markers = this._markers[deviceMac];
			var cg = this._getUserCG(deviceMac);
			var foundLatest = false;
			
			if(this._highlightedMarker.deviceMac === deviceMac){
				if(this.options["draw_all_markers_from_highlighted"]){
					if(this._highlightConnection){
						this.removeLayer(this._highlightConnection);
					}
					this._highlightConnection = L.polyline({});
					this.addLayer(this._highlightConnection);
					for(var i = 0; i < markers.length; i++){
						var marker = markers[i];
						cg.addLayer(marker);
						this._drawnMarkers++;
						this._highlightConnection.addLatLng(marker.getLatLng());
					}
				}else{
					if(this._highlightConnection){
						this.removeLayer(this._highlightConnection);
					}
					for(var i = 0; i < markers.length; i++){
						var marker = markers[i];
						if(marker === this._highlightedMarker){
							cg.addLayer(marker);
							this._drawnMarkers++;
						}else{
							cg.removeLayer(marker);
						}
					}
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
							this._drawnMarkers++;
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
	getDrawnMarkersCount: function(){
		return this._drawnMarkers;
	},
	
	// -----------------------------------------------------------------
	getMarkerCount: function(){
		var count = 0;
		for(var deviceMac in this._markers){
			count += this._markers[deviceMac].length;
		}
		return count;
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
	highlightDevice: function(marker){
		if(this._highlightedMarker["deviceMac"]){
			if(this._highlightedMarker.deviceMac !== marker.deviceMac){
				this.setOptions({
					"draw_all_markers_from_highlighted" : false,
				});
			}
			this.removeHighlight();	
		}
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var broker = astarte.ffon(this, ["map", "broker"]);
		var data = broker.getSource(marker.deviceMac).getLocationData(marker.genTime);
		var value = analizer.calculateVal(data);
		markerCreator.setIcon(marker, value, 100, true);
		this._highlightedMarker = marker;
		this.setInfoB(marker);
		var timeline = astarte.ffon(this, ["map", "timeline"]);
		this.redraw(timeline.getCurTime());
	},
	
	// -----------------------------------------------------------------
	removeHighlight: function(){
		if(!this._highlightedMarker["deviceMac"]){
			return;
		}
		var markerCreator = astarte.ffon(this, ["marker_creator"]);
		var analizer = astarte.ffon(this, ["val_analizer"]);
		var broker = astarte.ffon(this, ["map", "broker"]);
		var data = broker.getSource(this._highlightedMarker.deviceMac).getLocationData(this._highlightedMarker.genTime);
		var value = analizer.calculateVal(data);
		markerCreator.setIcon(this._highlightedMarker, value, 100);
		this._highlightedMarker = {};
	},
	
	// -----------------------------------------------------------------
	setInfoB: function(marker){
		var infoBee = astarte.ffon(this, ["map", "infoBee"]);
		infoBee.setMarkerInformation(marker);
	},
	
	// -----------------------------------------------------------------
	toggleDrawConnections: function(){
		if(this.options["draw_all_markers_from_highlighted"]){
			this.options["draw_all_markers_from_highlighted"] = false;
		}else{
			this.options["draw_all_markers_from_highlighted"] = true;
		}
		this.redraw();
	},
	
	// -----------------------------------------------------------------
	panZoomToMarker: function(marker){
		var cg = this._getMarkerCG(marker);
		if(this.hasLayer(cg) && cg.hasLayer(marker)){
			cg.zoomToShowLayer(marker, function(){});
		}
	},
	
	// -----------------------------------------------------------------
	getPreviousMarker: function(marker){
		var previous = null;
		var markers = this._markers[marker.deviceMac];
		for(var i = markers.length - 1; i >= 0; i--){
			var intMarker = markers[i];
			if(intMarker.genTime === marker.genTime){
				if(i > 0){
					previous = markers[i - 1];
					break;
				}
			}
		}
		return previous;
	},
	
	// -----------------------------------------------------------------
	getNextMarker: function(marker){
		var next = null;
		var markers = this._markers[marker.deviceMac];
		for(var i = 0; i < markers.length; i++){
			var intMarker = markers[i];
			if(intMarker.genTime === marker.genTime){
				if(i < markers.length - 1){
					next = markers[i + 1];
					break;
				}
			}
		}
		return next;
	},
	
	// -----------------------------------------------------------------
	getFirstMarker: function(marker){
		return this._markers[marker.deviceMac][0];
	},
	
	// -----------------------------------------------------------------
	getFirstMarkerByDeviceMac: function(deviceMac){
		return this._markers[deviceMac][0];
	},
	
	// -----------------------------------------------------------------
	getLastMarkerByDeviceMac: function(deviceMac){
		return astarte.util.lastInArr(this._markers[deviceMac]);
	},
	
	// -----------------------------------------------------------------
	getLastMarker: function(marker){
		return astarte.util.lastInArr(this._markers[marker.deviceMac]);
	}
	
});