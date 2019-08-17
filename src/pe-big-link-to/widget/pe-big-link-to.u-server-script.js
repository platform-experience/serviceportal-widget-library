(function() {
	var gr = $sp.getInstanceRecord();
	
	/* Data Variables */
	data.missingConfig = false;

	try{
		data.href = options.href || $sp.getMenuHREF(gr);
		
		data.target = options.target || "";
		
		if(data.href==""){
			data.missingConfig = true;
		}
		
	}catch(e){
		data.missingConfig = true;
		return;
	}

})();