/*global astarte*/
/*global L*/
/*global $*/

astarte.InfoBee = astarte.MenuComponent.extend({
	
	// -----------------------------------------------------------------
	options: {
		"default_icon" : "users",
		"default_title" : "Contextual Information",
		"default_sub_title" : "",
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(container, objNet, options){
		astarte.MenuComponent.prototype.initialize.call(this, container, objNet, options);
		
		this._currentMarker = null;
		this._lastClusterInformation = null;
		this._orderClusterBy = "genTime";
		
		return this;
	},
	
	// -----------------------------------------------------------------
	panToMarker: function(marker){
		marker = marker || this._currentMarker;
		if(!marker){
			return this;
		}
		var map = astarte.ffon(this, ["map"]);
		map.panTo(marker.getLatLng());
		return this;
	},

	// -----------------------------------------------------------------
	focusOnMarker: function(marker){
		marker = marker || this._currentMarker;
		if(!marker){
			return this;
		}
		var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
		markerLayer.panZoomToMarker(marker);
		return this;
	},
	
	// -----------------------------------------------------------------
	setMarkerInformation: function(marker){
	
		this._clearBody();
		
		var broker = astarte.ffon(this, ["broker"]);
		
		this._setLoading("Gathering Information...");
		
		this._currentMarker = marker;
		var deviceMac = marker.deviceMac;
		var lat = marker.getLatLng().lat;
		var lng = marker.getLatLng().lng;
		var genTime = marker.genTime;
		var userType = broker.getSource(deviceMac).getUserType();
		
		var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
		
		var locData = broker.getSource(deviceMac).getLocationData(genTime);
		
		this._setLoading("Drawing...");
		
		this.setHeader("marker", deviceMac, userType);
		
		$("<h3></h3>", {
			"class" : "ui header",
			"text" : "Basic Information:",
		}).appendTo(this._bodySpecifics);
		
		// Basic List
		
		var basicList = $("<div></div>", {
			"class" : "ui celled selection list",
		}).appendTo(this._bodySpecifics);
		
		// Lat
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(basicList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Latitude:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : lat,
		}).appendTo(header);
		
		// Lng
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(basicList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Longitude:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : lng,
		}).appendTo(header);
		
		// Gen time
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(basicList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Generation Time:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : astarte.util.displayDate(genTime),
		}).appendTo(header);
		
		// Previous/Next buttons
		
		var btnGroup = $("<div></div>", {
			"class" : "four ui icon buttons",
		}).appendTo(this._bodySpecifics);
		
		var firstBtn = $("<button></button>", {
			"class" : "ui icon button",
		}).appendTo(btnGroup);
		$("<i class='step backward icon'></i>").appendTo(firstBtn);
		
		var previousBtn = $("<button></button>", {
			"class" : "ui icon button",
		}).appendTo(btnGroup);
		$("<i class='left chevron icon'></i>").appendTo(previousBtn);
		
		var nextBtn = $("<button></button>", {
			"class" : "ui icon button",
		}).appendTo(btnGroup);
		$("<i class='right chevron icon'></i>").appendTo(nextBtn);
		
		var lastBtn = $("<button></button>", {
			"class" : "ui icon button",
		}).appendTo(btnGroup);
		$("<i class='step forward icon'></i>").appendTo(lastBtn);
		
		var previousMarker = markerLayer.getPreviousMarker(marker);
		var nextMarker = markerLayer.getNextMarker(marker);
		
		if(!previousMarker){
			firstBtn.addClass("disabled");
			previousBtn.addClass("disabled");
		}else{
			firstBtn.on("click", (function(){
				var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
				markerLayer.highlightDevice(markerLayer.getFirstMarker(marker));
			}).bind(this));
			previousBtn.on("click", (function(){
				var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
				markerLayer.highlightDevice(previousMarker);
			}).bind(this));
		}
		
		if(!nextMarker){
			nextBtn.addClass("disabled");
			lastBtn.addClass("disabled");
		}else{
			nextBtn.on("click", (function(){
				var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
				markerLayer.highlightDevice(nextMarker);
			}).bind(this));
			lastBtn.on("click", (function(){
				var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
				markerLayer.highlightDevice(markerLayer.getLastMarker(marker));
			}).bind(this));
		}
		
		$("<h3></h3>", {
			"class" : "ui header",
			"text" : "Data Sent:",
		}).appendTo(this._bodySpecifics);
		
		// Data sent List
		
		var dataList = $("<div></div>", {
			"class" : "ui celled selection list",
		}).appendTo(this._bodySpecifics);
		
		// heartbeat
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(dataList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Heartbeat:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : locData["heartbeat"],
		}).appendTo(header);
		
		// battery
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(dataList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Battery:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : locData["battery"],
		}).appendTo(header);
		
		// movements
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(dataList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Movements:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : locData["movements"],
		}).appendTo(header);
		
		// screen
		var item = $("<div></div>", {
			"class" : "item",
		}).appendTo(dataList);
		
		var header = $("<div></div>", {
			"class" : "header",
			"text" : "Screen:",
		}).appendTo(item);
		
		$("<div></div>", {
			"class" : "right floated content",
			"text" : locData["screen"],
		}).appendTo(header);
		
		// Control buttons
		
		var buttonGrp = $("<div></div>", {
			"class" : "three ui buttons",
		}).appendTo(this._bodySpecifics);
		
		var focusBtn = $("<button></button>", {
			"type" : "button",
			"class" : "ui button",
			"text" : "Focus",
			"on" : {
				"click" : (function(){
					focusBtn.blur();
					this.focusOnMarker();
				}).bind(this),
			} 
		}).appendTo(buttonGrp);
		
		var panBtn = $("<button></button>", {
			"type" : "button",
			"class" : "ui button",
			"text" : "Pan",
			"on" : {
				"click" : (function(){
					panBtn.blur();
					this.panToMarker();
				}).bind(this),
			} 
		}).appendTo(buttonGrp);
		
		var historyBtn = $("<button></button>", {
			"type" : "button",
			"class" : "ui button",
			"text" : "History",
			"on" : {
				"click" : (function(){
					var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
					markerLayer.toggleDrawConnections();
					historyBtn.toggleClass("active");
					historyBtn.blur();
				}).bind(this),
			} 
		}).appendTo(buttonGrp);
		
		if(markerLayer.options["draw_all_markers_from_highlighted"]){
			historyBtn.addClass("active");
		}
		
		$("<div></div>", {
			"class" : "ui divider",
		}).appendTo(this._bodySpecifics);
		
		// Direction buttons
		
		var buttonGrp = $("<div></div>", {
			"class" : "two ui buttons",
		}).appendTo(this._bodySpecifics);
		
		var backBtn = $("<button></button>", {
			"type" : "button",
			"class" : "ui button",
			"text" : "Back",
			"on" : {
				"click" : (function(){
					this.setClusterInformation(this._lastClusterInformation);
				}).bind(this),
			} 
		}).appendTo(buttonGrp);
		
		var closeBtn = $("<button></button>", {
			"type" : "button",
			"class" : "ui button",
			"text" : "Close",
			"on" : {
				"click" : (function(){
					var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
					markerLayer.removeHighlight();
					this.setDefaults();
				}).bind(this),
			} 
		}).appendTo(buttonGrp);
		
		this._stopLoading();
		this.open();
		
	},
	
	// -----------------------------------------------------------------
	setClusterInformation: function(markers){
		
		if(!markers){
			this.setDefaults();
			astarte.ffon(this, ["map"]).getDataLayer("markers").removeHighlight();
			return this;
		}
		
		this._clearBody();
		
		this._setLoading("Gathering Markers...");
		
		this._lastClusterInformation = markers;
		
		var broker = astarte.ffon(this, ["broker"]);
		var defaultText;
		
		this._setLoading("Sorting Markers...");
		
		switch(this._orderClusterBy){
			case "genTime":
				markers.sort(function(a, b){
					return a.genTime > b.genTime ? -1 : 1;
				});
				defaultText = "Generation Time";
				break;
			case "heartbeat":
				markers.sort(function(a, b){
					var ad = broker.getSource(a.deviceMac).getLocationData(a.genTime);
					var bd = broker.getSource(b.deviceMac).getLocationData(b.genTime);
					return parseInt(ad["heartbeat"]) > parseInt(bd["heartbeat"]) ? -1 : 1;
				});
				defaultText = "Heartbeat";
				break;
			case "battery":
				markers.sort(function(a, b){
					var ad = broker.getSource(a.deviceMac).getLocationData(a.genTime);
					var bd = broker.getSource(b.deviceMac).getLocationData(b.genTime);
					return parseInt(ad["battery"]) > parseInt(bd["battery"]) ? -1 : 1;
				});
				defaultText = "Battery";
				break;
			case "movements":
				markers.sort(function(a, b){
					var ad = broker.getSource(a.deviceMac).getLocationData(a.genTime);
					var bd = broker.getSource(b.deviceMac).getLocationData(b.genTime);
					return parseInt(ad["movements"]) > parseInt(bd["movements"]) ? -1 : 1;
				});
				defaultText = "Movements";
				break;
			case "screen":
				markers.sort(function(a, b){
					var ad = broker.getSource(a.deviceMac).getLocationData(a.genTime);
					var bd = broker.getSource(b.deviceMac).getLocationData(b.genTime);
					return parseInt(ad["screen"]) > parseInt(bd["screen"]) ? -1 : 1;
				});
				defaultText = "Screen";
				break;
		}
		
		this._setLoading("Drawing...");
		
		this.setHeader("users", "Cluster Information");
		
		var orderBtn = $("<div></div>", {
			"class" : "ui fluid selection dropdown",
			"id" : "marker-cluster-filter-dropdown",
		});
		
		orderBtn.appendTo(this._bodySpecifics);
		
		// Order Button
		orderBtn.on("change", (function(event){
			this._orderClusterBy = event.target.defaultValue;
			this.setClusterInformation(this._lastClusterInformation);
		}).bind(this));
		
		$("<input></input>", {
			"type" : "hidden",
		}).appendTo(orderBtn);
		
		$("<i></i>", {
			"class" : "dropdown icon",
		}).appendTo(orderBtn);
		
		$("<div></div>", {
			"class" : "text",
			"text" : defaultText,
		}).appendTo(orderBtn);
		
		var orderMenu = $("<div></div>", {
			"class" : "menu",
		}).appendTo(orderBtn);
		
		$("<div></div>", {
			"class" : "divider",
		}).appendTo(orderMenu);
		
		$("<div></div>", {
			"class" : "item",
			"data-value" : "genTime",
			"data-text" : "Generation Time",
			"text" : "Generation Time",
		}).appendTo(orderMenu);
		
		$("<div></div>", {
			"class" : "item",
			"data-value" : "heartbeat",
			"data-text" : "Heartbeat",
			"text" : "Heartbeat",
		}).appendTo(orderMenu);
		
		$("<div></div>", {
			"class" : "item",
			"data-value" : "battery",
			"data-text" : "Battery",
			"text" : "Battery",
		}).appendTo(orderMenu);
		
		$("<div></div>", {
			"class" : "item",
			"data-value" : "movements",
			"data-text" : "Movements",
			"text" : "Movements",
		}).appendTo(orderMenu);
		
		$("<div></div>", {
			"class" : "item",
			"data-value" : "screen",
			"data-text" : "Screen",
			"text" : "Screen",
		}).appendTo(orderMenu);
		
		orderBtn.dropdown();
		
		
		// Selection list (markers)
		
		var selectionList = $("<div></div>", {
			"class" : "ui celled selection list marker-cluster-list",
		}).appendTo(this._bodySpecifics);
		
		for(var i = 0; i < markers.length; i++){
			var marker = markers[i];
			var deviceMac = marker.deviceMac;
			var genTime = marker.genTime;
			var color = marker.color;
			var userType = broker.getSource(deviceMac).getUserType();
		
			(function(sl, obj){
			
				var item = $("<div></div>", {
					"class" : "item",
				}).appendTo(selectionList);
				
				$("<i></i>", {
					"class" : "big marker icon",
				}).appendTo(item);
				
				var content = $("<div></div>", {
					"class" : "content",
				}).appendTo(item);
				
				$("<div></div>", {
					"class" : "header",
					"text" : obj["deviceMac"],
				}).appendTo(content);
				
				$("<div></div>", {
					"class" : "description",
					"text" : obj["userType"] + " / " + astarte.util.displayDate(obj["genTime"]),
				}).appendTo(content);
				
				item.css("padding-left", "initial");
				
				item.hover(function(){
					$(this).css("background-color", obj["color"]);
					$(this).css("padding-left", "10px");
				}, function(){
					$(this).css("background-color", "transparent");
					$(this).css("padding-left", "initial");
				});
				
				item.on("click", (function(){
					obj["markerLayer"].highlightDevice(obj["marker"]);
					this.focusOnMarker(obj["marker"]);
				}).bind(this));
			
			}).bind(this)(selectionList, {
				"marker" : marker,
				"deviceMac" : deviceMac,
				"genTime" : genTime,
				"userType" : userType,
				"color" : color,
				"markerLayer" : astarte.ffon(this, ["map"]).getDataLayer("markers"),
			});
	
		}
		
		// Control Buttons
		
		var closeBtn = $("<button></button>", {
			"class" : "ui fluid button",
			"text" : "Close",
			"on" : {
				"click" : (function(){
					var markerLayer = astarte.ffon(this, ["map"]).getDataLayer("markers");
					markerLayer.removeHighlight();
					this.setDefaults();
				}).bind(this),
			}
		}).appendTo(this._bodySpecifics);
		
		this._stopLoading();
		this.open();
		
	}
	
});