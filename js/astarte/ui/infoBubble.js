/*global astarte*/
/*global L*/
/*global $*/

astarte.InfoBubble = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"container" : null,
		"device_mac_display" : null,
		"basic_info_list" : null,
		"data_gen_list" : null,
		"info_bubble_close" : null,
		"info_bubble_pan" : null,
		"info_bubble_focus" : null,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		
		this._container = $("#" + this.options["container"]);
		this._deviceMacDisplay = $("#" + this.options["device_mac_display"]);
		this._basicInfoList = $("#" + this.options["basic_info_list"]);
		this._dataGenList = $("#" + this.options["data_gen_list"]);
		this._closeBtn = $("#" + this.options["info_bubble_close"]);
		this._panBtn = $("#" + this.options["info_bubble_pan"]);
		this._focusBtn = $("#" + this.options["info_bubble_focus"]);
		
		this._panBtn.on("click", this._pan.bind(this));
		this._focusBtn.on("click", this._focus.bind(this));
		this._closeBtn.on("click", this.hide.bind(this));
		
		this._curObj = null;
		
		return this;
	},
	
	// -----------------------------------------------------------------
	show: function(){
		this._container.css("display", "block");
		return this;	
	},
	
	// -----------------------------------------------------------------
	hide: function(){
		this._container.css("display", "none");
		return this;
	},
	
	// -----------------------------------------------------------------
	_pan: function(){
		if(this._curObj){
			if(this._curObj["marker"]){
				var map = astarte.ffon(this, ["map"]);
				map.panTo(this._curObj["marker"].getLatLng());
			}
		}
	},
	
	// -----------------------------------------------------------------
	_focus: function(){
		if(this._curObj){
			if(this._curObj["marker"]){
				var map = astarte.ffon(this, ["map"]);
				var markerLayer = map.getDataLayer("markers");
				markerLayer.panZoomToMarker(this._curObj["marker"]);
			}
		}
	},
	
	// -----------------------------------------------------------------
	update: function(){
		this._deviceMacDisplay.html(this._curObj["deviceMac"]);
		
		if(!this._curObj["basicInfo"]){
			this._curObj["basicInfo"] = {};
		}
		
		if(!this._curObj["dataGen"]){
			this._curObj["dataGen"] = {};
		}
		
		this._basicInfoList.html("");
		$("<li><b>Latitude: </b>" + this._curObj["basicInfo"]["lat"] + "</li>").appendTo(this._basicInfoList);
		$("<li><b>Longitude: </b>" + this._curObj["basicInfo"]["lng"] + "</li>").appendTo(this._basicInfoList);
		$("<li><b>Generation Time: </b>" + this._curObj["basicInfo"]["genTime"] + "</li>").appendTo(this._basicInfoList);
		
		this._dataGenList.html("");
		$("<li><b>Heartbeat: </b>" + this._curObj["dataGen"]["heartbeat"] + "</li>").appendTo(this._dataGenList);
		$("<li><b>Battery: </b>" + this._curObj["dataGen"]["battery"] + "</li>").appendTo(this._dataGenList);
		$("<li><b>Movements: </b>" + this._curObj["dataGen"]["movements"] + "</li>").appendTo(this._dataGenList);
		$("<li><b>Screen: </b>" + this._curObj["dataGen"]["screen"] + "</li>").appendTo(this._dataGenList);
		$("<li><b>Message: </b>" + this._curObj["dataGen"]["message"] + "</li>").appendTo(this._dataGenList);
		
		this.show();
		return this;
	},
	
	// -----------------------------------------------------------------
	setCurObj: function(obj){
		this._curObj = obj;
		this.update();
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