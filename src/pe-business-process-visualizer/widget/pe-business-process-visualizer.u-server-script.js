(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	data.table = $sp.getParameter('t') || $sp.getParameter('table') || options.table;
	data.extTable = undefined;
	data.field = $sp.getParameter('f') || $sp.getParameter('field') || options.display_field;
	data.lang = $sp.getParameter('l') || $sp.getParameter('language') || options.language || 'en';
	data.caption = $sp.getParameter('caption') || options.caption;
	data.sys_id = $sp.getParameter('sys_id');
	data.mobile_scale = (options.mobile_show_scale=='true' || options.mobile_show_scale==true || options.mobile_show_scale=='1' || options.mobile_show_scale==1 )
	data.record_state = false;
	
	data.display_size = options.display_size;
	
	if(options.icons){
		data.icons =  options.icons.split(',');
	}
	
	data.process = {
		steps : 0,
	  labels : []
	}
	if(options.default_icon=='empty'){
		options.default_icon = 'check';
	}
	
	if(!data.table || !data.field){
		return;
	}
	if(data.sys_id){
		var grRec = new GlideRecordSecure(data.table);
		grRec.get(data.sys_id);
		grRec.query();
		if(grRec.next()){
			data.record_state = grRec.getValue(data.field);
		}
	}

	var grTable = new GlideRecord('sys_db_object');
	grTable.addQuery('name','=',data.table);
	grTable.query();
	if(grTable.next()){
		data.extTable = grTable.getDisplayValue('super_class');
	}
	
	var grProcess = new GlideRecord('sys_choice');
	grProcess.addQuery('name','=',data.table);
	grProcess.addQuery('element','=',data.field);
	grProcess.addQuery('language','=',data.lang);
	if(options.invert_sequence =='true' ||
		 options.invert_sequence =='t' ||
		 options.invert_sequence == true ){
	 grProcess.orderByDesc('sequence');
	}else{
		grProcess.orderBy('sequence');
	}
	grProcess.query();
	
	while(grProcess.next()){
		var icon = "fa-"+options.default_icon;
		if(data.icons && data.icons[data.process.steps]){
			icon = data.icons[data.process.steps];
		}
		
		data.process.labels.push({ display_value : grProcess.getDisplayValue('label'),
															value: grProcess.getDisplayValue('value'),
															icon: icon
														 });
		data.process.steps = data.process.steps + 1;
	}
	
	if(data.process.steps==0 && data.extTable){
		grProcess = new GlideRecord('sys_choice');
		grProcess.addQuery('name','=',data.extTable);
		grProcess.addQuery('element','=',data.field);
		grProcess.addQuery('language','=',data.lang);
		if(options.invert_sequence =='true' ||
			 options.invert_sequence =='t' ||
			 options.invert_sequence == true ){
			grProcess.orderByDesc('sequence');
		}else{
			grProcess.orderBy('sequence');
		}
		grProcess.query();

		while(grProcess.next()){
			var icon = "fa-"+options.default_icon;
			if(data.icons && data.icons[data.process.steps]){
				icon = data.icons[data.process.steps];
			}

			data.process.labels.push({ display_value : grProcess.getDisplayValue('label'),
																value: grProcess.getDisplayValue('value'),
																icon: icon
															 });
			data.process.steps = data.process.steps + 1;
		}
	}
		
})();