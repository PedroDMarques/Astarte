/*global astarte*/
/*global L*/
/*global $*/

astarte.MenuSegment = L.Class.extend({
	
	// -----------------------------------------------------------------
	options:{
		"segment_id" : null,
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		
		this._container = $("#" + this.options["segment_id"]);
		this._header = this._container.find(".segment-header");
		this._title = this._header.find(".content");
		this._icon = this._header.find("icon");
		this._body = this._container.find(".segment-body");
		this._bodySegments = this._body.find(".ui.segments");
		
		this._message = $("<div class='ui bottom attached warning message'></div>").appendTo(this._container.children()[0]);
		this._message.css("display", "none");
		
		this._header.on("click", this.toggle.bind(this));
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setMessage: function(text){
		this._message.html(text);
		this._message.css("display", "block");
		return this;
	},
	
	// -----------------------------------------------------------------
	hideMessage: function(){
		this._message.css("display", "none");
		return this;
	},
	
	// -----------------------------------------------------------------
	_open: function(){
		this._body.css("display", "block");
		return this;
	},
	
	// -----------------------------------------------------------------
	_close: function(){
		this._body.css("display", "none");
		return this;
	},
	
	// -----------------------------------------------------------------
	toggle: function(){
		if(this._body.css("display") === "none"){
			this._open();
		}else{
			this._close();
		}
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