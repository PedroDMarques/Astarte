/*global astarte*/
/*global L*/
/*global $*/

astarte.UiFilter = astarte.MenuComponent.extend({
	
	// -----------------------------------------------------------------
	options: {
		"default_icon" : "filter",
		"default_title" : "Basic Filters",
		"default_sub_title" : "",
		
		"heartbeat_slider" : "",
		"heartbeat_min_display" : "",
		"heartbeat_max_display": "",
		"battery_slider" : "",
		"battery_min_display" : "",
		"battery_max_display": "",
		"movements_slider" : "",
		"movements_min_display" : "",
		"movements_max_display": "",
		"screen_slider" : "",
		"screen_min_display" : "",
		"screen_max_display": "",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(container, objNet, options){
		astarte.MenuComponent.prototype.initialize.call(this, container, objNet, options);
		
		this._sliders = {
			"heartbeat" : $("#" + this.options["heartbeat_slider"]),
			"battery" : $("#" + this.options["battery_slider"]),
			"movements" : $("#" + this.options["movements_slider"]),
			"screen" : $("#" + this.options["screen_slider"]),
		}
		
		this._sliderMinDisplay = {
			"heartbeat" : $("#" + this.options["heartbeat_min_display"]),
			"battery" : $("#" + this.options["battery_min_display"]),
			"movements" : $("#" + this.options["movements_min_display"]),
			"screen" : $("#" + this.options["screen_min_display"]),
		}
		
		this._sliderMaxDisplay = {
			"heartbeat" : $("#" + this.options["heartbeat_max_display"]),
			"battery" : $("#" + this.options["battery_max_display"]),
			"movements" : $("#" + this.options["movements_max_display"]),
			"screen" : $("#" + this.options["screen_max_display"]),
		}

		this._sliders["heartbeat"].slider({
			"range" : true,
			"min" : 0,
			"max" : 240,
			"values" : [0, 240],
			
			"change" : (function(event, ui){
				this.onChange("heartbeat", ui.values);
			}).bind(this),
		});
		
		this._sliders["battery"].slider({
			"range" : true,
			"min" : 0,
			"max" : 100,
			"values" : [0, 100],
			
			"change" : (function(event, ui){
				this.onChange("battery", ui.values);
			}).bind(this),
		});
		
		this._sliders["movements"].slider({
			"range" : true,
			"min" : 0,
			"max" : 100,
			"values" : [0, 100],
			
			"change" : (function(event, ui){
				this.onChange("movements", ui.values);
			}).bind(this),
		});
		
		this._sliders["screen"].slider({
			"range" : true,
			"min" : 0,
			"max" : 100,
			"values" : [0, 100],
			
			"change" : (function(event, ui){
				this.onChange("screen", ui.values);
			}).bind(this),
		});

		return this;
	},
	
	// -----------------------------------------------------------------
	onChange: function(slider, values){
		var map = astarte.ffon(this, ["map"]);
		var filter = astarte.ffon(map, ["filter"]);
		filter.changeMinMax(slider, values[0], values[1]);
		map.redraw();
		this._sliderMinDisplay[slider].html(values[0]);
		this._sliderMaxDisplay[slider].html(values[1]);
		return this;
	}
	
})