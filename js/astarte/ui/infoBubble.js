/*global astarte*/
/*global L*/

astarte.InfoBubble = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(DOMid, options){
		this.setOptions(options);
		
		this._DOMele = $("#" + DOMid);
		
		this._DOMele.on("click", function(){
			$(this).css("display", "none");
		});
		
		return this;
	},
	
	// -----------------------------------------------------------------
	setOptions: function(options){
		L.setOptions(this, options);
		return this;
	},
	
	// -----------------------------------------------------------------
	setContent: function(deviceMac, properties){
		var DOMContent = "<h3>"+deviceMac+"</h3><hr>";
		for(var prop in properties){
			DOMContent += "<b>"+prop+": </b>"+properties[prop]+"<br>";
		}
		this._DOMele.html(DOMContent);
		this._DOMele.css("display", "block");
		return this;
	},
	
	// -----------------------------------------------------------------
	toggle: function(){
		if(this._DOMele.css("display") === "none"){
			this._DOMele.css("display", "block");
		}else{
			this._DOMele.css("display", "none");
		}
		return this;
	}
	
});