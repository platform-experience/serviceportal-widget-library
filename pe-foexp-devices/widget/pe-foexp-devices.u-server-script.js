(function() {
	var laptopsSysId = 'd258b953c611227a0146101fb1be7c31';
	var phonesSysId = 'd68eb4d637b1300054b6a3549dbe5db2';
	var tabletsSysId = 'b06546f23731300054b6a3549dbe5dd8';
	
	var obj = {};
	var regex = /(<([^>]+)>)/ig
	
	
	
	if (input.action == 'getItems') {
		
		var gr = new GlideRecord('sc_cat_item');
		
		if (input.type == 'laptops') {
			gr.addQuery('category', laptopsSysId);
		} else if (input.type == 'phones') {
			gr.addQuery('category', phonesSysId);
		} else if (input.type == 'tablets') {
			gr.addQuery('category', tabletsSysId);
		} else {
			return;
		}
		
		gr.query();
		
		var items = [];
		while (gr.next()) {
			obj = {};
			obj.sys_id = gr.sys_id.toString();
			obj.title = gr.getDisplayValue();
			obj.description = gr.description.toString().replace(regex,'');
			
			obj.picture = gr.picture.getDisplayValue();
			items.push(obj)
		}

		data.items = items;
		
		return;
	}
	
	var laptops, phones, tablets = 0;
	
	var count = new GlideAggregate('sc_req_item');
	count.addQuery('cat_item.category', laptopsSysId);
	count.addQuery('requested_for', gs.getUserID());
	count.addAggregate('COUNT');
	count.query();
	
	if (count.next())
		laptops = count.getAggregate('COUNT');
	
	count = new GlideAggregate('sc_req_item');
	count.addQuery('cat_item.category', phonesSysId);
	count.addQuery('requested_for', gs.getUserID());
	count.addAggregate('COUNT');
	count.query();
	
	if (count.next())
		phones = count.getAggregate('COUNT');
	
	count = new GlideAggregate('sc_req_item');
	count.addQuery('cat_item.category', tabletsSysId);
	count.addQuery('requested_for', gs.getUserID());
	count.addAggregate('COUNT');
	count.query();
	
	if (count.next())
		tablets = count.getAggregate('COUNT');
	
	data.complete = {};
	data.complete.laptops = laptops > 0 ? true : false;
	data.complete.phones = phones > 0 ? true : false;
	data.complete.tablets = tablets > 0 ? true : false;

})();