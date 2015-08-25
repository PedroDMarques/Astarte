/*global astarte*/
/*global L*/

astarte.DataLayer = L.LayerGroup.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(map, filter, options){
		
		L.LayerGroup.prototype.initialize.call(this, []);
		
		this.setOptions(options);
		
		this._Amap = map;
		this._filter = filter;
		
		this._visible = true;
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(){},
	
	// -----------------------------------------------------------------
	toggle: function(){
		this._visible = !this._visible;
		if(this._visible){
			this._Amap.addLayer(this);
			this.redraw();
		}else{
			this._Amap.removeLayer(this);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	isVisible: function(){
		return this._visible;
	}
	
});