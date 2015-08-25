/*global astarte*/
/*global L*/

astarte.MarkerLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(map, filter, options){
		astarte.DataLayer.prototype.initialize.call(this, map, filter, options);
		
		this._clusterGroups = {};
		
		return this;
	},
	
	// -----------------------------------------------------------------
	addClusterGroup: function(name){
		if(!this._clusterGroups[name]){
			this._clusterGroups[name] = new L.MarkerClusterGroup({
				"maxClusterRadius" : 20,
			});
			this.addLayer(this._clusterGroups[name]);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	toggleClusterGroup: function(name){
		if(this.hasLayer(this._clusterGroups[name])){
			this.removeLayer(this._clusterGroups[name]);
		}else{
			this.addLayer(this._clusterGroups[name]);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(){
	
		var sources = this._Amap.objNetwork["broker"].getSources();
		
		for(var deviceMac in sources){
			
			var userType = sources[deviceMac].getUserType();
			if(!this._clusterGroups[userType]){
				this.addClusterGroup(userType);
			}
			var cg = this._clusterGroups[userType];
			
			if(this.hasLayer(cg)){
				
				var markers = sources[deviceMac].getFilteredMarkers(this._filter);
				
				for(var i = 0; i < markers["passed"].length; i++){
					cg.addLayer(markers["passed"][i]);
				}
				
				for(var i = 0; i < markers["failed"].length; i++){
					cg.removeLayer(markers["failed"][i]);
				}
			}
			
		}
		return this;
	},
	
});