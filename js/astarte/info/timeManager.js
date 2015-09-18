/*global astarte*/
/*global L*/
/*global $*/

astarte.TimeManager = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._times = {
			"genTime" : {
				"min" : "9999",
				"max" : "0",
				"curTime" : "0",
				"curRangeMin" : "9999",
				"curRangeMax" : "0",
			},
			"recTime" : {
				"min" : "9999",
				"max" : "0",
				"curTime" : "0",
				"curRangeMin" : "9999",
				"curRangeMax" : "0",
			},
			"coordTime" : {
				"min" : "9999",
				"max" : "0",
				"curTime" : "0",
				"curRangeMin" : "9999",
				"curRangeMax" : "0",
			},
		}
		
	},
	
});