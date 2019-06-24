function($scope,$window) {
  /* widget controller */
	var c = this;
	function isXSScreenSize() {
		return $window.matchMedia('(max-width: 767px)').matches;
	}

	$scope.wide_view = true;
	$scope.show_panel = 0;
	
	if(isXSScreenSize()){
		$scope.wide_view = c.data.mobile_scale;
		c.data.display_size = 'small';
	}
	
	if(c.data.table && c.data.table.length>0){
		if(c.data.field && c.data.field.length>0){
			if(c.data.process && c.data.process.steps>0){
				$scope.show_panel = 2;
			}else{
				$scope.show_panel = 1;
			}
		}
	}
		
}