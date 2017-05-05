(function() {
	var instanceGr = $sp.getInstanceRecord();
	
	// Check if this is an embedded widget
	if (instanceGr.getValue('sys_id') == null) {
		data.embedOpt = input;
		return;
	}
	
	// Get all the elements
	var gr = new GlideRecord('u_pe_cod_elements');
	gr.addQuery('u_instance', instanceGr.getValue('sys_id'));
	gr.query();
	
	data.items = [];
	
	// Loop through the element records and build the items
	while(gr.next()) {

		var item = {
			label: gr.getValue('u_label'),
			icon: gr.getValue('u_icon'),
			url: gr.getValue('u_url'),
			completed: gr.getValue('u_completed'),
			color: gr.getValue('u_color'),
			count: gr.getValue('u_count')
		};
		
		// Evaluate the scripts for each element if necessary.
		if (gr.getValue('u_count_script') != null || gr.getValue('u_completed_script') != null) {
			var evaluator = new GlideScopedEvaluator();
			
			if (gr.getValue('u_count_script') != null) {
				item.count = evaluator.evaluateScript(gr, 'u_count_script');
			} else {
				item.completed = evaluator.evaluateScript(gr, 'u_completed_script');
			}
		}
	
		data.items.push(item);
	}
})();