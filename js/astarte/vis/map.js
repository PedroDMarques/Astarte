/*global astarte*/
/*global L*/

// API key to use mapbox tiles. Will be changed later to specify when initializing the map
L.mapbox.accessToken = "pk.eyJ1IjoiZGFsYW5uYXIiLCJhIjoiYjA0MTcyZDMyNzg2YWNjYTA3ZGE1MGMxMDI5ZWMyYjgifQ.25SjWDdKObbZvLpuGwZM4A";


astarte.Map = L.mapbox.Map.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"broker" : null,
		"timeline" : null,
		"filter" : null,
		"infoB" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, mapId, objNet, options){
		L.mapbox.Map.prototype.initialize.call(this, DOMid, mapId, options);
		this.setObjNet(objNet)
		this._dataLayers = {};
		this._setupContextMenu();
		this.on("zoomend", function(event){console.log("current zoom = " + event.target._zoom);}, this);
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	addDataLayer: function(name, layer){
		
		// Don't overwrite any existing layer with the same name
		if(!this._dataLayers[name]){
			this._dataLayers[name] = layer;
			// Add the layer by default
			this.addLayer(layer);
		}
		
		return this;
		
	},
	
	// -----------------------------------------------------------------
	toggleDataLayer: function(name){
		this._dataLayers[name].toggle();
		if(this._dataLayers[name].isVisible()){
			var timeline = astarte.ffon(this, ["timeline"]);
			this._dataLayers[name].redraw(timeline.getCurTime());
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	redraw: function(curTime){
		var timeline = astarte.ffon(this, ["timeline"]);
		curTime = curTime || timeline.getCurTime();
		for(var dl in this._dataLayers){
			if(this._dataLayers[dl].isVisible()){
				this._dataLayers[dl].redraw(curTime);
			}
		}
		return this;
	},
	
	//-----------------------------------------------------------------------------
	_setupContextMenu: function(){
		this.contextmenu.addItem({
			"text" : "Redraw map",
			"callback" : function(){
				this.redraw();
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"separator" : true,
		});
		
		this.contextmenu.addItem({
			"text" : "Toggle Markers",
			"callback" : function(){
				this.toggleDataLayer("markers");
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"text" : "Toggle Heatmap",
			"callback" : function(){
				this.toggleDataLayer("heatmap");
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"text" : "Toggle Routes",
			"callback" : function(){
				this.toggleDataLayer("routes");
			},
			"context" : this,
		});
		
		this.contextmenu.addItem({
			"separator" : true,
		});
		
		this.contextmenu.addItem({
			"text" : "Run Generator",
			"callback" : function(){
				var request = new XMLHttpRequest();
				request.onreadystatechange = function(){
					if(request.readyState === 4){
						if(request.status === 200){
							console.log(request.responseText);
						}
					}
				}
				request.open("get", "http://localhost/astarte/index.php/astarte_api/run_generator");
				request.send();
			},
		})
		
	},
	
	//-----------------------------------------------------------------------------
	getDataLayer: function(name){
		return this._dataLayers[name];
	},
	
	// -----------------------------------------------------------------
	setObjNet: function(obj){
		$.extend(this.objNet, obj);
		return this;
	}
	
});