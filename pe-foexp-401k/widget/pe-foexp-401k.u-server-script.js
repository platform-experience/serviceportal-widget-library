(function() {
    var user_id = gs.getUserID();
    var gr;

    if (input.action == 'enroll') {
        gr = new GlideRecord('u_401k_enrollments');
        gr.addQuery('u_user', user_id);
        gr.setLimit(1);
        gr.query();
        if (gr.getRowCount() == 0) {
            gr = new GlideRecord('u_401k_enrollments');
            gr.u_contribution = input.percentage;
            gr.u_user = user_id;
            data.sys_id = gr.insert();
        } else {
            gr.next();
            gr.u_contribution = input.percentage;
            gr.update();
            data.sys_id = gr.sys_id.toString();
        }
        return;
    }
	
    gr = new GlideRecord('u_401k_enrollments');
    gr.addQuery('u_user', user_id);
    gr.setLimit(1);
    gr.query();
	
	 if (gr.getRowCount() > 0) {
		 gr.next();
		 data.u_contribution = gr.u_contribution.toString();
	 }
})();