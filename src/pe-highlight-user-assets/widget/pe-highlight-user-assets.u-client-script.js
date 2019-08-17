function($scope,$location) {
	/* widget controller */
	var c = this;
	
	$scope.goPanel = function(item){
		var href = '?id='+ $scope.data.instance_table.detail_page +'&table='+ $scope.data.instance_table.name +'&sys_id=' + item.sys_id.value;
		$location.url(href);
	}

	//Change the expiry date format
	$scope.data.instance_table.dataSet.forEach(function(item) {
		if (item.expires !== '') {
			item.expires = moment(item.expires).format('MMM D YYYY');
		}
	});
}