function($scope) {
  /* widget controller */
  var c = this;

	$scope.dynamicOpenPopUp = function() {
			$scope.toggleChat();
	};
	
	var MOBILE_DEVICE_SCREEN_WIDTH = 767;
	$scope.mobileDevice = c.data.isMobile || ($(window).width() < MOBILE_DEVICE_SCREEN_WIDTH);
	$scope.showChat = $scope.mobileDevice;
	$scope.toggleChat = function () {
		$scope.showChat = !$scope.showChat;
		$('a#va_chat').toggleClass('inactive-chat active-chat');
		if($scope.showChat && $('div.conversation-region.open').length<=0){
			$scope.$$postDigest(function(){
				$('div.conversation-button-container button.help-button').trigger('click');
			});
		}
	};
	
}
