/*global astarte*/
/*global L*/

astarte.Broker = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	includes: L.Mixin.Events,
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
		"web_service" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		// Holds all the sources available
		this._sources = {}
		
		this._minFound = "9999";
		this._maxFound = "0";
		
		this._sections = {};
		
		return this;
	},
	
	// -----------------------------------------------------------------
	addSection: function(id, start, end, isOpen, risks){
		var section = new astarte.Section(id, start, end, isOpen, risks);
		section.setObjNet({"routeLayer" : astarte.ffon(this, ["map"]).getDataLayer("routes")});
		this._sections[id] = section;
	},
	
	// -----------------------------------------------------------------
	addRoute: function(name, desc, sections){
		var sectionsToSend = [];
		
		for(var i = 0; i < sections.length; i++){
			sectionsToSend.push(this._sections[sections[i]]);
		}
		this.fireEvent("route_added", {
			"name" : name,
			"desc" : desc,
			"sections" : sectionsToSend});
	},
	
	// -----------------------------------------------------------------
	getSourceCount: function(){
		var count = 0;
		for(var deviceMac in this._sources){
			count++;
		}
		return count;
	},
	
	// -----------------------------------------------------------------
	addSource: function(deviceMac, userType){
		
		// Don't overwrite any existing source with the same deviceMac
		if(this._sources[deviceMac]){
			return;
		}
		
		this._sources[deviceMac] = new astarte.Source(deviceMac, userType, {
			"broker" : this,
		}, {});
		
		this.fireEvent("source_added", {
			"deviceMac" : deviceMac,
			"userType" : userType,
		});
		
		return this._sources[deviceMac];
	},
	
	// -----------------------------------------------------------------
	addLocation: function(deviceMac, obj){
		
		// Verifying variables
		if(!this._sources[deviceMac] || !obj.lat || !obj.lng || !obj.timeInformation){
			return;
		}
		
		this._sources[deviceMac].addLocation(obj);
		
		this.fireEvent("location_added", $.extend(obj, {"deviceMac" : deviceMac}));
		
		var timeline = astarte.ffon(this, ["map", "timeline"]);
		
		for(var timeType in obj.timeInformation){
			timeline.setMinIfLower(timeType, obj.timeInformation[timeType]);
			timeline.setMaxIfHigher(timeType, obj.timeInformation[timeType]);
		}
		
		return this;
	},
	
	// -----------------------------------------------------------------
	getSources: function(){
		return this._sources;
	},
	
	// -----------------------------------------------------------------
	getSource: function(deviceMac){
		return this._sources[deviceMac];
	},
	
});