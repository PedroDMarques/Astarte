/*global astarte*/
/*global L*/

astarte.DataLayer = L.LayerGroup.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		L.LayerGroup.prototype.initialize.call(this, []);
		this.setOptions(options);
		this.setObjNet(objNet);
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
		var map = this.objNet["map"];
		this._visible = !this._visible;
		if(this._visible){
			map.addLayer(this);
		}else{
			map.removeLayer(this);
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	isVisible: function(){
		return this._visible;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	}
	
});