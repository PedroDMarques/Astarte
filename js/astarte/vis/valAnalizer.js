/*global astarte*/
/*global L*/
/*global $*/

astarte.ValAnalizer = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	},
	
	// -----------------------------------------------------------------
	calculateVal: function(obj){
		return 100 - obj["battery"];
	},
	
});