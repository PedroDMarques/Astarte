/*global astarte*/
/*global L*/

astarte.MarkerLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(map, broker, filter, options){
		astarte.DataLayer.prototype.initialize.call(this, map, broker, filter, options);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(){
	
		var sources = this._broker.getSources();
		
		for(var deviceMac in sources){
			
			var markers = sources[deviceMac].getFilteredMarkers(this._filter);
			
			for(var i = 0; i < markers["passed"].length; i++){
				this.addLayer(markers["passed"][i]);
			}
			
			for(var i = 0; i < markers["failed"].length; i++){
				this.removeLayer(markers["failed"][i]);
			}
			
		}
		return this;
	},
	
});