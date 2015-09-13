/*global L*/
/*global $*/
/*global jQuery*/

var astarte = {};

astarte.Class = L.Class.extend({
	
	// -----------------------------------------------------------------
	options: {
		
	},
	
	// -----------------------------------------------------------------
	objNet: {
		
	},
	
	// -----------------------------------------------------------------
	initialize: function(objNet, options){
		this.setOptions(options);
		this.setObjNet(objNet);
		return this;
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
	
})

astarte.util = {
	
	// -----------------------------------------------------------------
	findFirstObjNet: function(obj, arr){
		
		for(var i = 0; i < arr.length; i++){
			obj = obj.objNet[arr[i]];
			if(!obj){
				return;
			}
		}
		return obj;
		
	},
	
	// -----------------------------------------------------------------
	lastInArr: function(arr){
		return arr[arr.length - 1];
	},
	
	// -----------------------------------------------------------------
	displayDate: function(date){
		return date.slice(0, 11) + " / " + date.slice(11, 21);
	},
	
	// -----------------------------------------------------------------
	dateToString: function(date){
		var str = date.getFullYear();
		var mon = date.getMonth() + 1;
		if(mon < 10){
			mon = "0" + mon;
		}
		var day = date.getDate();
		if(day < 10){
			day = "0" + day;
		}
		var hour = date.getHours()
		if(hour < 10){
			hour = "0" + hour;
		}
		var min = date.getMinutes();
		if(min < 10){
			min = "0" + min;
		}
		var sec = date.getSeconds();
		if(sec < 10){
			sec = "0" + sec;
		}
		str += "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
		return str;
	}
	
}

astarte.ffon = function(obj, arr){
	return astarte.util.findFirstObjNet(obj, arr);
}

jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.innerHeight(),
        width = elem.innerWidth(),
        elem.remove();
        
        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });  
}