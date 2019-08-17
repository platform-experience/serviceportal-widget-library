(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	// Get current user for quick filtering of data to user only
	var currentUser = gs.getUser(); 
	
	data.limit = 6;
	data.title = options.title || "Popular Items";
	data.show_recent = (options.show_recent=='true');
	
	/* Data Variables */
	data.missingConfig = false;

	data.portal_record = $sp.getPortalRecord();
	
	var recent_by = options.recent_by || 'view';

	function getPopularItems () {
		var catalog = $sp.getValue('sc_catalog');
	
		var items = [];
		var catItems = [];
		var item = {};
		var catalogItemJS,catItemDetails;
		
		var count = new GlideAggregate('sc_req_item');
		count.addAggregate('COUNT','cat_item');
		count.groupBy('cat_item');
		count.addQuery('cat_item.sys_class_name', 'NOT IN', 'sc_cat_item_guide,sc_cat_item_wizard,sc_cat_item_content');
		count.addQuery('cat_item.sc_catalogs', 'IN', catalog);
		count.addEncodedQuery('cat_item.hide_sp=false^ORcat_item.hide_spISEMPTY');
		count.orderByAggregate('COUNT', 'cat_item');
		count.query();
		while (count.next() && items.length < data.limit) {
			catalogItemJS = new sn_sc.CatItem(count.cat_item.sys_id);
			if (!catalogItemJS.canView(gs.isMobile()) || !catalogItemJS.isVisibleServicePortal())
				continue;
			item = {};
			catItemDetails = catalogItemJS.getItemSummary();

			item.order = 0 - count.getAggregate('COUNT', 'cat_item');
			item.name = catItemDetails.name;
			item.short_description = catItemDetails.short_description;
			item.sys_id = catItemDetails.sys_id;
			item.page = catItemDetails.type == 'order_guide'? 'sc_cat_item_guide' : 'sc_cat_item';
			catItems.push(item);
		}

		var producers = 0;
		var prodItems = [];
		count = new GlideAggregate('sc_item_produced_record');
		count.addQuery('producer.sc_catalogs', 'IN', catalog);
		count.addEncodedQuery('producer.hide_sp=false^ORproducer.hide_spISEMPTY');
		count.addAggregate('COUNT', 'producer');
		count.groupBy('producer');
		count.orderByAggregate('COUNT', 'producer');
		count.query();
		while (count.next() && producers < data.limit) {
			catalogItemJS = new sn_sc.CatItem(count.getValue('producer'));
			if (!catalogItemJS.canView(gs.isMobile()) || !catalogItemJS.isVisibleServicePortal())
				continue;
			catItemDetails = catalogItemJS.getItemSummary();
			item = {};

			item.order = 0 - count.getAggregate('COUNT', 'producer');
			item.name = catItemDetails.name;
			item.short_description = catItemDetails.short_description;
			item.sys_id = catItemDetails.sys_id;
			item.page = catItemDetails.type == 'order_guide'? 'sc_cat_item_guide' : 'sc_cat_item';
			prodItems.push(item);
			producers++;
		}

		if (catItems.length == 0)
			return prodItems;
		if (prodItems.length == 0)
			return catItems;

		items = [];
		for (var i=0; i < data.limit/2; i++) {
			if (i < catItems.length){
				items.push(catItems[i])
			}
		}

		if(items.length < (data.limit/2)){
			var limit = (data.limit - items.length);
			for (var i=0; i < limit; i++) {
				if (prodItems[i]){
					items.push(prodItems[i])
				}
			}
		}else{
			for (var i=0; i < data.limit/2; i++) {
				if (i < prodItems.length){
					items.push(prodItems[i])
				}
			}	
		}

		return items;
	}

	function getRecentItems(){
		var recent = new GlideAggregate('sp_log');
		recent.addAggregate('COUNT', 'id');
		if (recent_by === 'view'){
			recent.addEncodedQuery('userDYNAMIC90d1921e5f510100a9ad2572f2b477fe^type=Cat Item View^sys_created_onONThis quarter@javascript:gs.beginningOfThisQuarter()@javascript:gs.endOfThisQuarter()');
		}else{
			recent.addEncodedQuery('userDYNAMIC90d1921e5f510100a9ad2572f2b477fe^type=Cat Item Request^sys_created_onONThis quarter@javascript:gs.beginningOfThisQuarter()@javascript:gs.endOfThisQuarter()');
		}

		recent.groupBy('id');
		recent.orderByAggregate('COUNT', 'id');
		recent.query();
		var recentItems = [];
		var catalog = $sp.getValue('sc_catalog');

		data.showPrices = $sp.showCatalogPrices();

		while (recent.next() && recentItems.length < data.limit) {
			var catalogItemJS = new sn_sc.CatItem(recent.getValue('id'));
			if (!catalogItemJS.canView(gs.isMobile()) || !catalogItemJS.isVisibleServicePortal())
				continue;
			var item = {};
			var catItemDetails = catalogItemJS.getItemSummary();
			var inCatalog = false;
			for (var i=0; i<catItemDetails.catalogs.length; i++) {
				if (catItemDetails.catalogs[i].sys_id == catalog) {
					inCatalog = true;
					break;
				}
			}
			if (inCatalog) {
				item.name = catItemDetails.name;
				item.short_description = catItemDetails.short_description;
				item.picture = catItemDetails.picture;
				item.price = catItemDetails.price;
				item.sys_id = catItemDetails.sys_id;
				item.hasPrice = item.price != 0;
				item.page = catItemDetails.type == 'order_guide'? 'sc_cat_item_guide' : 'sc_cat_item';
				recentItems.push(item);
			}
		}

		return recentItems;
	}

	

	try{
		if(data.show_recent){
			data.title = "My Recent Items";
			data.items =  getRecentItems();
		}else{
			data.items = getPopularItems();
		}
	}catch(e){
		/*
			If for any reason something above errors, then lets at least show a message in the Panel's Body that there 
			is a problem.  And, post a message to the browser with what the problem is.
		*/
		data.missingConfig = true;
		data.err_msg = e;
		//gs.addErrorMessage('Portal: ' + data.portal_record.getDisplayValue('url_suffix') + " Message: " + e );
		return;
	}

})();