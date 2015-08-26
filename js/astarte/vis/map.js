/*global astarte*/
/*global L*/

// API key to use mapbox tiles. Will be changed later to specify when initializing the map
L.mapbox.accessToken = "pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A";


astarte.Map = L.mapbox.Map.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,
		"timeline" : null,
		"info_bubble" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, mapId, objNet, options){
		L.mapbox.Map.prototype.initialize.call(this, DOMid, mapId, options);
		this.setObjNet(objNet)
		this._dataLayers = {};
		this._setupContextMenu();
		this.on("zoomend", function(event){console.log("current zoom = " + event.target._zoom);}, this);
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	addDataLayer: function(name, layer){
		
		// Don't overwrite any existing layer with the same name
		if(!this._dataLayers[name]){
			this._dataLayers[name] = layer;
			// Add the layer by default
			this.addLayer(layer);
		}
		
		return this;
		
	},
	
	// -----------------------------------------------------------------
	toggleDataLayer: function(name){
		this._dataLayers[name].toggle();
		if(this._dataLayers[name].isVisible()){
			var timeline = astarte.ffon(this, ["timeline"]);
			this._dataLayers[name].redraw(timeline.getCurMin(), timeline.getCurMax());
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(minTime, maxTime){
		var timeline = astarte.ffon(this, ["timeline"]);
		minTime = minTime || timeline.getCurMin();
		maxTime = maxTime || timeline.getCurMax();
		for(var dl in this._dataLayers){
			if(this._dataLayers[dl].isVisible()){
				this._dataLayers[dl].redraw(minTime, maxTime);
			}
		}
		return this;
	},
	
	//-----------------------------------------------------------------------------
	_setupContextMenu: function(){
		this.contextmenu.addItem({
			"text" : "Redraw map",
			"callback" : function(){
				this.redraw();
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"separator" : true,
		});
		
		this.contextmenu.addItem({
			"text" : "Toggle Markers",
			"callback" : function(){
				this.toggleDataLayer("markers");
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"text" : "Toggle Heatmap",
			"callback" : function(){
				this.toggleDataLayer("heatmap");
			},
			"context" : this,
		});
		
	},
	
	//-----------------------------------------------------------------------------
	getDataLayer: function(name){
		return this._dataLayers[name];
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	}
	
});