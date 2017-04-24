(function() {
	var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	options.question_id = options.question_id || serverOptions.question_id;
	data.title = "No Question Specified";
	data.issues = [];

	var asmtGR = new GlideRecord("asmt_metric");
	if (asmtGR.get(options.question_id)) {
		data.title = asmtGR.name.toString();
		var metricDefGR = new GlideRecord("asmt_metric_definition");
		metricDefGR.addQuery("metric", asmtGR.sys_id.toString());
		metricDefGR.query();
		while (metricDefGR.next()) {
			data.issues.push({
				sys_id: metricDefGR.sys_id.toString(),
				text: metricDefGR.display.toString(),
				value: metricDefGR.value.toString()
			})
		}
	}
})();