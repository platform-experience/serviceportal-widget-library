(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	if(!input){
		//$sp.log("in if, name is "+input.name);

		data.impersonationUsers = [];
		var gr = new GlideRecord('u_impersonation_set');
		gr.addActiveQuery();
		gr.query();
		if(gr.next()){
			var m2mGr = new GlideRecord('u_m2m_users_impersonation_sets');
			m2mGr.addQuery('u_impersonation_set', gr.getDisplayValue('sys_id'));
			m2mGr.query();
			while(m2mGr.next()){
				var temp = {};
					temp.sys_id = m2mGr.u_user.sys_id.getDisplayValue();
					temp.name = m2mGr.u_user.name.getDisplayValue();
					temp.user_id = m2mGr.u_user.user_name.getDisplayValue();
					data.impersonationUsers.push(temp);
				}
			$sp.log(data.impersonationUsers);
			}
		} else if(input.name) {
			gs.info("in else, name is "+input.name);
			data.old_user = session.onlineImpersonate(input.name);
		}





	})();