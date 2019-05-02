function(scope, elem) {

	var $timeout = $injector.get('$timeout');

	scope.implementSelect2 = function() {
		$timeout(function() {
			var qs = elem.find('#quantitySelector');
			qs.select2();
			scope.isSelect2 = true;
		});
	}

}