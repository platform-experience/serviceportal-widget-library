var PEHighchartsDataGenerator = Class.create();
PEHighchartsDataGenerator.prototype = {
	initialize: function() {
		this.json = new JSON();
	},
	process: function(recordName, options) {
		var scope = this;
		var dataGeneratorGR = scope.getDataGenerator(recordName);
		var seriesArray = [];
		if (dataGeneratorGR) {
			for (var x = 0; x != dataGeneratorGR.series; x++) {
				var dataArray = [];
				var dataLength = dataGeneratorGR.data_points;
				if (dataGeneratorGR.advanced) {
					dataArray = eval(dataGeneratorGR.script);
					dataLength = dataArray.length;
				}
				for (var i = 0; i != dataLength; i++) {
					var currentData = dataArray[i];
					var y = 0;
					if (typeof currentData == "string" || !currentData) {
						switch (currentData) {
							case "very high":
								y = scope.randNumber((dataGeneratorGR.max * 0.80), dataGeneratorGR.max, dataGeneratorGR.round_to);
								break;
							case "high":
								y = scope.randNumber((dataGeneratorGR.max * 0.60), (dataGeneratorGR.max * 0.79), dataGeneratorGR.round_to);
								break;
							case "medium":
								y = scope.randNumber((dataGeneratorGR.max * 0.40), (dataGeneratorGR.max * 0.59), dataGeneratorGR.round_to);
								break;
							case "low":
								y = scope.randNumber((dataGeneratorGR.max * 0.20), (dataGeneratorGR.max * 0.39), dataGeneratorGR.round_to);
								break;
							case "very low":
								y = scope.randNumber(dataGeneratorGR.min, (dataGeneratorGR.max * 0.19), dataGeneratorGR.round_to);
								break;
							default:
								y = scope.randNumber(dataGeneratorGR.min, dataGeneratorGR.max, dataGeneratorGR.round_to);
								break;
						}
					} else {
						y = currentData;
					}
					dataArray[i] = {
						name: dataGeneratorGR.name.toString() + " " + (i + 1),
						y: y
					};
				}
				seriesArray.push({
					data: dataArray
				});
			}
		}
		return seriesArray;
	},
	getDataGenerator: function(recordName) {
		var dataGeneratorGR = new GlideRecord("highcharts_data_generator");
		dataGeneratorGR.addQuery("name", recordName);
		dataGeneratorGR.query();
		if (dataGeneratorGR.next()) {
			return dataGeneratorGR;
		}
		return false;
	},
	randNumber: function(min, max, round) {
		return Math.round((Math.random() * (max - min + 1) + min) / round) * round;
	},
	type: 'PEHighchartsDataGenerator'
};