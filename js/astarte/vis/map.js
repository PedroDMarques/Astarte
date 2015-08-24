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
		
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	
	
});