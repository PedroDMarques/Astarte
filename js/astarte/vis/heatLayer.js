/*global astarte*/
/*global L*/

astarte.HeatLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.DataLayer.prototype.initialize.call(this, objNet, options);
		this._heatmap = new L.TileLayer.WebGLHeatMap({
			"size" : 800,
			"autoresize" : true,
			"opacity" : 0.7,
		});
		this.addLayer(this._heatmap);
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(curTime){
		var analizer = astarte.ffon(this, ["val_analizer"]);
		
		var broker = astarte.ffon(this, ["map", "broker"]);
		var sources = broker.getSources();
		
		var data = [];
		for(var deviceMac in sources){
			var latest = sources[deviceMac].getLatestInfo(curTime);
			if(latest){
				data.push([parseFloat(latest.lat), parseFloat(latest.lng), Math.random()]);
			}
			
		}
		
		this._heatmap.setData(data);
		this._heatmap.update();
		
	}
	
});