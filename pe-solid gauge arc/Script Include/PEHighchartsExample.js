var PEHighchartsExample = Class.create();
PEHighchartsExample.prototype = {
	initialize: function(request, response) {
		this.json = new JSON();
	},
	getDemoData: function(param1, options) {
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
	getPieDemoData: function(param1, options) {
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
	getGaugeDemoData: function(param1, options) {
		//radius = this.json.decode(radius);
		var scope = this;
		var dataSeries = [{
			"name": "Random Data 1",
			"data": [{
					name: "Data Point 1",
					y: scope.randNumber(1, 100)
				}
				/*,{
								name:"Data Point 2",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 3",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 4",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 5",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 6",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 7",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 8",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 9",
								y:scope.randNumber(1,100)
							},{
								name:"Data Point 10",
								y:scope.randNumber(1,100)
							}*/
			]
		}];
		dataSeries.forEach(function(currentSeries) {
			currentSeries.data.map(function(data, index, dataArray) {
				var width = (options.outer_radius - options.inner_radius) / dataArray.length;
				data.innerRadius = index * width + options.inner_radius;
				data.radius = ((index + 1) == dataArray.length) ? options.outer_radius : ((index + 1) * width + options.inner_radius) - 1;
			});
		});
		return dataSeries;
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