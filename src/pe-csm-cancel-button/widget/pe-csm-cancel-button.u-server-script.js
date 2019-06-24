(function() {
  
	data.table = input.table || $sp.getParameter("table");
	data.sys_id = input.sys_id || $sp.getParameter("sys_id");
	
	gr = new GlideRecord(data.table);
	if (!gr.isValid())
		return;
	
	if(!gr.get(data.sys_id))
		return;
	
	//show button unless state is closed, canceled, resolved
	data.state = gr.getValue('state');
	data.showCancel = (data.state != '7' && data.state != '6' && data.state != '3') ? true: false;

	if (input && input.action) {
		var action = input.action;
		
		if(data.table ==  'sn_customerservice_case') {
			if(action == 'cancel') {
				gr.setValue('state', 7); //set state to cancelled
				gr.setValue('resolution_code', 9); //set resolution code to void/canceled
				gr.update();
				gs.addErrorMessage('Case has been CANCELED');
			}
		}
	}

})();