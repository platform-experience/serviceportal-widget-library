var PEHighchartsExample = Class.create();
PEHighchartsExample.prototype = {
	initialize: function(request, response) {
		this.json = new JSON();
	},
	getDemoData: function(param1) {
		var scope = this;
		return [{
			"name": "Random Data 1",
			"data": [
				["Data Point 1", scope.randNumber(1, 100)],
				["Data Point 2", scope.randNumber(1, 100)],
				["Data Point 3", scope.randNumber(1, 100)],
				["Data Point 4", scope.randNumber(1, 100)],
				["Data Point 5", scope.randNumber(1, 100)],
				["Data Point 6", scope.randNumber(1, 100)],
				["Data Point 7", scope.randNumber(1, 100)],
				["Data Point 8", scope.randNumber(1, 100)],
				["Data Point 9", scope.randNumber(1, 100)]
			]
		}, {
			"name": "Random Data 2",
			"data": [
				["Data Point 1", scope.randNumber(1, 100)],
				["Data Point 2", scope.randNumber(1, 100)],
				["Data Point 3", scope.randNumber(1, 100)],
				["Data Point 4", scope.randNumber(1, 100)],
				["Data Point 5", scope.randNumber(1, 100)],
				["Data Point 6", scope.randNumber(1, 100)]
			]
		}];
	},
	getPieDemoData: function(param1) {
		var scope = this;
		return [{
			"name": "Random Data 1",
			"data": [
				["Data Point 1", scope.randNumber(1, 100)],
				["Data Point 2", scope.randNumber(1, 100)],
				["Data Point 3", scope.randNumber(1, 100)],
				["Data Point 4", scope.randNumber(1, 100)],
				["Data Point 5", scope.randNumber(1, 100)],
				["Data Point 6", scope.randNumber(1, 100)],
				["Data Point 7", scope.randNumber(1, 100)],
				["Data Point 8", scope.randNumber(1, 100)],
				["Data Point 9", scope.randNumber(1, 100)],
				["Data Point 10", scope.randNumber(1, 100)],
				["Data Point 11", scope.randNumber(1, 100)],
				["Data Point 12", scope.randNumber(1, 100)]
			]
		}];
	},
	getGaugeDemoData: function(param1) {
		var scope = this;
		var dataSeries = [{
			"name": "Random Data 1",
			"data": [{
				name: "Data Point 1",
				y: scope.randNumber(1, 100)
			}]
		}];
		return dataSeries;
	},
	getHeatmapDemoData: function(param1) {
		var scope = this;
		var series = [{
			data: [
				[0, 0, scope.randNumber(1, 100)],
				[0, 1, scope.randNumber(1, 100)],
				[0, 2, scope.randNumber(1, 100)],
				[1, 0, scope.randNumber(1, 100)],
				[1, 1, scope.randNumber(1, 100)],
				[1, 2, scope.randNumber(1, 100)],
				[2, 0, scope.randNumber(1, 100)],
				[2, 1, scope.randNumber(1, 100)],
				[2, 2, scope.randNumber(1, 100)]
			]
		}];
		return series;
	},
	randNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getParamAsString: function(paramName) {
		if (this.request.queryParams.hasOwnProperty(paramName)) {
			return this.request.queryParams[paramName] + '';
		}
		return false;
	},
	type: 'PEHighchartsExample'
};