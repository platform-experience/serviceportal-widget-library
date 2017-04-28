function EnrollmentCtrl($scope, $http) {
	var c = this;
	
	c.percentage = c.data.u_contribution;
	
	c.enroll = function(percentage) {
		c.percentage = percentage;
		c.server.get({
			action: 'enroll',
			percentage: c.percentage
		}).then(function(response) {

		});
	}
}