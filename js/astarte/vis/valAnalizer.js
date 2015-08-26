/*global astarte*/
/*global L*/
/*global $*/

astarte.ValAnalizer = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"battery_value" : 2,
		"battery_ideal" : 100,
		"heartbeat_value" : 4,
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
			toRet += parseInt(obj["battery"]) * this.options["battery_value"];	
		}
		if(obj["heartbeat"]){
			toRet += parseInt(obj["heartbeat"]) * this.options["heartbeat_value"];	
		}
		if(obj["movements"]){
			toRet += parseInt(obj["movements"]) * this.options["movements_value"];	
		}
		if(obj["screen"]){
			toRet += parseInt(obj["screen"]) * this.options["screen_value"];	
		}
		return toRet;
	},
	
	// -----------------------------------------------------------------
	worstVal: function(){
		return 50;
	}
	
});