(function() {
		
	data.user_sys_id = options.user_sys_id || input.user_sys_id;
	
	var userGR = new GlideRecord('sys_user');
	userGR.addQuery('sys_id',data.user_sys_id);
	userGR.query();

	while(userGR.next()){
		data.user_first_name = userGR.getDisplayValue('first_name');
		data.user_last_name = userGR.getDisplayValue('last_name');
		data.user_full_name = userGR.getDisplayValue('name');
		data.user_job_title = userGR.getDisplayValue('title');
		data.user_photo = userGR.getDisplayValue('photo');
		data.user_initials = data.user_first_name.charAt(0) + data.user_last_name.charAt(0);		
	}
	
	data.show_only_picture = options.show_only_picture || input.only_picture;
	data.show_job_title = options.show_job_title || input.show_job_title;

})();