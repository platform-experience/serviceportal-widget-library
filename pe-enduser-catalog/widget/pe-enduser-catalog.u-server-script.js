(function() {
	data.categories = [];
	var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	var encodedQuery = serverOptions.encoded_query || options.encoded_query;
	var queryForCategories = serverOptions.additional_query_for_categories || options.additional_query_for_categories;
	var queryForItems = serverOptions.additional_query_for_items || options.additional_query_for_items;
	var colorClasses = ["blue", "green", "yellow", "red"];
	var col = 0;
	var catalogGR = new GlideRecord("sc_catalog");
	catalogGR.addEncodedQuery(encodedQuery);
	catalogGR.query();
	if (catalogGR.next()) {
		var sysID = catalogGR.sys_id.toString();
		var categoriesGR = new GlideRecord("sc_category");
		categoriesGR.addQuery("sc_catalog", sysID);
		categoriesGR.addEncodedQuery(queryForCategories)
		categoriesGR.query();
		while (categoriesGR.next()) {
			var categoryID = categoriesGR.sys_id.toString();
			var category = {
				sys_id: categoryID,
				title: categoriesGR.title.toString(),
				items: []
			}
			var itemGR = new GlideRecord("sc_cat_item_category");
			itemGR.addQuery("sc_category", categoryID);
			itemGR.addEncodedQuery(queryForItems);
			itemGR.query();
			while (itemGR.next()) {
				category.items.push({
					title: itemGR.sc_cat_item.name.toString(),
					short_desc: itemGR.sc_cat_item.short_description.nil() ? "" : itemGR.sc_cat_item.short_description.toString(),
					image: itemGR.sc_cat_item.icon.getDisplayValue(),
					sys_id: itemGR.sc_cat_item.sys_id.toString(),
					color_class: colorClasses[col],
					demo_item: itemGR.sc_cat_item.demo_item.toString() == "true"
				});
				col++;
				if (col == 4) {
					col = 0;
				}
			}
			data.categories.push(category);
		}
	}
})();