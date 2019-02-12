function($scope,$window) {
  /* widget controller */

	$scope.profile = {
		userID: $scope.user.sys_id,
		name: $scope.user.name,
		initials: $window.NOW.user_initials
	};

	var today = new Date();
	var curHr = today.getHours();

	if (curHr < 12) {
		$scope.timeOfDay =  'morning';
	} else if (curHr < 18) {
		$scope.timeOfDay = 'afternoon';
	} else {
		$scope.timeOfDay = 'evening';
	}
	
}