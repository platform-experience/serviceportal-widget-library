function($scope, $location) {
	
	$scope.goItem = function(item){
		$location.url('?id=' + item.page + '&sys_id=' + item.sys_id);
	}
}