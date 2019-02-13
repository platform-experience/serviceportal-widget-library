(function() {

	// Get current user for quick filtering of data to user only
	var currentUser = gs.getUser(); 

	data.title = options.title;
	options.limit_to_user = (options.limit_to_user=='true');
	data.panel_button = (options.panel_button=='true');
	
	/* 'q' - URL parameter for adding a filter to the dataset dynamically */
	options.encoded_query = options.encoded_query || $sp.getParameter('q');

	/* Data Variables */
	data.missingConfig = false;

	data.portal_record = $sp.getPortalRecord();
	
	data.instance_table = {
		readable: true,
		count: 0,
		dataSet : [],
		detail_page: undefined,
		detail_view: undefined,
		image: options.image_field,
		isValid : false,
		itemMenu: [],
		label : undefined,
		list_page: undefined,
		pages: [],
		showActions: false,
		sys_id: options.table
	};

	try{
		var grTableMeta = new GlideRecord('sys_db_object');
		if(data.instance_table.table){
			grTableMeta.addQuery('name',data.instance_table.table);	
		}else{
			grTableMeta.addQuery('sys_id',data.instance_table.sys_id);	
		}
		
		grTableMeta.query();
		
		if(grTableMeta.next()){
			data.instance_table.sys_id = grTableMeta.getUniqueValue();
			data.instance_table.name = grTableMeta.getDisplayValue('name');
			data.instance_table.label = grTableMeta.getDisplayValue('label');
		}else{
			data.missingConfig = true;
			return;
		}
		
		// If provided, get the sys_id of the List Page from the Option (Instance) Schema
		if (options.list_page) {
			var list_page = GlideRecordSecure('sp_page');
			if (list_page.get(options.list_page))
				data.instance_table.list_page = list_page.getDisplayValue('id');
		}

		// If provided, get the sys_id of the Detail Page from the Option (Instance) Schema
		if (options.detail_page) {
			var detail_page = GlideRecordSecure('sp_page');
			if (detail_page.get(options.detail_page)){
				data.instance_table.detail_page = detail_page.getDisplayValue('id');
				data.instance_table.showActions = true;
			}
		}

		// If provided, get the name of the View from the Option (Instance) Schema
		if (options.view) {
			var view_name = GlideRecordSecure('sys_ui_view');
			if (view_name.get(options.view))
				data.instance_table.detail_view = view_name.getDisplayValue('name');
		}
		
		/* Table to use */
		//grValid - Used for table and field validation only
		var grValid = new GlideRecord(data.instance_table.name);
		var grTable = new GlideRecordSecure(data.instance_table.name); // does ACL checking for us
		data.instance_table.readable = grTable.canRead();
		
		if(data.instance_table.readable){
			//Validate if table exists
			data.instance_table.isValid = grValid.isValid();
			if(!data.instance_table.isValid){
				throw('Missing Table Configuration');
			}

			// If select, limit the results to the current user based on the Option (Instance) Schema
			if(options.limit_to_user){
				grTable.addQuery('assigned_to',currentUser.getID());
			}

			// If provided, append the additional filter criteria to the GlideRecord from the Option (Instance) Schema
			if(options.encoded_query){
				grTable.addEncodedQuery(options.encoded_query);
			}

			// LETS GO!
			grTable.query();
			while(grTable.next()){
				//Lets build our data set
				var record = {};
				record.sys_id = { displayValue: grTable.getUniqueValue(), value: grTable.getUniqueValue() };


				if(options.name_field){
					record.name = { displayValue: grTable.getDisplayValue(options.name_field), value: grTable.getValue(options.name_field) };	
				}
				if(options.image_field){
					record.image = { displayValue: grTable.getDisplayValue(options.image_field), value: grTable.getValue(options.image_field) };	
				}
				if(options.subcaption){
					record.subcaption = { displayValue: grTable.getDisplayValue(options.subcaption_field), value: grTable.getValue(options.subcaption_field) };	
				}

				data.instance_table.dataSet.push(record);
			}

			data.instance_table.count = grTable.getRowCount();
			
			if(data.instance_table.count<=0){
				data.instance_table.readable = false;
			}
		}

	}catch(e){
		/*
			If for any reason something above errors, then lets at least show a message in the Panel's Body that there 
			is a problem.  And, post a message to the browser with what the problem is.
		*/
		data.missingConfig = true;
		data.err_msg = e;
		gs.addErrorMessage('Portal: ' + data.portal_record.getDisplayValue('url_suffix') + " Message: " + e );
		return;
	}

	/* Function to Get our Field info */
	function getField(gr, name) {
		var f = {};
		f.field = name;
		f.displayValue = gr.getDisplayValue(name);
		f.value = gr.getValue(name);
		
		var ge = gr.getElement(name);
		if (ge == null)
			return f;

		f.type = ge.getED().getInternalType();
		f.label = ge.getLabel();
		return f;
	}
})();