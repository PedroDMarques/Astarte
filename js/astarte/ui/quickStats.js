/*global astarte*/
/*global L*/
/*global $*/

astarte.QuickStats = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"ignore_time_checkbox" : "",
		"all_markers" : "",
		"drawn_markers" : "",
		"unique_devices" : "",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._ignoreTimeCheckBox = $("#" + this.options["ignore_time_checkbox"]);
		this._ignoreTimeCheckBox.on("change", (this.toggleIgnoreTime).bind(this));
		this._ignoreTime = true;
		
		this._allMarkers = $("#" + this.options["all_markers"]);
		this._drawnMarkers = $("#" + this.options["drawn_markers"]);
		this._uniqueDevices = $("#" + this.options["unique_devices"]);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setQuickStats: function(obj){
		this._allMarkers.html(obj["all_markers"]);
		this._drawnMarkers.html(obj["drawn_markers"]);
		this._uniqueDevices.html(obj["unique_devices"]);
		return this;
	},
	
	// -----------------------------------------------------------------
	toggleIgnoreTime: function(){
		this._ignoreTime = !this._ignoreTime;
		var obj = astarte.ffon(this, ["map"]).getQuickStats(this._ignoreTime);
		this.setQuickStats(obj);
		return this;
	},
	
	// -----------------------------------------------------------------
	isIgnoreTime: function(){
		return this._ignoreTime;
	}
	
})