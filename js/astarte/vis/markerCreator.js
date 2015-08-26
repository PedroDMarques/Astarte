/*global astarte*/
/*global L*/

astarte.MarkerCreator = L.Class.extend({

	//-----------------------------------------------------------------------------
	options: {
		"good_color" : "#0f0",
		"bad_color" : "#f00",
	},
	
	//-----------------------------------------------------------------------------
	initialize: function(){
		return this;	
	},
	
	//-----------------------------------------------------------------------------
	createIcon: function(value, worst){
		if(value > worst){
			value = worst;
		}
		var color = $.xcolor.gradientlevel(this.options["good_color"], this.options["bad_color"], value, worst).getHex();
		var icon = L.mapbox.marker.icon({
			"marker-size" : "medium",
			"marker-symbol" : "pitch",
			"marker-color" : color,
		});
		return icon;
	},
	
});