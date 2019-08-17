function attachMate($scope, nowAttachmentHandler, $rootScope, spUtil, spModal, $log, spAriaUtil, $filter) {
	var popupCurrent = undefined;
	$scope.errorMessages = [];
	$scope.attachmentHandler = new nowAttachmentHandler(setAttachments, appendError);
	$scope.data.action = "";

	spUtil.recordWatch($scope, "sys_attachment", "table_sys_id=" + $scope.data.sys_id, function(name, data) {
		$scope.attachmentHandler.getAttachmentList();
	});

	$scope.$evalAsync(function() {
		$scope.attachmentHandler.setParams($scope.data.table, $scope.data.sys_id, 1024 * 1024 * $scope.data.maxAttachmentSize);
		$scope.attachmentHandler.getAttachmentList();
	})

	$scope.hasAttachments = function() {
		return $scope.attachments && $scope.attachments.length != 0;
	}

	$scope.canWrite = function() {
		return $scope.data.canWrite;
	}

	$scope.confirmDeleteAttachment = function(attachment) {
		spModal.confirm("${Delete Attachment?}").then(function() {
			$scope.attachmentHandler.deleteAttachment(attachment);
		})
	}

	$scope.$on('dialog.upload_too_large.show', function(e){
		$log.error($scope.data.largeAttachmentMsg);
		spUtil.addErrorMessage($scope.data.largeAttachmentMsg);
	});

	$scope.$on('added_attachment', function(evt) {
		$scope.data.action = "added";
		spUtil.update($scope);
	});

	$scope.$on('sp.record.can_write', function(evt, answer) {
		$scope.data.canWrite = answer;
	});
	$scope.openEmailPopup = function(){
		closePopup();
		var width = 875;
		var height = 575;
		var url = "/x_snc_ec_attach_send_email.do?";
		url += "record_id=" + $scope.data.sys_id;
		url += "&table_name=" + $scope.data.table;
		url += "&attachments=" + $filter('filter')($scope.attachments,{'selected':true}).map(function(attachment){
			return attachment.sys_id.toString();
		});
		var features = "width=" + width + ",height=" + height + ",toolbar=no,status=no,directories=no,menubar=no,resizable=yes,scrollbars=1";
		popupCurrent = window.open(url,"Email_Client",features,false);
		
	}
	function closePopup(){
		if (!popupCurrent)
			return;
		try {
			if (!popupCurrent.closed)
				popupCurrent.close();
		} catch (e) {}
		popupCurrent = null;
	}
	function appendError(error) {
		$scope.errorMessages.push(error);
		spUtil.addErrorMessage(error.msg + error.fileName);
	}

	function setAttachments(attachments, action) {
		if ($scope.submitting == true)
			return;

		$scope.attachments = attachments;
		if (!action)
			return;

		if (action === "added") {
			spAriaUtil.sendLiveMessage($scope.data.attachmentSuccessMsg);
		}

		$scope.data.action = action;
		spUtil.update($scope);
	}
}