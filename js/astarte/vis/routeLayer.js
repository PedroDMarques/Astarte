/*global astarte*/
/*global L*/

astarte.RouteLayer = astarte.DataLayer.extend({
	
	// -----------------------------------------------------------------
	options: {
	},
	
	// -----------------------------------------------------------------
	objNet: {
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.DataLayer.prototype.initialize.call(this, objNet, options);
		
		this.routes = {};
		
		var broker = astarte.ffon(this, ["map", "broker"]);
		broker.addEventListener("route_added", this.addRoute, this);
	},
	
	addRoute: function(event){
		console.log("addRoute");
		this.routes[event.name] = new astarte.Route(event.name, event.desc, event.sections);
	},
	
	redraw: function(curTime){
		for(var name in this.routes){
			var route = this.routes[name];
			route.draw();
		}
	},
	
});