(function() {
	var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	options.interval = options.interval || serverOptions.interval;
	options.table = options.table || serverOptions.table;
	options.fields = options.fields || serverOptions.fields;
	options.encoded_query = options.encoded_query || serverOptions.encoded_query;
	options.script_include = options.script_include || serverOptions.script_include || "PEHighchartsExample";
	options.function_name = options.function_name || serverOptions.function_name || "getGaugeDemoData";
	options.param1 = options.param1 || serverOptions.param1;
	options.advance = options.advance || serverOptions.advance || JSON.stringify({
		"options": {
			"pane": {
				"startAngle": -90,
				"endAngle": 90,
				"background": {
					"shape": "arc"
				}
			},
			"yAxis": {
				"softMin": 0,
				"softMax": 100
			}
		},
		"title": {
			"text": "Solid Arc Gauge"
		}
	});
})();