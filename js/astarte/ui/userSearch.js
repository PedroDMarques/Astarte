/*global astarte*/
/*global L*/
/*global $*/

astarte.UserSearch = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"user_search" : "",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"markerLayer" : null,
		"broker" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._search = $("#" + this.options.user_search);
		
		this._search.search({
			"cache" : false,
			"source" : astarte.ffon(this, ["broker"]).getSourceSearchList(),
			"onSelect" : (this.onSelect.bind(this)),
		});
		setInterval((function(){
			this._search.search({
				"cache" : false,
				"source" : astarte.ffon(this, ["broker"]).getSourceSearchList(),
				"onSelect" : (this.onSelect).bind(this),
			});	
		}).bind(this), 5000);
		
		
		return this;
	},
	
	// -----------------------------------------------------------------
	onSelect: function(result, response){
		var markerLayer = astarte.ffon(this, ["markerLayer"]);
		var marker = markerLayer.getLastMarkerByDeviceMac(result.title);
		markerLayer.highlightDevice(marker);
		markerLayer.panZoomToMarker(marker);
		return this;
	},
	
});