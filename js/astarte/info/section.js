/*global astarte*/
/*global L*/
/*global $*/

astarte.Section = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet : {
		"routeLayer" : null,
	},
  	
	// -----------------------------------------------------------------
  	initialize: function (id, start, end, isOpen, risks) {
		this.id = id;
		this.start = start;
		this.end = end;
		this.isOpen = isOpen;
		this.risks = risks;
		this.line;
		this.color;
		this.oldColor;
		
		this.trueColor;
		this.associatedRoute;
		this.otherRoutes = [];
	
	},

  getDistance: function() {
    return astarte.util.geographicDistance(this.start, this.end);
  },


  hide: function() {
    this.line.setMap(undefined);
  },

  show: function() {
    this.line.setMap(undefined);
  },

  draw: function(parentRoute) {
    if (this.associatedRoute === undefined || parentRoute.sections.length < this.associatedRoute.sections.length) {
      if (this.associatedRoute !== undefined) {
        google.maps.event.clearListeners(this.line);
        this.line.setMap(null);
        this.otherRoutes.push(this.associatedRoute);
      }

      this.updateLineColor(parentRoute);
      this.trueColor = this.color;
      if (this.isOpen) {
        /*line = new google.maps.Polyline({
            strokeWeight: 5,
            strokeColor: color,
            map: map
        });*/

        
        this.line = new L.Polyline([this.start, this.end], {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
        });
        this.objNet["routeLayer"].addLayer(this.line);

      } else {

        /*
                line = new google.maps.Polyline({
                  strokeColor: color,
                  zIndex: this.id,
                  map: map,
                });
                line.setOptions(getDashedLineOptions(5));
                
        */

        this.line = new L.Polyline([this.start, this.end], {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1,
          dashArray: 5

        });
        this.objNet["routeLayer"].addLayer(this.line);
      }

      this.associatedRoute = parentRoute;
    } else {
      this.otherRoutes.push(parentRoute);
    }
  },

  erase: function(parentRoute) {
    if (parentRoute === this.associatedRoute) {
      this.associatedRoute = undefined;
      google.maps.event.clearListeners(this.line);
      this.line.setMap(undefined);
      if (this.otherRoutes.length > 0) {
        var min = 0;
        for (var i = 1; i < this.otherRoutes.length; ++i) {
          if (this.otherRoutes[i].sections.length < this.otherRoutes[min].sections.length)
            min = i;
        }
        var route = this.otherRoutes.splice(min, 1)[0];
        this.draw(route);
      }
    } else {
      this.otherRoutes.splice(this.otherRoutes.indexOf(parentRoute), 1);
    }
  },

  select: function() {
    this.line.setOptions({
      strokeColor: "blue"
    });
  },

  unselect: function() {
    this.line.setOptions({
      strokeColor: this.color
    });
  },

  highlight: function(parentRoute) {
    this.updateLineColor(parentRoute);
    this.line.setOptions({
      strokeColor: this.color,
      zIndex: google.maps.Marker.MAX_ZINDEX + 1
    });

    if (this.isOpen)
      this.line.setOptions({
        strokeWeight: 10
      });
    else
      this.line.setOptions(this.getDashedLineOptions(10));
  },

  unhighlight: function() {
    if (this.isOpen)
      this.line.setOptions({
        strokeWeight: 5,
        zIndex: this.id
      });
    else
      this.line.setOptions(this.getDashedLineOptions(5));
    this.line.setOptions({
      strokeColor: this.trueColor
    });
  },

  getDashedLineOptions: function(strokeWeight) {
    return {
      strokeOpacity: 0.0,
      icons: [{
        icon: {
          path: "M 0,-1 0,0",
          strokeOpacity: 1,
          scale: strokeWeight
        },
        offset: "0",
        repeat: "20px"
      }]
    };
  },

  updateLineColor: function (parentRoute) {
    var risks = parentRoute.getRisks();
    var totalRisk = 0;
    for (var i = 0; i < risks.length; ++i) {
      totalRisk += Number(risks[i]);
    }
    totalRisk /= (risks.length * 100);

    var riskColor = (Math.round(totalRisk * 221) + 34).toString(16);
    if (riskColor.length < 2) riskColor = "0" + riskColor;
    this.color = "#" + riskColor + "2222";
  }
  
});