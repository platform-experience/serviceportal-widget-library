function ContactUsController($scope, spModal){
	var c = this;
	c.$onInit = function(){
		c.reply = "Yes";
		c.index = 0;
		c.imgIndex = 0;
		c.contactIndex = 0;
		c.firstName = "";
		c.lastName = "";
		c.email = "";
		c.phone = "";
		c.street = "";
		c.zip = "";
		c.city = "";
		c.state = "";
		c.year = "";
		c.month = "";
		c.day = "";
		c.subject = "";
		c.comments = "";


	}
	c.submit = function(){
		if(c.imgIndex == 0){
			c.reason = "praise";				
		} else if(c.imgIndex == 1){
			c.reason = "complaint"
		} else if(c.imgIndex == 2){
			c.reason = "rebate status"
		} else if(c.imgIndex == 3){
			c.reason = "current case"
		}
		if(c.reply == "Yes"){
			if(c.contactIndex == 0){
				c.contactMethod = "email";				
			} else if(c.contactIndex == 1){
				c.contactMethod = "sms"
			} else if(c.contactIndex == 2){
				c.contactMethod = "letter"
			} 
		} else{
			c.contactMethod = "don't";
		}
		if(c.email && c.firstName && c.lastName && 
			 c.phone && c.street && c.city && c.state &&
			 c.zip && c.year && c.month && c.day){

			c.server.get({
				reason: c.reason,
				firstName: c.firstName,
				lastName: c.lastName,
				email: c.email,
				phone: c.phone,
				street: c.street,
				zip: c.zip,
				city: c.city,
				state: c.state,
				year: c.year,
				month: c.month,
				day: c.day,
				contactMethod: c.contactMethod,
				subject: c.subject,
				comments: c.comments
			}).then(function(){
				spModal.alert("Thank you for submitting your request.");
			})
		} else{
			spModal.alert("Please fill in the required fields");
		}
	};
	

}