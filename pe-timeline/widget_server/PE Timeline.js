(function () {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	var getBoolValue = function (inputVal, optionVal) {
		if (inputVal == null) {
			return (optionVal === 'true');
		} else {
			return (inputVal === 'true');
		}
	};

	var getIntValue = function (inputVal, optionVal) {
		if ((inputVal == null || inputVal == undefined) && (optionVal >= 0)) {
			return (parseInt(optionVal));
		} else if (inputVal != null && inputVal != undefined) {
			return (parseInt(inputVal));
		}
	};

	data.title = options.title || input.title;
	data.show_icons = getBoolValue(input.show_icons, options.show_icons);
	data.show_ldescriptions = getBoolValue(input.show_ldescriptions, options.show_ldescriptions);
	data.initial_elements = getIntValue(options.initial_elements, input.initial_elements);
	data.show_colors = getBoolValue(input.show_colors, options.show_colors);

})();