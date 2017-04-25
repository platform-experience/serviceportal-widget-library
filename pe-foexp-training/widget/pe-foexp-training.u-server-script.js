(function($sp) {
	var obj;
  var gr;
	
	var category = options.category || $sp.getParameter('category');
	
	if (input.action == 'remove') {
		
		gr = new GlideRecord('u_pe_training_assignments');
		if (gr.get(input.sys_id)) {
			gr.u_enrolled = "";
			gr.update();
		}
		return;
	}
	
	if (input.action == 'enroll') {
		gr = new GlideRecord('u_pe_training_assignments');
		if (gr.get(input.sys_id)) {
			var now = gs.nowDateTime();
			gr.u_enrolled = now;
			data.enrolled = now;
			gr.update();
		}
		return;
	}
	
	data.item = {};
	gr = new GlideRecord('u_pe_training_category');
	if (gr.get(category)) {
		data.item.title = gr.u_name.toString();
	} else {
		return;
	}
	
	gr = new GlideRecord('u_pe_training_assignments');
	gr.addQuery('u_course.u_category', category);
	gr.addQuery('u_user', gs.getUserID());
	gr.orderBy('u_course.u_order');
	gr.query();
	data.item.remaining = 0;
	data.items = [];
	var training_list = [];
	data.requirements = {};
	var training_completed = {};
	while (gr.next()) {
		obj = {};
		
		obj.name = gr.u_course.u_name.toString();
		obj.course = gr.sys_id.toString();
		obj.sys_id = gr.u_training.sys_id.toString();
		obj.enrolled = gr.u_enrolled.toString();
		obj.completed = gr.u_completed.toString();
		obj.due = gr.u_due.toString();

		data.requirements[obj.sys_id] = [];
		training_completed[obj.sys_id] = obj.completed;

		if (!obj.completed) {
			data.item.remaining = data.item.remaining + 1;
		}

		data.items.push(obj);
		if (!obj.completed) {
			training_list.push(gr.u_course.sys_id.toString());
		}
	}
	
	
	gr = new GlideRecord('u_pe_training_prerequisites');
	gr.addQuery('u_course', 'IN', training_list);
	gr.query();

	while (gr.next()) {
		obj = {};
		obj.sys_id = gr.u_course.sys_id.toString();
		obj.title = gr.u_course.u_name.toString();

		var training_id = gr.u_prerequisite.sys_id.toString();

		if (!training_completed[obj.sys_id]) {
			data.requirements[training_id].push(obj);
		}
	}

	
})($sp);