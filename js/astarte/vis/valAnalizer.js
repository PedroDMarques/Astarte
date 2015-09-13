/*global astarte*/
/*global L*/
/*global $*/

astarte.ValAnalizer = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	calculateVal: function(obj){
		return 100 - obj["battery"];
	},
	
});