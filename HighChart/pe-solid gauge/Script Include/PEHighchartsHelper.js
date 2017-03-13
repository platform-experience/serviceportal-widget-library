var PEHighchartsHelper = Class.create();
PEHighchartsHelper.prototype = {
	initialize: function(request, response) {
		this.request = request;
		this.response = response;
		this.json = new JSON();
		this.error = new sn_ws_err.ServiceError();
		this.script_include = this.getParamAsString("script_include");
		this.function_name = this.getParamAsString("function_name") || "process";
		this.param1 = this.getParamAsString("param1");
		this.options = this.decode(this.getParamAsString("options"));
	},
	process: function() {
		var scope = this;
		if (scope.script_include && scope.function_name) {
			var scriptInc = new global[scope.script_include]();
			if (scriptInc) {
				if (scriptInc[scope.function_name]) {
					return scriptInc[scope.function_name](scope.param1, scope.options);
				}
				return scope.getError(400, "Invalid function_name has been sent", scope.function_name + " is not valid, verify that this function exist");
			}
		}
		return scope.getError(400, "Invalid Script Include has been sent", scope.script_include + " is not valid, verify that this Script Include exist");
	},
	getError: function(status, message, details) {
		var scope = this;
		scope.error.setStatus(status);
		scope.error.setMessage(message);
		scope.error.setDetail(details);
		return scope.error;
	},
	getDemoData: function() {
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
		}, {
			"name": "Random Data 2",
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
		}, {
			"name": "Random Data 3",
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
		}, {
			"name": "Random Data 4",
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
	getPieDemoData: function() {
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
	getGaugeDemoData: function(radius) {
		radius = this.decode(radius);
		var scope = this;
		var dataSeries = [{
			"name": "Random Data 1",
			"data": [{
				name: "Data Point 1",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 2",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 3",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 4",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 5",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 6",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 7",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 8",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 9",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 10",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 11",
				y: scope.randNumber(1, 100)
			}, {
				name: "Data Point 12",
				y: scope.randNumber(1, 100)
			}]
		}];
		dataSeries.forEach(function(currentSeries) {
			currentSeries.data.map(function(data, index, dataArray) {
				var width = (radius.outer - radius.inner) / dataArray.length;
				data.innerRadius = index * width + radius.inner;
				data.radius = ((index + 1) == dataArray.length) ? radius.outer : ((index + 1) * width + radius.inner) - 1;
			});
		});
		return dataSeries;
	},
	encode: function(jsonObject) {
		return this.json.encode(jsonObject);
	},
	decode: function(jsonString) {
		return this.json.decode(jsonString);
	},
	randNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	log: function(message) {
		gs.log(message, "PEHighchartsHelper");
	},
	logObject: function(objectMessage) {
		this.log("\n" + this.objectToString(objectMessage));
	},
	objectToString: function(objectMessage, tabs) {
		tabs = tabs || "";
		var scope = this;
		var message = "{\n";
		var keyArray = Object.keys(objectMessage);
		for (var i = 0; i != keyArray.length; i++) {
			var key = keyArray[i];
			var value = objectMessage[key];
			var valueType = typeof value;
			message += tabs + "\t\"" + key + "\":";
			if (valueType == "object") {
				if (!Array.isArray(value)) {
					message += scope.objectToString(value, (tabs + "\t"));
				} else {
					message += "[";
					for (var x = 0; x != value.length; x++) {
						if (typeof value[x] != "object") {
							message += value[x];
						} else {
							message += "\n\t\t" + tabs + scope.objectToString(value[x], (tabs + "\t\t"));
							if (x == (value.length - 1)) {
								message += "\n\t" + tabs;
							}
						}
						if (x != (value.length - 1)) {
							message += ",\n" + (tabs + "\t\t");
						}
					}
					message += "]";
				}
			} else {
				message += "\"" + value.toString() + "\"";
			}
			if (i != (keyArray.length - 1)) {
				message += ",\n";
			}
		}
		return message + "\n" + tabs + "}";
	},
	getParamAsString: function(paramName) {
		if (this.request.queryParams.hasOwnProperty(paramName)) {
			return this.request.queryParams[paramName] + '';
		}
		return false;
	},
	type: 'PEHighchartsHelper'
};