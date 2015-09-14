astarte.Route = L.Class.extend({
  
  initialize: function Route(name, desc, sections) {
    this.name = name;
    this.desc = desc;
    this.sections = sections;
  
    this.isSelected = false;
    this.marker1;
    this.marker2;
  },

  getRisks: function() {
    var risks = [];
    var distance = 0;
    for (var i = 0; i < this.sections.length; ++i) {
      var section = this.sections[i];
      for (var j = 0; j < section.risks.length; ++j) {
        var sectionDistance = section.getDistance();
        if (risks[j] === undefined)
          risks[j] = section.risks[j] * sectionDistance;
        else
          risks[j] += section.risks[j] * sectionDistance;
      }
      distance += sectionDistance;
    }

    for (var i = 0; i < risks.length; ++i) {
      risks[i] /= distance;
    }
    return risks;
  },

  getDistance: function() {
    var distance = 0;
    for (var i = 0; i < this.sections.length; ++i) {
      distance += this.sections[i].getDistance();
    }

    return distance;
  },

  isOpen: function() {
    for (var i = 0; i < this.sections.length; ++i) {
      if (!this.sections[i].isOpen)
        return false;
    }
    return true;
  },

  hide: function() {
    this.marker1.setMap(undefined);
    this.marker2.setMap(undefined);
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].hide();
    }
  },

  show: function() {
    this.marker1.setMap(map);
    this.marker2.setMap(map);
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].show();
    }
  },

  draw: function() {
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].draw(this);

      if (this.marker1 === undefined || this.marker2 === undefined) {
        var startCount = 0;
        var endCount = 0;

        for (var j = 0; j < this.sections.length; ++j) {
          if (this.sections[j].start.equals(this.sections[i].start) ||
            this.sections[j].end.equals(this.sections[i].start))
            ++startCount;
          if (this.sections[j].start.equals(this.sections[i].end) ||
            this.sections[j].end.equals(this.sections[i].end))
            ++endCount;
        }

        if (startCount === 1) { //itself counts
          if (this.marker1 === undefined)
            this.marker1 = createRouteMarker(this.sections[i].start);
          else
            this.marker2 = createRouteMarker(this.sections[i].start);
        }
        if (endCount === 1) { //itself counts
          if (this.marker1 === undefined)
            this.marker1 = createRouteMarker(this.sections[i].end);
          else
            this.marker2 = createRouteMarker(this.sections[i].end);
        }
      }
    }

    function createRouteMarker(point) {
      return new L.Marker(point, {
        title: astarte.util.prettyCoords(point),
        /*icon: {
          url: "res/route-marker.png",
          size: new google.maps.Size(16, 16),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(8, 8)
        }*/
      });
    }
  },

  erase: function() {
    this.unselect();
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].erase(this);
    }
  },

  select: function() {
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].select();
    }
    this.isSelected = true;

    this.showRoutePresentation(this);
  },

  unselect: function() {
    if (this.isSelected) {
      for (var i = 0; i < this.sections.length; ++i) {
        this.sections[i].unselect();
      }
      this.isSelected = false;
      this.unhighlight();
    }
  },

  highlight: function() {
    for (var i = 0; i < this.sections.length; ++i) {
      this.sections[i].highlight(this);
    }
    this.marker1.setMap(map);
    this.marker2.setMap(map);
  },

  unhighlight: function() {
    if (!this.isSelected) {
      for (var i = 0; i < this.sections.length; ++i) {
        this.sections[i].unhighlight();
      }
      this.marker1.setMap(undefined);
      this.marker2.setMap(undefined);
    }
  }
});