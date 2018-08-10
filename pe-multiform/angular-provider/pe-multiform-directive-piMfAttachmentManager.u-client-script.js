function piMfAttachmentManager (i18n) {
	
	'use strict';
	
	return {
		templateUrl: 'pi-mf-attachment-manager',
		restrict: 'E',
		replace: true,
		scope: {
			table: "=",
			sysId: "=",
			omitEdit: "="
		},
		link: function(scope, elem, attr) {
			i18n.getMessages(['Attachment',
							  'Enable edit mode on attachments',
							  'Finish editing attachments',
							  'Edit',
							  'Done',
							  'Attachments',
							  'Delete'], function(msgArr){
				scope.translations = msgArr;
			});
		},
		controller: function($scope, snAttachmentHandler) {
			var cacheMap = {};
			
			$scope.attachments = [];
			$scope.translations = [];
			var attachmentHandler;

			function initializeAttachmentHandler() {
				
				$scope.editMode = false;
				
				var key = $scope.table + '.' + $scope.sysId;
				
				var cached = cacheMap[key];
				
				if(cached) {
					attachmentHandler = cached.handler;
					$scope.attachments = cached.attachments;
					return;
				}
				
				attachmentHandler = snAttachmentHandler.create($scope.table, $scope.sysId);
				
				attachmentHandler.getAttachments().then(function(response) {
					$scope.attachments = response;
				});
				
				cacheMap[key] = {
					handler: attachmentHandler,
					attachments: $scope.attachments
				};
			}

			$scope.getAttachmentURL = function(attachment) {
				return (attachment.isImage) ? attachment.sys_id + ".iix" : snAttachmentHandler.getViewUrl(attachment.sys_id);
			};

			$scope.removeAttachment = function(e, attachment) {
				e.stopPropagation();
				e.preventDefault();

				attachmentHandler.deleteAttachment(attachment).then(function() {
					if ($scope.attachments.length === 0)
						$scope.editMode = false;
				});
			};

			$scope.$watch("sysId", initializeAttachmentHandler);

			$scope.$on("sp.attachments.update", function(e, recordID) {
				if (recordID !== $scope.sysId)
					return;

				attachmentHandler.getAttachments().then(function(response) {
					$scope.attachments = response;
				});
			});

			var extIconMap = {
				'ppt': 'fa-file-powerpoint-o',
				'pptx': 'fa-file-powerpoint-o',
				'doc': 'fa-file-word-o',
				'docx': 'fa-file-word-o',
				'xls': 'fa-file-excel-o',
				'xlsx': 'fa-file-excel-o'
			};

			var fileIconMap = {
				'image/jpeg': 'fa-file-image-o',
				'image/pjpeg': 'fa-file-image-o',
				'image/tiff': 'fa-file-image-o',
				'image/png': 'fa-file-image-o',
				'image/gif': 'fa-file-image-o',
				'application/zip': 'fa-file-archive-o',
				'application/x-compressed': 'fa-file-archive-o',
				'application/x-zip-compressed': 'fa-file-archive-o',
				'application/pdf': 'fa-file-pdf-o',
				'application/vnd.openxmlformats-officedoc': 'fa-file-word-o',
				'application/msword': 'fa-file-word-o',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fa-file-word-o',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'fa-file-word-o',
				'application/excel': 'fa-file-excel-o',
				'application/vnd.ms-excel': 'fa-file-excel-o',
				'application/x-excel': 'fa-file-excel-o',
				'application/x-msexcel': 'fa-file-excel-o',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa-file-excel-o',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'fa-file-excel-o',
				'application/powerpoint': 'fa-file-powerpoint-o',
				'application/vnd.ms-powerpoint': 'fa-file-powerpoint-o',
				'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'fa-file-powerpoint-o',
				'application/vnd.openxmlformats-officedocument.presentationml.template': 'fa-file-powerpoint-o',
				'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'fa-file-powerpoint-o'
			};

			$scope.getIcon = function(contentType, ext) {
				return extIconMap[ext] || fileIconMap[contentType] || "fa-file-o";
			};

			initializeAttachmentHandler();
		}
	};
}