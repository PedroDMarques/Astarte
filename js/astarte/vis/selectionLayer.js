/*global astarte*/
/*global L*/

astarte.SelectionLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
		"draw_all_markers_from_highlighted" : false,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"webService" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.DataLayer.prototype.initialize.call(this, objNet, options);
		this._box = null;
		this._initialLatLng;
	},
	
	// -----------------------------------------------------------------
	selectFirstPoint: function(event){
		var map = event.target;
		map.removeEventListener("click");
		
		this._initialLatLng = event.latlng;
		this._box = L.rectangle([event.latlng, event.latlng], {
			//options
		});
		
		this.addLayer(this._box);
		
		map.on("mousemove", function(inner_event){
			this._box.setBounds([this._initialLatLng, inner_event.latlng]);
		}, this);
		map.on("click", this.selectSecondPoint, this);
	},
	
	// -----------------------------------------------------------------
	selectSecondPoint: function(event){
		var map = event.target;
		map.removeEventListener("click");
		map.removeEventListener("mousemove");
		var bounds = this._box.getBounds();
		var latLng = {
			"latMin" : bounds._southWest.lat,
			"latMax" : bounds._northEast.lat,
			"lngMin" : bounds._southWest.lng,
			"lngMax" : bounds._northEast.lng,
		}
		this.objNet["webService"].setOptions(latLng);
		this.objNet["webService"].start();
		this.toggle();
	},
	
});