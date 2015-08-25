/*global astarte*/
/*global L*/

astarte.HeatLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(map, filter, options){
		astarte.DataLayer.prototype.initialize.call(this, map, filter, options);
		
		this._heatmap = new L.TileLayer.WebGLHeatMap({
			"size" : 800,
			"autoresize" : true,
			"opacity" : 0.7,
		});
		this.addLayer(this._heatmap);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(){
		
		this._heatmap.clearData();
		
		var broker = this._Amap.objNetwork["broker"];
		var sources = broker.getSources();
		
		for(var deviceMac in sources){
			
			var latest = sources[deviceMac].getLatestInfo();
			this._heatmap.addDataPoint(parseFloat(latest.lat), parseFloat(latest.lng), Math.random() * 100);
			
		}
		
		this._heatmap.update();
		
	}
	
});