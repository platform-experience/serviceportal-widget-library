(function() {
	if (!input) // asynch load list
		return;

    if (input.action == 'INLINE_EDIT') {
        var inlineForm = $sp.getForm(input.table, input.sys_id);
        data.inlineForm = inlineForm;
        return;
    }

    data.msg = {};
	data.msg.sortingByAsc = gs.getMessage("Sorting by ascending");
	data.msg.sortingByDesc = gs.getMessage("Sorting by descending");

	/*
	 * data.table = the table
	 * data.p = the current page starting at 1
	 * data.o = the order by column
	 * data.d = the order by direction
	 * data.keywords = the keyword search term
	 * data.list = the table data as an array
	 * data.invalid_table = true if table is invalid or if data was not succesfully fetched
	 * data.table_label = the table's display name. e.g. Incident
	 * data.table_plural = the table's plural display name. e.g. Incidents
	 * data.fields = a comma delimited list of field names to show in the data table
	 * data.column_labels = a map of field name -> display name
	 * data.window_size = the number of rows to show
	 * data.filter = the encoded query
	 */
	// copy to data[name] from input[name] || option[name]
	optCopy(['table', 'p', 'o', 'd', 'filter', 'filterACLs', 'fields', 'keywords', 'view']);
	optCopy(['relationship_id', 'apply_to', 'apply_to_sys_id', 'window_size']);
	if (!data.table) {
		data.invalid_table = true;
		data.table_label = "";
		return;
	}

	if (!data.fields) {
		if (data.view)
			data.fields = $sp.getListColumns(data.table, data.view);
		else
			data.fields = $sp.getListColumns(data.table);
	}

	data.title = input.headerTitle;
	data.view = data.view || 'mobile';
	data.table = data.table || $sp.getValue('table');
	data.filter = data.filter || $sp.getValue('filter');
	data.keywords = data.keywords || $sp.getValue('keywords');
	data.p = data.p || $sp.getValue('p') || 1;
	data.p = parseInt(data.p);
	data.o = data.o || $sp.getValue('o') || $sp.getValue('order_by');
	data.d = data.d || $sp.getValue('d') || $sp.getValue('order_direction');
	data.page_index = data.p - 1;
	data.show_new = data.show_new || options.show_new;
	var windowSize = data.window_size || $sp.getValue('maximum_entries') || 20;
	windowSize = parseInt(windowSize);
	if (isNaN(windowSize) || windowSize < 1)
		windowSize = 20;
	data.window_size = windowSize;

	var gr;
	if (gs.getProperty("glide.security.ui.filter") == "true" || GlideTableDescriptor.get(data.table).getED().hasAttribute("glide.security.ui.filter")) {
		gr = new FilteredGlideRecord(data.table);
		gr.applyRowSecurity();
	} else
		gr = new GlideRecordSecure(data.table);
	if (!gr.isValid()) {
		data.invalid_table = true;
		data.table_label = data.table;
		return;
	}

  data.canCreate = gr.canCreate();
	data.newButtonUnsupported = data.table == "sys_attachment";
	data.table_label = gr.getLabel();
	data.table_plural = gr.getPlural();
	if (data.filter) {
		if (data.filterACLs)
			gr = $sp.addQueryString(gr, data.filter);
		else
			gr.addEncodedQuery(data.filter);
	}

	if (data.keywords){
		gr.addQuery('123TEXTQUERY321', data.keywords);
		data.keywords = null;
	}

	data.filter = gr.getEncodedQuery();

	if (data.relationship_id) {
		var rel = GlideRelationship.get(data.relationship_id);
		var target = new GlideRecord(data.table);
		var applyTo = new GlideRecord(data.apply_to);
		applyTo.get("sys_id", data.apply_to_sys_id);
		rel.queryWith(applyTo, target); // put the relationship query into target
		gr.addEncodedQuery(target.getEncodedQuery()); // get the query the relationship made for us
	}

	if (data.o){
		if (data.d == "asc")
			gr.orderBy(data.o);
		else
			gr.orderByDesc(data.o);
	}

	data.window_start = data.page_index * data.window_size;
	data.window_end = (data.page_index + 1) * data.window_size;
	gr.chooseWindow(data.window_start, data.window_end);
	gr._query();

	data.row_count = gr.getRowCount();
	data.num_pages = Math.ceil(data.row_count / data.window_size);
	data.column_labels = {};
	data.fields_array = data.fields.split(',');

	// use GlideRecord to get field labels vs. GlideRecordSecure
	var grForLabels = new GlideRecord(data.table);
	for (var i in data.fields_array) {
		var field = data.fields_array[i];
		var ge = grForLabels.getElement(field);
		if (ge == null)
			continue;

		data.column_labels[field] = ge.getLabel();
	}

	data.list = [];
	while (gr._next()) {
		var record = {};
		$sp.getRecordElements(record, gr, data.fields);
		if (gr instanceof FilteredGlideRecord) {
			// FilteredGlideRecord doesn't do field-level
			// security, so take care of that here
			for (var f in data.fields_array) {
				var fld = data.fields_array[f];
				if (!gr.isValidField(fld))
					continue;

				if (!gr[fld].canRead()) {
					record[fld].value = null;
					record[fld].display_value = null;
				}
			}
		}
		record.sys_id = gr.getValue('sys_id');
		data.list.push(record);
	}

	data.enable_filter = (input.enable_filter == true || input.enable_filter == "true" ||
		options.enable_filter == true || options.enable_filter == "true");
	var breadcrumbWidgetParams = {
		table: data.table,
		query: data.filter,
		enable_filter: data.enable_filter
	};
	data.filterBreadcrumbs = $sp.getWidget('widget-filter-breadcrumbs', breadcrumbWidgetParams);

	// copy to data from input or options
	function optCopy(names) {
		names.forEach(function(name) {
			data[name] = input[name] || options[name];
		})
	}

})();
