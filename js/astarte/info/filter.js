/*global astarte*/
/*global L*/

astarte.Filter = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(options){
		this.setOptions(options);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	filterOne: function(obj){
		return this;
	},
	
	// -----------------------------------------------------------------
	filterMany: function(arr){
		return {
			"passed" : arr,
			"failed" : [],
		};
	}
	
});