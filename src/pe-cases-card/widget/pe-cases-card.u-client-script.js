function($scope, $filter, $window, $rootScope) {
	/* widget controller */
	var c = this;

	c.getColor = function(state) {
		switch(state) {
			case 'New': 
				return 'gray';
			case 'Open':
				return 'gray';
			case 'Awaiting Info':
				return 'blue';
			case'Resolved':
				return 'green';
			case 'Closed':
				return 'green';
			case 'Cancelled':
				return 'red';
			default:
				return 'gray';

		}
	}
	c.pageSize = 12;

}