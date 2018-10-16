function($log, $scope, $element, $document, spModal, $q, $timeout, $window) {
	'use strict';

	/* widget controller */
	var $fvp = this;
	var $spContainer = $document.find('.sp-page-root');
	var $widgetParent = $element.parent();

	$fvp.alt_icon = ($fvp.options.use_retina_icon=='true');
	$fvp.isWindowVisible = false;
	$fvp.hasUnreadMessages = false;
	$fvp.firstPress = false;
	$fvp.source = '';
	
	$fvp.toggleWindow = function() {
		if ($fvp.isWindowVisible) {
			$fvp.isWindowVisible = false;
			$timeout(function() {
				if (!$fvp.isWindowVisible) {
					$element.find('.fvp-container').css("display", "none");
					$element.find('.fvp-outer-wrapper').css("display", "none");
					$element.find('.fvp-wrapper').css("display", "none");

					// ios overlay hacky fix.
					$document.find('.touch_scroll').css("-webkit-overflow-scrolling", "touch");
				}
			}, 300);
		} else {
			if (!$fvp.firstPress) {
				$fvp.firstPress = true;
				if($fvp.options.is_sp_page=='true'){
					$fvp.source = '/' + $scope.portal.url_suffix + '?id='+ $fvp.options.embedded_page +'&sysparm_nostack=true&sysparm_stack=no' + $fvp.options.url_system_parameters;
				}else{
					$fvp.source = '/' + $fvp.options.embedded_page +'?sysparm_nostack=true&sysparm_stack=no' + $fvp.options.url_system_parameters;
				}
			}
			$fvp.hasUnreadMessages = false;
			$element.find('.fvp-container').css("display", "block");
			$element.find('.fvp-outer-wrapper').css("display", "block");
			$element.find('.fvp-wrapper').css("display", "block");
			if($fvp.options.is_sp_page=='true'){
				//Let's pause for a brief moment to let the iframe start loading the page.
				//Then we are going to strip off the nav header from the page.
				$timeout(function(){
					$scope.$broadcast('suppressHeader','fvpFrame');	
					$fvp.isWindowVisible = true;
				},500);
			}else{
				$fvp.isWindowVisible = true;
			}

			// ios overlay hacky fix.
			$document.find('.touch_scroll').css("-webkit-overflow-scrolling", "auto");
		}
	};

	$window.addEventListener("message", function(e) {
		if ($fvp.isWindowVisible === false) {
			$fvp.hasUnreadMessages = true;
		}
	});

	$element.find('.help-button').on("mouseup", function(e) {
		e.target.blur();
		e.stopPropagation();
	});

	$element.find('.help-icon').on("mouseup", function(e) {
		e.target.blur();
		e.stopPropagation();
	});

	$fvp.openWindow = function() {
		$fvp.isWindowVisible = true;		
		// delay before clearing unread message indicator
		// in-case user opens and closes quickly
		$timeout(function() {
			if ($fvp.isWindowVisible) {
				$fvp.hasUnreadMessages = false;							
			}
		}, 500);
	};

	var _closeWindow = function() {
		$fvp.isWindowVisible = false;
	};
}