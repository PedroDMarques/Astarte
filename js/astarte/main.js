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
	},
	
	/* Calcula a distância, em metros, entre dois pontos geográficos */
	geographicDistance: function (point1, point2) {
		return point1.distanceTo(point2);
	},

	/* Formata as coordenadas geográficas de um ponto de modo a serem legíveis por seres humanos normais */
	prettyCoords: function (point) {
		var lat = point.lat;
		var lng = point.lng;
		
		var latOrient = lat > 0 ? "Norte" : "Sul";
		var lngOrient = lng > 0 ? "Este" : "Oeste";
		
		
		return "(" + String(Math.abs(lat).toFixed(6)) + "° " + latOrient +
			", " + String(Math.abs(lng).toFixed(6)) + "° " + lngOrient + ")"; 
	}
	
}

astarte.ffon = function(obj, arr){
	return astarte.util.findFirstObjNet(obj, arr);
}