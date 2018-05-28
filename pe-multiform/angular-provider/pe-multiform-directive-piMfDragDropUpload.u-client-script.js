function piMfDragDropUpload($http, $document, PiMfUpload) {
	
	'use strict';

	return {
		link: link
	};

	function link (scope, elem, attrs) {

		/** Grab the "upload mask" element */
		var mask = elem.find('.pimf-drag-drop-mask');

		/** Stop the default behaviour of dragging */
		elem.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});

		/** When a file is dragged over, show the "upload mask" */
		elem.on('dragover dragenter', function (e) {
			elem.addClass('is-dragover');
		});

		/** Hide the "upload mask" when the dragging stops, file is dropped, or mouse leaves */
		mask.on('dragleave dragend drop', function (e) {
			elem.removeClass('is-dragover');
		});

		/** When a file/files are dropped... */
		mask.on('drop', function (e) {
			
			/** ... get the files... */
			var files = e.originalEvent.dataTransfer.files;

			/** ... and upload them */
			PiMfUpload.upload(files).then(function (data) {
				scope.$broadcast('sp.attachments.update', data.config.params.sys_id);
			});
		});
	}
}