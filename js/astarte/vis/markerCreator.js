/*global astarte*/
/*global L*/

astarte.MarkerCreator = L.Class.extend({

	//-----------------------------------------------------------------------------
	options: {
		
	},
	
	//-----------------------------------------------------------------------------
	initialize: function(){
		return this;	
	},
	
	//-----------------------------------------------------------------------------
	createIcon: function(marker, data){
		
		var color = !marker.highlighted ? "#a50" : "#f00"; 
		
		var icon = L.mapbox.marker.icon({
			"marker-size" : "medium",
			"marker-symbol" : "pitch",
			"marker-color" : color,
		});
		return icon;
	},
	
});