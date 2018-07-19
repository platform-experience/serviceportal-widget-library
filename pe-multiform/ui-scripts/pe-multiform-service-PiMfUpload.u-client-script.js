PiMf.service('PiMfUpload', function piMfUpload ($http, $q, $window) {
	
	'use strict';

	var attachmentGuid;
	var tableName;
	
	return {
		upload: upload,
		init: init
	};

	function init(table, sysId) {
		attachmentGuid = sysId;
		tableName = table;
	}

	function upload(files) {

		return $q(function (success, failure) {

			Array.prototype.forEach.call(files, function(file) {

				var fd = new $window.FormData();
				fd.append('attachments_modified', true);
				fd.append('sysparm_table', tableName);
				fd.append('sysparm_sys_id', attachmentGuid);
				fd.append('sysparm_nostack', 'yes');
				fd.append('sysparm_encryption_context', '');
				fd.append('sysparm_ck', $window.g_ck);
				fd.append('attachFile', file);

				$http.post('/angular.do', fd, {
					transformRequest: $window.angular.identity,
					params: {
						'sysparm_type': 'ngk_attachments',
						'table': tableName,
						'sys_id': attachmentGuid,
						'action': 'add'
					},
					headers: {
						'X-UserToken' : $window.g_ck,
						'Content-Type': undefined
					}
				}).then(function (response) {
					success(response);
				});

			});

		});
	}
});