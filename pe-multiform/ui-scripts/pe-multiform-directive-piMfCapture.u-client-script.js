PiMf.directive('piMfCapture', function piMfCapture(PiMfManager) {

	'use strict';

	return {
		link: link
	};

	function link (scope, elem, attrs) {

		/** This event will be emitted by spModel when it's finished loading */
		scope.$on('spModel.gForm.initialized', function(e, gFormInstance) {

			/** Register the child form, and all it's items */
			PiMfManager.addChild(attrs.piMfcChild,
				attrs.piMfcIndex,
				scope.formModel,
				gFormInstance,
				scope.child.referenceToParent);
		});
	}
});