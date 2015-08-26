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
	}
	
}

astarte.ffon = function(obj, arr){
	return astarte.util.findFirstObjNet(obj, arr);
}