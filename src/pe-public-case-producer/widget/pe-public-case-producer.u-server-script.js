(function() {
	if(input){
		
		var contact = new GlideRecord('csm_consumer');
		contact.addQuery('email', input.email);
		contact.query();
		if(contact.next()){
			createCase(contact);
		} else{
			var newContact = new GlideRecord('csm_consumer');
			newContact.initialize();
			newContact.first_name = input.firstName;
			newContact.last_name = input.lastName;
			newContact.email = input.email;
			newContact.mobile_phone = input.phone;
			newContact.street = input.street;
			newContact.zip = input.zip;
			newContact.city = input.city;
		
			newContact.state = input.state;
			newContact.u_dob = input.month + " " + input.day + ", " + input.year;
			newContact.insert();

			var createdContact = new GlideRecord('csm_consumer');
			createdContact.addQuery('email', input.email);
			createdContact.query();
			if(createdContact.next()){
				createCase(createdContact);
			}
		}
		gs.addInfoMessage("");

	}

	function createCase(user){
		var newCase = new GlideRecord('sn_customerservice_case')

		newCase.initialize();
		newCase.x_snc_contact_us_w_u_contact_method = input.contactMethod;
		newCase.short_description = input.subject;
		newCase.description = input.comments;
		newCase.state = 10;
		newCase.contact = user.sys_id;

		newCase.insert();
	}
	
})();