/*global astarte*/
/*global L*/
/*global $*/

astarte.MenuComponent = astarte.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		"start_open" : true,
		"open_animation_time" : 250,
		"default_icon" : "wizard",
		"default_title" : "Component Title Here",
		"default_sub_title" : ""
	},
	
	// -----------------------------------------------------------------
	objNet: {
		"map" : null,
	},
	
	// -----------------------------------------------------------------
	initialize: function(container, objNet, options){
		astarte.Class.prototype.initialize.call(this, objNet, options);
		
		this._container = container;
		this._header = this._container.find(".astarte-menu-component-header");
		this._body = this._container.find(".astarte-menu-component-body");
		this._bodySpecifics = this._body.find(".astarte-menu-component-body-specifics");
		
		this._dimmer = this._container.find(".astarte-menu-component-dimmer");
		this._dimmerText = this._dimmer.find(".loader");
		
		this._title = this._header.find(".main-header");
		this._subTitle = this._header.find(".sub.header");
		this._icon = this._header.find("i");
		
		this._isOpen = true;
		this._isOpening = false;
		
		if(!this.options["start_open"]){
			this.close();
		}
		
		this._header.on("click", this.toggle.bind(this));
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setDefaults: function(){
		this._clearBody();
		this.setHeader(this.options["default_icon"], this.options["default_title"], this.options["default_sub_title"]);
		this.close();
	},
	
	// -----------------------------------------------------------------
	_clearBody: function(){
		this._bodySpecifics.html("");
		return this;
	},
	
	// -----------------------------------------------------------------
	_setLoading: function(text){
		text = text || "Loading...";
		this._dimmerText.html(text);
		this._dimmer.addClass("active");
		return this;
	},
	
	// -----------------------------------------------------------------
	_stopLoading: function(){
		this._dimmer.removeClass("active");
		return this;
	},
	
	// -----------------------------------------------------------------
	setHeader: function(icon, title, subTitle){
		subTitle = subTitle || "";
		this.setTitle(title);
		this.setSubTitle(subTitle);
		this.setIcon(icon);
		return this;
	},
	
	// -----------------------------------------------------------------
	setSubTitle: function(subTitle){
		this._subTitle.html(subTitle);
		return this;
	},
	
	// -----------------------------------------------------------------
	setTitle: function(title){
		this._title.html(title);
		return this;
	},
	
	// -----------------------------------------------------------------
	setIcon: function(icon){
		this._icon.attr("class", icon + " icon");
		return this;
	},
	
	// -----------------------------------------------------------------
	toggle: function(){
		if(this._isOpening){
			return this;
		}
		if(this._isOpen){
			this.close();
		}else{
			this.open();
		}
		return this;
	},
	
	// -----------------------------------------------------------------
	open: function(){
		this._isOpen = true;
		this._isOpening = true;
		this._header.addClass("top attached");
		this._body.css("display", "block");
		this._body.css("height", 0);
		this._body.css("padding-top", 0);
		this._body.css("padding-bottom", 0);
		this._body.animate({
			"height" : this._body.get(0).scrollHeight + 20,
			"padding-top" : "10px",
			"padding-bottom" : "10px",
		}, this.options["open_animation_time"], (function(){
			this._isOpening = false;
		}).bind(this));
	},
	
	// -----------------------------------------------------------------
	close: function(){
		this._isOpen = false;
		this._isOpening = true;
		this._body.animate({
			"height" : "0px",
			"padding-top" : "0px",
			"padding-bottom" : "0px",
		}, this.options["open_animation_time"], (function(){
			this._body.css("display", "none");
			this._header.removeClass("top attached");
			this._isOpening = false;
		}).bind(this));
	},
	
});