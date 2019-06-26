function ($log, $scope, $element, $document, spModal, $q, $timeout, $window) {
	'use strict';

	/* widget controller */
	var $ctrl = this;
	var $spContainer = $document.find('.sp-page-root');
	var $widgetParent = $element.parent();

	$ctrl.isWindowVisible = false;
	$ctrl.hasUnreadMessages = false;
	$ctrl.firstPress = false;
	$ctrl.vaSource = '';


	$ctrl.toggleWindow = function () {
		if ($ctrl.isWindowVisible) {
			$ctrl.isWindowVisible = false;
			$timeout(function () {
				if (!$ctrl.isWindowVisible) {
					$element.find('.conversation-container').css("display", "none");
					$element.find('.sn-connect-floating').css("display", "none");
					$element.find('.sn-connect-floating-wrapper').css("display", "none");

					// ios overlay hacky fix.
					$document.find('.touch_scroll').css("-webkit-overflow-scrolling", "touch");
				}
			}, 300);
		} else {
			if (!$ctrl.firstPress) {
				$ctrl.firstPress = true;
				$ctrl.vaSource = '/$sn-va-web-client-app.do?sysparm_nostack=true&sysparm_stack=no';
				if ($ctrl.options.va_url_params) {
					$ctrl.vaSource = $ctrl.vaSource + '&' + $ctrl.options.va_url_params;
				}
			}
			$ctrl.isWindowVisible = true;
			$ctrl.hasUnreadMessages = false;
			$element.find('.conversation-container').css("display", "block");
			$element.find('.sn-connect-floating').css("display", "block");
			$element.find('.sn-connect-floating-wrapper').css("display", "block");

			// ios overlay hacky fix.
			$document.find('.touch_scroll').css("-webkit-overflow-scrolling", "auto");
		}
	};

	$window.addEventListener("message", function (e) {
		if (e.data === 'sn-va-web-client-app-new-message' && $ctrl.isWindowVisible === false) {
			$ctrl.hasUnreadMessages = true;
		} else if (e.data === 'sn-va-web-client-app-trigger-login') {
			$window.location.reload(true);
		}
	});

	$element.find('.help-button').on("mouseup", function (e) {
		e.target.blur();
		e.stopPropagation();
	});

	$element.find('.help-icon').on("mouseup", function (e) {
		e.target.blur();
		e.stopPropagation();
	});

	$ctrl.openWindow = function () {
		$ctrl.isWindowVisible = true;
		// delay before clearing unread message indicator
		// in-case user opens and closes quickly
		$timeout(function () {
			if ($ctrl.isWindowVisible) {
				$ctrl.hasUnreadMessages = false;
			}
		}, 500);
	};

	var _closeWindow = function () {

		$ctrl.isWindowVisible = false;
		$ctrl.hasActiveConversation = false;
	};
}