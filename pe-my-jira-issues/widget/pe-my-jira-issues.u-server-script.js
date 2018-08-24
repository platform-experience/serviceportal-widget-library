if (input && input.jira) {
	getMyIssues();
}

function getMyIssues(assignee) {
	try {
		$sp.log(options.issues);
		var r = new sn_ws.RESTMessageV2('x_snc_jira_issues.JIRA Issues', 'GET');
		if(options.issues == 'Created by me'){
			r.setStringParameterNoEscape('querykey', 'creator');
		}else{
			r.setStringParameterNoEscape('querykey', 'assignee');
		}
		//Assuming you used your servicenow email to sign up for JIRA ex: abel.tuter@servicenow.com.
		r.setStringParameterNoEscape('queryvalue', gs.getUserName());
		r.setStringParameterNoEscape('id', gs.getProperty('x_snc_jira_issues.AtlassianId'));
		var response = r.execute();
		data.responseBody = JSON.parse(response.getBody());
		var httpStatus = response.getStatusCode();
	} catch (ex) {
		var message = ex.message;
	}
}