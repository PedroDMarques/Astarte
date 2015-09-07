/*global astarte*/
/*global L*/
/*global $*/

astarte.InfoB = astarte.MenuSegment.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.MenuSegment.prototype.initialize.call(this, objNet, options);
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setClusterInformation: function(markers){
		
		markers.sort(function(a,b){
			return a.genTime < b.genTime ? -1 : 1;
		});
		
		this._title.html("Cluster Information");
		
		this._bodySegments.html("");
		var selectionList = $("<div class='ui celled selection list'></div>").appendTo(this._bodySegments);
		
		var broker = astarte.ffon(this, ["map", "broker"]);
		
		for(var i = 0; i < markers.length; i++){
			
			var marker = markers[i];
			
			(function(sl, obj){
				
				var item = $("<div class='item'><div class='content'><div class='header'>" + obj["deviceMac"] + "</div>" + obj["userType"] + " / " + obj["genTime"] + "</div></div></div>").appendTo(sl);
				
				item.hover(function(){
					$(this).css("background-color", obj["color"]);
				}, function(){
					$(this).css("background-color", "transparent");
				});
				
				item.on("click", function(){
					obj["marker"].fire("click");
				});
				
			})(selectionList, {
				"marker" : marker,
				"deviceMac" : marker.deviceMac,
				"userType" : broker.getSource(marker.deviceMac).getUserType(),
				"genTime" : marker.genTime,
				"color" : marker.color,
			});
									
		}
		
		this._open();
		return this;
		
	},
	
	// -----------------------------------------------------------------
	setMarkerInformation: function(marker){
		
		var deviceMac = marker.deviceMac;
		var genTime = marker.genTime;
		var lat = marker.getLatLng().lat;
		var lng = marker.getLatLng().lng;
	
		this._title.html("Marker Information");
		this._bodySegments.html("");
		
		var selectionList = $("<div class='ui celled selection list'></div>").appendTo(this._bodySegments);
		
		var broker = astarte.ffon(this, ["map", "broker"]);
		var source = broker.getSource(deviceMac);
		var locationData = source.getLocationData(genTime);
		
		$("<div class='item'><div class='header'><div class='ui left floated content'>Device Mac:</div><div class='ui right floated content'>" + deviceMac + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Latitude:</div><div class='ui right floated content'>" + lat + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Longitude:</div><div class='ui right floated content'>" + lng + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Generation Time:</div><div class='ui right floated content'>" + genTime + "</div></div></div>").appendTo(selectionList);
		
		$("<div class='item'><div class='divider'></div></div>").appendTo(selectionList);
		
		$("<div class='item'><div class='header'><div class='ui left floated content'>Heartbeat:</div><div class='ui right floated content'>" + locationData["heartbeat"] + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Battery:</div><div class='ui right floated content'>" + locationData["battery"] + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Movements:</div><div class='ui right floated content'>" + locationData["movements"] + "</div></div></div>").appendTo(selectionList);
		$("<div class='item'><div class='header'><div class='ui left floated content'>Screen:</div><div class='ui right floated content'>" + locationData["screen"] + "</div></div></div>").appendTo(selectionList);
		
		var buttonGroup = $("<div class='ui fluid buttons'></div>").appendTo(selectionList);
		
		var map = astarte.ffon(this, ["map"]);
		var markerLayer = map.getDataLayer("markers");
		
		var focusBtn = $("<div class='ui button'>Focus</div>").appendTo(buttonGroup);
		focusBtn.on("click", function(){
			markerLayer.panZoomToMarker(marker);
		});
		
		var panBtn = $("<div class='ui button'>Pan</div>").appendTo(buttonGroup);
		panBtn.on("click", function(){
			map.panTo(marker.getLatLng());
		});
		
		var deselectBtn = $("<div class='ui button'>Deselect</div>").appendTo(buttonGroup);
		
		this._open();
		return this;
		
	},
	
});