/*global astarte*/
/*global L*/

// API key to use mapbox tiles. Will be changed later to specify when initializing the map
L.mapbox.accessToken = "pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A";


astarte.Map = L.mapbox.Map.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNetwork: {
		"broker" : null,
		"marker_creator" : null,
		"info_bubble" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, mapId, objNetwork, options){
		
		L.mapbox.Map.prototype.initialize.call(this, DOMid, mapId, options);
		
		$.extend(this.objNetwork, objNetwork);
		
		this._dataLayers = {};
		
		this._setupContextMenu();
		
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
		
	},
	
	//-----------------------------------------------------------------------------
	getDataLayer: function(name){
		return this._dataLayers[name];
	}
	
});