/*global astarte*/
/*global L*/

astarte.MarkerCreator = L.Class.extend({

	//-----------------------------------------------------------------------------
	options: {
		"good_color" : "#0f0",
		"bad_color" : "#f00",
		"start_opacity_change" : 600, //in seconds
	},
	
	//-----------------------------------------------------------------------------
	initialize: function(){
		return this;	
	},
	
	//-----------------------------------------------------------------------------
	createIcon: function(val, worst, marker){
		var color = $.xcolor.gradientlevel(this.options["good_color"], this.options["bad_color"], val, worst).getHex();
		var icon = L.mapbox.marker.icon({
			"marker-size" : "medium",
			"marker-symbol" : "pitch",
			"marker-color" : color,
		});
		if(marker){
			marker.color = color;
		}
		return icon;
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