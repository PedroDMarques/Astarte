/*global astarte*/
/*global L*/

astarte.markerCreator = {

	// -----------------------------------------------------------------
	createMarker: function(obj){
		
		var marker = L.marker([obj.lat, obj.lng], {
			"riseOnHover" : true,
		});
		
		var icon = L.mapbox.marker.icon({
			"marker-size" : "medium",
			"marker-symbol" : "pitch",
			"marker-color" : "#a50",
		});
		
		marker.setIcon(icon);
		return marker;
	}
	
}