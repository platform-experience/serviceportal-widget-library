(function() {
	var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	options.interval = options.interval || serverOptions.interval;
	options.table = options.table || serverOptions.table;
	options.fields = options.fields || serverOptions.fields;
	options.encoded_query = options.encoded_query || serverOptions.encoded_query;
	options.script_include = options.script_include || serverOptions.script_include || "PEHighchartsExample";
	options.function_name = options.function_name || serverOptions.function_name || "getHeatmapDemoData";
	options.param1 = options.param1 || serverOptions.param1;
	options.advance = options.advance || serverOptions.advance || JSON.stringify({
		"title": {
			"text": "Heatmap"
		},
		"options": {
			"plotOptions": {
				"series": {
					"dataLabels": {
						"enabled": true
					}
				}
			},
			"colorAxis": {
				"min": 1,
				"max": 100,
				"minColor": "rgba(255, 0, 80, 0.2)",
				"maxColor": "rgba(255, 207, 96, 0.8)",
				"type": "linear"
			},
			"chart": {
				"plotBackgroundColor": {
					"linearGradient": {
						"x1": 1,
						"y1": 0,
						"x2": 0,
						"y2": 1
					},
					"stops": [
						[0, "rgba(255, 0, 80, 1)"],
						[1, "rgba(255, 207, 96, 1)"]
					]
				}
			}
		}
	});
})();