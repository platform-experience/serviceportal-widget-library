function ($scope,$el,$attrs,$ctrl) {
	
	var lazyLoader = $injector.get("lazyLoader");
	lazyLoader.putTemplates($scope.data.typeaheadTemplates);

	$scope.focusInput = focusInput;
	
	function focusInput () {
		$el.find('input[name="q"]').focus();
	}
	
}