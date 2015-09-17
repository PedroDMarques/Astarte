/*global astarte*/
/*global L*/
/*global $*/

astarte.Timeline = astarte.Class.extend({

	// -----------------------------------------------------------------
	options: {
		"timeline" : null,
		"timeline_display" : null,
		"range" : null,
		"range_display_min" : null,
		"range_display_max" : null,
		"time_input" : null,
		"stop_btn" : null,
		"play_btn" : null,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._timeline = $("#" + this.options["timeline"]);
		this._timelineDisplay = $("#" + this.options["timeline_display"]);
		this._range = $("#" + this.options["range"]);
		this._rangeDisplayMin = $("#" + this.options["range_display_min"]);
		this._rangeDisplayMax = $("#" + this.options["range_display_max"]);
		this._timeInput = $("#" + this.options["time_input"]);
		this._stopBtn = $("#" + this.options["stop_btn"]);
		this._playBtn = $("#" + this.options["play_btn"]);
	
		this._timeMinMax = {
			"genTime" : {
				"min" : "0",
				"max" : "9999",
			},
			"recTime" : {
				"min" : "0",
				"max" : "9999",
			},
			"coordTime" : {
				"min" : "0",
				"max" : "9999",
			}
		}
		
		this._selectedTimeType = "genTime";
		
		this._curMin = "0";
		this._curMax = "9999";
	
		this._curTime = "9999";
	
		this._animationInterval = null;
		this._animationTimeout = null;
	
		this._timeline.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 1000,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : false,
			"step" : 1,
			"value" : 1000,
			
			"slide" : this._updateTimeline.bind(this),
			"change" : this._updateTimeline.bind(this),
			
		});
		
		this._range.slider({
			"animate" : false,
			"disabled" : false,
			"max" : 1000,
			"min" : 0,
			"orientation" : "horizontal",
			"range" : true,
			"step" : 1,
			"values" : [0, 1000],
			
			"slide" : this._updateRange.bind(this),
			"change" : this._updateRange.bind(this),
			
		});
		
		this._playBtn.on("click", this._play.bind(this));
		this._stopBtn.on("click", this._stop.bind(this));
		
		return this;
	},
	
	// -----------------------------------------------------------------
	_updateTimeline: function(event){
		if(event){
			if(event.type === "slide"){
				this._stop();
			}
		}
		var min = this._timeMinMax[this._selectedTimeType].min;
		var max = this._timeMinMax[this._selectedTimeType].max;
		var interval = max - min;
		var curTime = min + (interval * this._timeline.slider("value") / 1000);
		this._curTime = astarte.util.dateToString(new Date(curTime));
		this._timelineDisplay.html(astarte.util.displayDate(this._curTime));
		var map = astarte.ffon(this, ["map"]);
		map.redraw(this._curTime);
	},
	
	// -----------------------------------------------------------------
	_updateRange: function(event){
		if(event){
			if(event.type === "slide"){
				this._stop();
			}
		}
		var min = this._timeMinMax[this._selectedTimeType].min;
		var max = this._timeMinMax[this._selectedTimeType].max;
		var interval = max - min;
		var minTime = min + (interval * this._range.slider("values", 0) / 1000);
		var maxTime = min + (interval * this._range.slider("values", 1) / 1000);
		this._curMin = astarte.util.dateToString(new Date(minTime));
		this._curMax = astarte.util.dateToString(new Date(maxTime));
		this._rangeDisplayMin.html(astarte.util.displayDate(this._curMin));
		this._rangeDisplayMax.html(astarte.util.displayDate(this._curMax));
	},
	
	// -----------------------------------------------------------------
	_stop: function(){
		if(this._animationInterval){
			clearInterval(this._animationInterval);
			clearTimeout(this._animationTimeout);
			this._animationInterval = null;
			this._animationTimeout = null;
		}
	},
	
	// -----------------------------------------------------------------
	_play: function(){
		
		this._stop();
		var delay = parseInt(this._timeInput.val()) || 10;
		
		var valInterval = this._range.slider("values", 1) - this._range.slider("values", 0);
		
		var step = valInterval / (delay * 10);
		this._timeline.slider("value", this._range.slider("values", 0));
		
		this._animationInterval = setInterval((function(){
			var curVal = this._timeline.slider("value");
			var rangeMax = this._range.slider("values", 1);
			if(curVal >= rangeMax){
				this._timeline.slider("value", rangeMax);
			}else{
				this._timeline.slider("value", curVal + step);	
			}
		}).bind(this), 100);
		
		this._animationTimeout = setTimeout((function(){
			this._timeline.slider("value", this._range.slider("values", 1));
			this._stop();
		}).bind(this), (delay * 1000) + 100);
	},
	
	// -----------------------------------------------------------------
	setMin: function(timeType, min){
		if(this._timeMinMax[timeType]){
			this._timeMinMax[timeType].min = new Date(min).getTime();
			this._curMin = this._timeMinMax[timeType].min;
			this._curMax = this._timeMinMax[timeType].max;
		}
		if(timeType === this._selectedTimeType){
			this._updateTimeline();
			this._updateRange();
		}
	},
	
	// -----------------------------------------------------------------
	setMax: function(timeType, max){
		if(this._timeMinMax[timeType]){
			this._timeMinMax[timeType].max = new Date(max).getTime();
		}
		if(timeType === this._selectedTimeType){
			this._updateTimeline();
			this._updateRange();
		}
	},
	
	selectTimeType: function(timeType){
		if(this._timeMinMax[timeType]){
			this._selectedTimeType = timeType;
			this._updateTimeline();
			this._updateRange();
		}
	},
	
	// -----------------------------------------------------------------
	setMinIfLower: function(timeType, min){
		if(this._timeMinMax[timeType]){
			var date = astarte.util.dateToString(new Date(this._timeMinMax[timeType].min));
			if(min < date){
				this.setMax(timeType, min);
			}
		}
	},
	
	// -----------------------------------------------------------------
	setMaxIfHigher: function(timeType, max){
		if(this._timeMinMax[timeType]){
			var date = astarte.util.dateToString(new Date(this._timeMinMax[timeType].max));
			if(max > date){
				this.setMax(timeType, max);
			}
		}
	},
	
	// -----------------------------------------------------------------
	getTimeTypeMin: function(timeType){
		if(this._timeMinMax[timeType]){
			return this._timeMinMax[timeType].min;
		}
	},
	
	// -----------------------------------------------------------------
	getTimeTypeMax: function(timeType){
		if(this._timeMinMax[timeType]){
			return this._timeMinMax[timeType].max;
		}
	},
	
	// -----------------------------------------------------------------
	getCurSelectedTimeType: function(){
		return this._selectedTimeType;
	},
	
	// -----------------------------------------------------------------
	getCurTime: function(){
		return this._curTime;	
	},
	
});