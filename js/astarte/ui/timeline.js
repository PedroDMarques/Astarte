/*global astarte*/
/*global L*/

astarte.Timeline = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, options){
		this.setOptions(options);
		this._timeline = $("#"+DOMid).slider({
			"animate" : true,
		});
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	getSlider: function(){
		return this._timeline;
	},
	
	// -----------------------------------------------------------------
	setMax: function(max){
		console.log("max: " + max);
	},
	
	// -----------------------------------------------------------------
	setMin: function(min){
		console.log("min: " + min);
	}
	
});