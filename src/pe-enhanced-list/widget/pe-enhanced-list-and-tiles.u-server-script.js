(function() {
	/*
		Widget: Enhanced List
		Version/Date: v1.0 - Nov 2018
		By: Solution Innovation - Factory
		Purpose: Provide a flexible, enhanced feature set, and a more configurable version
						 of the Service Portal Out of the Box Simple List widget.
		
	*/
	
	// Get current user for quick filtering of data to user only
	var currentUser = gs.getUser(); 
	
	//Get Option (Instance) Schema Configuration values
	options.list_pagination = parseInt(options.list_pagination);
	options.show_panel_header = (options.show_panel_header=='true');
	options.show_panel_footer = (options.show_panel_footer=='true');
	options.limit_to_user = (options.limit_to_user=='true');
	options.order_by_direction = (options.order_by_direction=='true');
	options.sc_item_id = (options.sc_item_id=='true');
	

	/* 'q' - URL parameter for adding a filter to the dataset dynamically */
	options.encoded_query = options.encoded_query || $sp.getParameter('q');

	/* Data Variables */
	data.missingConfig = false;

	data.portal_record = $sp.getPortalRecord();
	
	data.instance_table = {
		count: 0,
		dataSet : [],
		dateformat: options.show_date_time,
		detail_page: undefined,
		detail_view: undefined,
		direction: options.order_by_direction,
		fieldLabels: [],
		fieldSplit: [],
		fields : options.fields || $sp.getParameter('f'),
		image: options.image_field,
		isValid : false,
		itemMenu: [],
		label : undefined,
		list_page: undefined,
		name : $sp.getParameter('t'), // - not sure we want to use the URL Param with this ??? 
		order_by : options.order_by,
		pages: [],
		showActions: false,
		sys_id: options.table,
		viewby: options.list_pagination
	};

	try{
		/* Get the Panel's Header Text*/
		var grTableMeta = new GlideRecordSecure('sys_db_object');
		if(data.instance_table.name){
			grTableMeta.addQuery('name',data.instance_table.name);	
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

		options.panel_header_text = options.panel_header_text || data.instance_table.label;

		
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

		// Lets figure out the fields we are going to need
		var fields = data.instance_table.fields || "";
		fields = data.instance_table.fields.split(',');

		// Lets figure out how we are going to label the fields
		var labels = options.field_labels;
		if(labels.length>0){
			labels = options.field_labels.split(',');
		}else{
			labels = [null];
		}

		// If provided, lets figure out the image situation and push it as the first field in the data array
		if(data.instance_table.image){
			fields.splice(0,0,data.instance_table.image);
			labels.splice(0,0,null);
		}else{
			fields.splice(0,0,null);
			labels.splice(0,0,null);
		}
		
		// Lets fix all the labeling
		labels.forEach(function(el,idx){ 
			if(el != null && el.length > 0){
				labels[idx] = el; 
			}else if(el == null){
				labels[idx] = null; 
			}
		});

		// Stuff the fields and labels into the Instance Table data variable
		data.instance_table.fieldLabels = labels;
		data.instance_table.fieldSplit = fields;

		// Get the MAX Record count - to minimize and mitigate LARGE data pulls
		data.maxCount = options.maxrecords;
		grTable.setLimit(data.maxCount);
		
		// If provided, set the orderBy parameter of the GlideRecord from the Option (Instance) Schema
		if(grValid.isValidField(data.instance_table.order_by)){
			if(options.order_by_direction){
				grTable.orderByDesc(data.instance_table.order_by);	
			}else{
				grTable.orderBy(data.instance_table.order_by);
			}
		}
		
		// LETS GO!
		grTable.query();
		while(grTable.next()){
			//Lets build our data set
			var record = {};
			record.sys_id = { displayValue: grTable.getUniqueValue(), value: grTable.getUniqueValue() };

			//Only need the fields based on the Option (Instance) Schema
			for(var x=0;x<fields.length;x++){
				if(fields[x] && fields[x] !== null){
					var f = getField(grTable,fields[x]);
					if(f.displayValue != ''){
						if(labels[x] && labels[x]!==null){
							f.label = labels[x];
						}
						record[fields[x]] = f;
					}else{
						record[fields[x]] = { displayValue: undefined, value: undefined, type: undefined, label: fields[x]};	
					}	
				}
			}
			data.instance_table.dataSet.push(record);
		}

		data.instance_table.count = grTable.getRowCount();
		
		//Show message if the MAX record count was reached
		if(data.instance_table.count >= data.maxCount){
			gs.addInfoMessage('MAX record count reached for Widget - '+ options.panel_header_text +'. MAX Records displayed: ' + data.maxCount);
		}

		//Lets figure out the pagination situation
		if(data.instance_table.viewby>0 && data.instance_table.count>0){
			var pages = parseInt(data.instance_table.count / options.list_pagination);
			var last_page = data.instance_table.count % options.list_pagination;
			data.pages_value = pages;
			if(pages <= 0){
				options.list_pagination = 0;
			}else{
				options.show_panel_footer = true;
				for(var m=0; m < pages; m++){
					data.instance_table.pages.push( m+1 );
				}
				if(last_page > 0){
					data.instance_table.pages.push( pages+1 );
				}
			}
		}else{
			data.instance_table.viewby = data.instance_table.count;
		}

		//Lets append the catalog items to the individual item's submenu
		if(options.sc_cat_item){
			var sc_items = new GlideRecordSecure('sc_cat_item');
			sc_items.addActiveQuery();
			sc_items.addEncodedQuery('sys_idIN'+options.sc_cat_item);
			sc_items.query();
			data.instance_table.itemMenu = [];
			while(sc_items.next()){
				data.instance_table.itemMenu.push({
					title : sc_items.getDisplayValue('name'),
					sys_id : sc_items.getUniqueValue()
				});
				data.instance_table.showActions = true;
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