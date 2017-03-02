(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	var getBoolValue = function(inputVal, optionVal){
		if(inputVal == null){
			return (optionVal === 'true');
		} else{
			return (inputVal === 'true');
		}
	};
	
	data.title = options.title || input.title;
	data.show_icons = getBoolValue(input.show_icons,options.show_icons);
	data.show_ldescriptions = getBoolValue(input.show_ldescriptions,options.show_ldescriptions);
	data.initial_elements = options.initial_elements || input.initial_elements;
data.initial_elements = parseInt(data.initial_elements);
})();