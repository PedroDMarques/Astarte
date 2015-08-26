/*global astarte*/
/*global L*/
/*global $*/

astarte.ValAnalizer = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"battery_value" : 5,
		"battery_ideal" : 100,
		"heartbeat_value" : 10,
		"heartbeat_ideal" : 180,
		"movements_value" : 1,
		"movements_ideal" : 3,
		"screen_value" : 1,
		"screen_ideal" : 5,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	},
	
	// -----------------------------------------------------------------
	calculateVal: function(obj){
		var toRet = 0;
		if(obj["battery"]){
			toRet += (this.options["battery_ideal"] - parseInt(obj["battery"])) * this.options["battery_value"];	
		}
		if(obj["heartbeat"]){
			toRet += (this.options["heartbeat_ideal"] - parseInt(obj["heartbeat"])) * this.options["heartbeat_value"];	
		}
		if(obj["movements"]){
			toRet += (this.options["movements_ideal"] - parseInt(obj["movements"])) * this.options["movements_value"];	
		}
		if(obj["screen"]){
			toRet += (this.options["screen_ideal"] - parseInt(obj["screen"])) * this.options["screen_value"];	
		}
		return toRet / 1000;
	}
	
})