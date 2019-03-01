function ($scope,$el,$attrs,$ctrl) {
	var lazyLoader = $injector.get("lazyLoader");
	lazyLoader.putTemplates($scope.data.typeaheadTemplates);
	
}