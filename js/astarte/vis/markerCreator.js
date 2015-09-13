/*global astarte*/
/*global L*/

astarte.MarkerCreator = astarte.Class.extend({

	//-----------------------------------------------------------------------------
	options: {
		"good_color" : "#0f0",
		"bad_color" : "#f00",
		"start_opacity_change" : 600, //in seconds
	},
	
	//-----------------------------------------------------------------------------
	objNet: {
		
	},
	
	//-----------------------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		return this;	
	},
	
	//-----------------------------------------------------------------------------
	setIcon: function(marker, val, worst, highlighted){
		var color = $.xcolor.gradientlevel(this.options["good_color"], this.options["bad_color"], val, worst).getHex();
		var sym = highlighted ? "polling-place" : "pitch";
		var icon = L.mapbox.marker.icon({
			"marker-size" : "medium",
			"marker-symbol" : sym,
			"marker-color" : color,
		});
		marker.setIcon(icon);
		marker.color = color;
	},
	
	//-----------------------------------------------------------------------------
	calculateOpacity: function(markerTime, curTime){
		var markerTimeSec = new Date(markerTime).getTime();
		var curTimeSec = new Date(curTime).getTime();
		var opacity = 1;
		var dif = curTimeSec - markerTimeSec;
		if(dif >= (this.options["start_opacity_change"] * 1000)){
			opacity = 0.7;
		}
		return opacity;
	}
	
});