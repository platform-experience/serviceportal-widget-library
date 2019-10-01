function EnhancedHeaderController($rootScope, $scope, snRecordWatcher, spUtil, $location, $uibModal, cabrillo, $timeout, enhancedHeaderMenuDeviceType, $window) {
	var c=this;
	$scope.userID = $scope.user.sys_id;
	$scope.mobileNavBarToggledOnce = false;
	$scope.showTypeaheadSearch = false;

	$scope.$on('sp_loading_indicator', function(e, value) {
		$scope.loadingIndicator = value;
	});

	$scope.$on('toggle-typeahead-search', function(e, r) {
		$scope.toggleTypeaheadSearch();
	});

	$scope.getMobileClassIfNeeded = function() {
		return $scope.isMobileView() ? 'is-mobile' : '';
	};
	
	$(window).resize(function() {
		handleResize();
	});
	
	function handleResize(){
	   var view = $scope.isMobileView();
	   if( view != $scope.currentView) {
		   if (!view) {
			   $('.csm-unified-panel').hide();			   
			   $('.navbar-action-search').show();
		   }
			else {
			   $('.csm-unified-panel').show();			   
			   $('.navbar-action-search').hide();
			}
		   $scope.currentView = !$scope.currentView;
	   }
	}
	
	var setNavBarMaxHeight = function() {		

		var navBarDiv = $('#sp-nav-bar');
		if (!navBarDiv) {
			return;
		}
		
		var navBarHeaderHeight = $('.navbar-header') ? $('.navbar-header').height() : 0;
		var navBarMaxHeight = $(window).innerHeight() - navBarHeaderHeight;
		
		navBarDiv.css({'max-height': navBarMaxHeight + 'px'});			
	};
	
	$(window).on('orientationchange', function(e) {
		$timeout(function(){
			setNavBarMaxHeight();
		});
	});
	
	$scope.toggleNavBarClicked = function(e) {

		// Set the max-height on navBarDiv equal to window height 
		// to make sure the overflow on this div can take effect
		if (!$scope.mobileNavBarToggledOnce) {			
			setNavBarMaxHeight();
			$scope.mobileNavBarToggledOnce = true;			
		}
	};

	$scope.collapseTypeaheadSearch = function(e) {
		$scope.showTypeaheadSearch = false;	
	};	
	
	$scope.expandTypeaheadSearch = function(e) {
		$scope.showTypeaheadSearch = true;
		$timeout(function() {
			$('.navbar-action-search input[name="q"]').focus();
		});
	};		
	
	$scope.toggleTypeaheadSearch = function(e) {		
		$scope.showTypeaheadSearch ? $scope.collapseTypeaheadSearch(e) : $scope.expandTypeaheadSearch(e);	
	};	
	
	$('.navbar-action-search').focusout(function() {
		$scope.collapseTypeaheadSearch();
	});
	
	$rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
		$scope.collapseTypeaheadSearch();
		$('.navbar-action-search input[name="q"]').val('');
	});
	
// 	$rootScope.$on('sp_loading_indicator', function(e, value) {
		
// 		// value is true  => show loading indicator, need to hide the footer
// 		// value is false => show loading indicator, need to show the footer
// 		value ? $('.navbar.csm-unified-footer').hide() : $('.navbar.csm-unified-footer').show();
// 	});	

	if (cabrillo.isNative())
		$scope.isViewNative = true;
	
	$scope.isMobileView = enhancedHeaderMenuDeviceType.isMobileView;
	console.log($scope.currentView)
	$scope.currentView = $scope.isMobileView();
	
	function popupCenter(url, title, w, h) {
		// Fixes dual-screen position                         Most browsers      Firefox
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (h / 2)) + dualScreenTop;
		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
		newWindow.onload = function() {
			var jq = newWindow.$j;
			console.log(jq);
			jq('#back_cell').hide();
			jq('#sc_attachment_button').hide();
		};
		return newWindow;
	}
	
	$scope.openAnonymousChatPopUp = function() {
		var url = "com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=2ee88dafdb416200f6c270f5bf9619cf&sysparm_preview=true&sysparm_domain_restore=false&sysparm_stack=no&sysparm_queue_id=3a40c019c333120071d07bfaa2d3ae17&sysparm_live_agent_only="+$scope.data.live_agent_only;
		popupCenter (url, "chat_popup", 450, 580);
	};
	
	$scope.dynamicOpenPopUp = function() {
		if (!$scope.data.isCSPPortal && $scope.data.useChatWidgetForCSM) {
			$scope.toggleChat();
		} else {
			$scope.openPopUp();
		}
	};
		//Show VA Chat
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

	$scope.openPopUp = function() {
		var url;
		var queue_id;
		if ($scope.data.queueType == "connect") {
			queue_id = $scope.data.connect_support_queue_id;
		} 
		if ($scope.data.isCSPPortal && $scope.data.live_agent_only) {
			url = "com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=2bd27963fc241300964fabc2fdf10ea4&sysparm_preview=true&sysparm_domain_restore=false&sysparm_stack=no&sysparm_queue_id="+queue_id;
		} else if ($scope.data.isCSPPortal) {
			url = "CustomerServiceChat.do?portal=csp&queue_id="+queue_id+"&user_id="+$scope.userID+"&live_agent_only="+$scope.data.live_agent_only;
		} else {
			url ="CustomerServiceChat.do?portal=csm&queue_id="+queue_id+"&user_id="+$scope.userID+"&live_agent_only="+$scope.data.live_agent_only;
		}
		var popup = window.open (url, "chat_popup", "width=450, height=600"); 
	};
	c.openSignLogin = function () {
		$location.url('?id=community_login');
	};
	$scope.openLogin = function () {
		$scope.modalInstance = $uibModal.open({
			template: '<div class="login_widget">\
								   <sp-widget widget="data.loginWidget"></sp-widget>\
								   <style>\
								     .modal-content { border: 0px solid transparent; }\
								   </style>\
								 </div>',
			scope: $scope
		});
	};
	
	$scope.isCommunityPortal = function() {
		return $scope.data.isCommunityPortal;
	};	
	
	$scope.isCSMPortal = function() {
		return $scope.data.isCSMPortal;
	};	
	
	$scope.isCSPPortal = function() {
		return $scope.data.isCSPPortal;
	};	
	
	$scope.showCommunitySupportProfile = function() {
		return $scope.portal.url_suffix === "community" && $scope.data.enableSupportProfile;
	};

	$rootScope.$on('sp.avatar_changed', function() {
		$scope.userID = "";
		$timeout(function(){
			$scope.userID = $scope.user.sys_id;
		});
	});	

	$scope.isHomepage = function() {
		if (!$scope.page.id)
			return true;

		if ($scope.page.id == $scope.portal.homepage_dv)
			return true;

		return false;
	};

	$scope.skipToMain = function() {
		var nextFocusableEl  = $("main.body [tabindex != '-1']:visible")[0];
		$(nextFocusableEl).attr('tabindex', '0');
		$timeout(function() {
			$(nextFocusableEl).focus();
		});
	};

}
