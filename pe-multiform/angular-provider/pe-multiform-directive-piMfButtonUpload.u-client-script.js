function piMfButtonUpload ($document, PiMfUpload, $window) {
	
	'use strict';

	return {
		link: link
	};

	function link (scope, elem, attrs) {

		/** Create an input element */
		var fileInput = $window.angular.element('<input/>');
		fileInput.attr('type', 'file');
		fileInput.attr('multiple', '');

		/** when clicking the DOM element this directive is attached to... */
		elem.on('click', function () {
			/** ... click the input element */
			fileInput.click();
		});

		/** When a file is selected */
		fileInput.on('change', function (event) {

			/** Upload the file */
			PiMfUpload.upload(fileInput[0].files).then(function (data) {
				scope.$broadcast('sp.attachments.update', data.config.params.sys_id);
			});
		});
	}
}