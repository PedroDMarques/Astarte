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
	
		console.log(markers);
		this._title.html("Cluster Information");
		
		this._bodySegments.html("");
		var selectionList = $("<div class='ui celled selection list'></div>").appendTo(this._bodySegments);
		
		var counter = {};
		for(var i = 0; i < markers.length; i++){
			var marker = markers[i];
			if(!counter[marker.deviceMac]){
				var broker = astarte.ffon(this, ["map", "broker"]);
				counter[marker.deviceMac] = {
					"userType" : broker.getSource(marker.deviceMac).getUserType(),
					"count" : 1,
				};
			}else{
				counter[marker.deviceMac]["count"]++;
			}
		}
		
		for(var deviceMac in counter){
			$("<div class='item'><div class='content'><div class='header'>" + deviceMac + "</div>" + counter[deviceMac]["userType"] + "<div class='right floated content'><span class='badge'>" + counter[deviceMac]["count"] + "</div></div></div></div>").appendTo(selectionList);
		}
		
		this._open();
		return this;
		
	}
	
});