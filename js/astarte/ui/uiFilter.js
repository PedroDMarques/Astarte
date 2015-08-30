/*global astarte*/
/*global L*/
/*global $*/

astarte.UiFilter = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"heartbeat_slider" : null,
		"heartbeat_display_min" : null,
		"heartbeat_display_max" : null,
		"battery_slider" : null,
		"battery_display_min" : null,
		"battery_display_max" : null,
		"movements_slider" : null,
		"movements_display_min" : null,
		"movements_display_max" : null,
		"screen_slider" : null,
		"screen_display_min" : null,
		"screen_display_max" : null,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		
		this._heartbeatSlider = $("#" + this.options["heartbeat_slider"]);
		this._heartbeatDisplayMin = $("#" + this.options["heartbeat_display_min"]);
		this._heartbeatDisplayMax = $("#" + this.options["heartbeat_display_max"]);
		
		this._batterySlider = $("#" + this.options["battery_slider"]);
		this._batteryDisplayMin = $("#" + this.options["battery_display_min"]);
		this._batteryDisplayMax = $("#" + this.options["battery_display_max"]);
		
		this._movementsSlider = $("#" + this.options["movements_slider"]);
		this._movementsDisplayMin = $("#" + this.options["movements_display_min"]);
		this._movementsDisplayMax = $("#" + this.options["movements_display_max"]);
		
		this._screenSlider = $("#" + this.options["screen_slider"]);
		this._screenDisplayMin = $("#" + this.options["screen_display_min"]);
		this._screenDisplayMax = $("#" + this.options["screen_display_max"]);
		
		this._heartbeatSlider.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 240,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : true,
			"step" : 1,
			"values" : [0, 240],
			
			"slide" : (function(){
				this.update("heartbeat");
			}).bind(this),
			"change" : (function(){
				this.update("heartbeat");
			}).bind(this),
			
		});
		
		this._batterySlider.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 100,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : true,
			"step" : 1,
			"values" : [0, 100],
			
			"slide" : (function(){
				this.update("battery");
			}).bind(this),
			"change" : (function(){
				this.update("battery");
			}).bind(this),
		});
		
		this._movementsSlider.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 100,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : true,
			"step" : 1,
			"values" : [0, 100],
			
			"slide" : (function(){
				this.update("movements");
			}).bind(this),
			"change" : (function(){
				this.update("movements");
			}).bind(this),
		});
		
		this._screenSlider.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 100,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : true,
			"step" : 1,
			"values" : [0, 100],
			
			"slide" : (function(){
				this.update("screen");
			}).bind(this),
			"change" : (function(){
				this.update("screen");
			}).bind(this),
		});
		
		this.update("heartbeat");
		this.update("battery");
		this.update("movements");
		this.update("screen");
		
		return this;
	},
	
	// -----------------------------------------------------------------
	update: function(sliderType){
		
		var slider = null;
		var minDisplay = null;
		var maxDisplay = null;
		
		switch(sliderType){
			case "heartbeat":
				slider = this._heartbeatSlider;
				minDisplay = this._heartbeatDisplayMin;
				maxDisplay = this._heartbeatDisplayMax;
				break;
			case "battery":
				slider = this._batterySlider;
				minDisplay = this._batteryDisplayMin;
				maxDisplay = this._batteryDisplayMax;
				break;
			case "movements":
				slider = this._movementsSlider;
				minDisplay = this._movementsDisplayMin;
				maxDisplay = this._movementsDisplayMax;
				break;
			case "screen":
				slider = this._screenSlider;
				minDisplay = this._screenDisplayMin;
				maxDisplay = this._screenDisplayMax;
				break;
		}
		
		minDisplay.html(slider.slider("values", 0));
		maxDisplay.html(slider.slider("values", 1));
		
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(objNet){
		$.extend(this.objNet, objNet);
		return this;
	}
	
});