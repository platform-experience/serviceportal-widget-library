(function() {
	var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
	var tableName = serverOptions.table || options.table;
	var encodedQuery = serverOptions.encoded_query || options.encoded_query;
	var emailField = serverOptions.email_address_field || options.email_address_field
	data.user_email = "jet.wheeler@servicenow.com";
	data.password = "password";

	var userGR = new GlideRecord(tableName);
	userGR.addEncodedQuery(encodedQuery);
	userGR.query();
	if (userGR.next()) {
		data.user_email = userGR.getDisplayValue(emailField).toString();
	}
})();