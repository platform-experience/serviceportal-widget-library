(function () {
	var gr = new GlideRecord('u_user_debit_details');
	var user_id = gs.getUserID();
	gr.addQuery('u_user', user_id);
	gr.setLimit(1);
	gr.query();
	
	if (input.action == 'submit') {
		if (gr.getRowCount() > 0) {
			gr.next();
			gr.u_bank = input.bank;
			gr.u_routing = input.routing;
			gr.u_account = input.account;
			gr.update();
			data.bank = gr.u_bank.toString();
			data.routing = gr.u_routing.toString();
			data.account = gr.u_account.toString();
		} else {
			gr = new GlideRecord('u_user_debit_details');
			gr.u_user = user_id;
			gr.u_bank = input.bank;
			gr.u_routing = input.routing;
			gr.u_account = input.account;
			gr.insert();
			data.bank = gr.u_bank.toString();
			data.routing = gr.u_routing.toString();
			data.account = gr.u_account.toString();
		}
	} else {
		if (gr.getRowCount() > 0) {
			gr.next();
			data.bank = gr.u_bank.toString();
			data.routing = gr.u_routing.toString();
			data.account = gr.u_account.toString();
		}
	}
})();