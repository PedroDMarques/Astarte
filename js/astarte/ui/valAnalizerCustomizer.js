/*global astarte*/
/*global L*/
/*global $*/

astarte.ValAnalizerCustomizer = astarte.MenuComponent.extend({
	
	// -----------------------------------------------------------------
	options: {
		"dropdown" : "",
		"heartbeat_slider" : "",
		"heartbeat_input" : "",
		"battery_slider" : "",
		"battery_input" : "",
		"movements_slider" : "",
		"movements_input" : "",
		"screen_slider" : "",
		"screen_input" : "",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(container, objNet, options){
		astarte.MenuComponent.prototype.initialize.call(this, container, objNet, options);
		
		this._dropdown = $("#" + this.options.dropdown).dropdown();
		this._selectedLayer = null;
		
		this._dropdown.on("change", (function(event){
			this._selectedLayer = event.target.defaultValue;
			for(var sliderType in this._sliders){
				this._sliders[sliderType].slider("enable");
			}
			for(var inputType in this._inputs){
				this._inputs[inputType].removeClass("disabled");
			}
		}).bind(this));
		
		this._sliders = {
			"heartbeat" : $("#" + this.options.heartbeat_slider),
			"battery" : $("#" + this.options.battery_slider),
			"movements" : $("#" + this.options.movements_slider),
			"screen" : $("#" + this.options.screen_slider),
		};
		
		for(var sliderType in this._sliders){
			this._sliders[sliderType].slider({
				"disabled" : true,
				"range" : false,
				"min" : 0,
				"max" : 100,
				"value" : 100,
			});
		}
		
		this._sliders["heartbeat"].slider({
			"slide" : (function(event, ui){
				this.onSlide("hearbeat", event, ui);
			}).bind(this),
		});

		this._sliders["battery"].slider({
			"slide" : (function(event, ui){
				this.onSlide("battery", event, ui);
			}).bind(this),
		});
		
		this._sliders["movements"].slider({
			"slide" : (function(event, ui){
				this.onSlide("movements", event, ui);
			}).bind(this),
		});
		
		this._sliders["screen"].slider({
			"slide" : (function(event, ui){
				this.onSlide("screen", event, ui);
			}).bind(this),
		});
		
		this._inputs = {
			"heartbeat" : $("#" + this.options.heartbeat_input),
			"battery" : $("#" + this.options.battery_input),
			"movements" : $("#" + this.options.movements_input),
			"screen" : $("#" + this.options.screen_input),
		};
		
		return this;
	},
	
	// -----------------------------------------------------------------
	onSlide: function(sliderType, event, ui){
		this._inputs[sliderType].find("input").val(ui.value);
	}
	
});