astarte = {};

astarte.util = {
	
	// -----------------------------------------------------------------
	findFirstObjNetwork: function(obj, arr){
		
		for(var i = 0; i < arr.length; i++){
			obj = obj.objNetwork[arr[i]];
			if(!obj){
				return;
			}
		}
		return obj;
		
	}
	
}