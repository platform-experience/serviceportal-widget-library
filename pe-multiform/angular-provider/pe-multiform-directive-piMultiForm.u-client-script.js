function piMultiForm(PiMfManager, spUtil) {
	
	'use strict';

	return {
		controller: piMultiFormCtrl
	};

	function piMultiFormCtrl($scope, PiMfManager) {

		/** We will use this to show only the selected container's fields */
		$scope.getSelectedContainer = PiMfManager.getSelectedContainer;
	}
}