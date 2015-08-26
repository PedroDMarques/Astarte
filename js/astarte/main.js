var astarte = {};

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