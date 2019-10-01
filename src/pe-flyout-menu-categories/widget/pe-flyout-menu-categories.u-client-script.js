function flyoutMenuCategoriesController($scope, spUtil,$uibModal, $timeout, $rootScope) {
	var c = this;
	var optionsCat = c.data.optionsCat;
	$scope.showSelectedPanel = false;
	c.showPanel = function(panelName){
		$scope[panelName] = true;
		$rootScope.$broadcast('sendEventData', c.data.optionsCat);
	};
	c.closePanel = function(panelName){
		$scope[panelName] = false;
	};

}
