/*global astarte*/
/*global L*/

astarte.Filter = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"heartbeat_min" : 0,
		"heartbeat_max" : 240,
		"battery_min" : 0,
		"battery_max" : 100,
		"movements_min" : 0,
		"movements_max" : 100,
		"screen_min" : 0,
		"screen_max" : 100,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	filter: function(obj){
		
		if(obj["heartbeat"]){
			if(obj["heartbeat"] < this.options["heartbeat_min"] || obj["heartbeat"] > this.options["heartbeat_max"]){
				return false;
			}	
		}
		if(obj["battery"]){
			if(obj["battery"] < this.options["battery_min"] || obj["battery"] > this.options["battery_max"]){
				return false;
			}
		}
		if(obj["movements"]){
			if(obj["movements"] < this.options["movements_min"] || obj["movements"] > this.options["movements_max"]){
				return false;
			}
		}
		if(obj["screen"]){
			if(obj["screen"] < this.options["screen_min"] || obj["screen"] > this.options["screen_max"]){
				return false;
			}
		}
		
		return true;
	},
	
	// -----------------------------------------------------------------
	changeMinMax: function(dataType, min, max){
		var options = {};
		options[dataType + "_min"] = min;
		options[dataType + "_max"] = max;
		this.setOptions(options);
		return this;
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