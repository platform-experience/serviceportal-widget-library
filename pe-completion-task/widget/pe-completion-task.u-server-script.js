(function($sp) {
	
	// get the GlideRecord for the SP Instance.
	var gr = $sp.getInstanceRecord();
	
	// If a validation script is set, execute it.
	if (options.u_validation_script != '') {
		data.completed = executeScript(gr, 'u_validation_script');
	}
	
	// If a warning message script is set, execute it.
	if (options.u_warning_message_script != '') {
		data.warning_message = executeScript(gr, 'u_warning_message_script');
	}
  
	function executeScript (gr, field) {
		var evaluator = new GlideScopedEvaluator();
		evaluator.putVariable('current', gr);
		var exec = evaluator.evaluateScript(gr, field, null);
		return exec;
	}
})($sp);