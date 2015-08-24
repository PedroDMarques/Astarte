/*global astarte*/
/*global L*/

// API key to use mapbox tiles. Will be changed later to specify when initializing the map
L.mapbox.accessToken = "pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A";


astarte.Map = L.mapbox.map.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, mapId, options){
		
		L.mapbox.Map.prototype.initialize.call(this, DOMid, mapId, options);
		
		this._dataLayers = {};
		
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
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(){
		for(var dl in this._dataLayers){
			if(this._dataLayers[dl].isVisible()){
				this._dataLayers[dl].redraw();
			}
		}
		return this;
	}
	
});