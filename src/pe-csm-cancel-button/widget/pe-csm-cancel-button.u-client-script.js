function($scope, spUtil) {
  var c = this;
	
	spUtil.recordWatch($scope, $scope.data.table, "sys_id=" +  $scope.data.sys_id);
	
	c.uiAction = function(action){
		c.data.action = action;
		c.server.update().then(function() {
			c.data.action = undefined;
		})
	}
}