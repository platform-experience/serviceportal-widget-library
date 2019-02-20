function($rootScope, $scope, $window, $location, $interval, $timeout, $uibModal, cabrillo, spUtil, spAriaUtil) {
/* widget controller */
	
	try{
		 $injector.get('spGtd');
	}catch(e){
		console.log('Prior to London Guided Tours did not exist.')
	}
	var c = this;

	//~~ Controller Functions
	function isXSScreenSize() {
		return $window.matchMedia('(max-width: 767px)').matches;
	}

	function renderPage(){
			//window.dispatchEvent(new Event('onload'));
			var html = document.getElementsByTagName("html");
			var htmlClass = $(html)[0].className.split(" ")[0];
			if($scope.htmlClass!=htmlClass){
				var x = 0;
				var wait = $interval(function(){
					if(!$scope.loadingIndicator){
						$scope.navExpanded = $scope.expanded();
						$scope.$emit('renderPage');
						$scope.showXSAvatar = isXSScreenSize();
						$scope.showAvatar = !isXSScreenSize();
						$interval.cancel(wait);
						wait = undefined;
					}
				},250,10);
			}
	}
	$scope.xsScreenSize = isXSScreenSize();

	//~~ Scope Variables
	$scope.loadingIndicator = $rootScope.loadingIndicator;
	$scope.showXSAvatar = isXSScreenSize();
	$scope.showAvatar = !isXSScreenSize();

	$scope.options.nav_secondary = ($scope.data.secondaryMenu!=undefined);

	$scope.cartItemCount = 0;
	$scope.wishlistItemCount = 0;
	$scope.itemAddedTooltipOpen = false;
	$scope.accessibilityEnabled = spAriaUtil.g_accessibility === "true";

	$scope.avatarProfile = {
		userID: $scope.user.sys_id,
		name: $scope.user.name,
		initials: $window.NOW.user_initials
	};
	if ($window.NOW.user_avatar) {
		$scope.avatarProfile.userImage = $window.NOW.user_avatar;
	}

	if (cabrillo.isNative()){
		$scope.isViewNative = true;
	}

	//~~ Scope Functions
	$scope.goMobile = function(home_page){
		$location.url('?id='+home_page);
		$('.collapse').collapse('hide');
	}

	$scope.menuItemClicked = function(menuitem,href){

		if(href){
			$location.url(menuitem);
		}else{
			if(menuitem.__table && menuitem.sys_id){
				$location.url('?id=form&table='+menuitem.__table+'&sys_id='+menuitem.sys_id)
			}	
			if(menuitem.url){
				if(menuitem.url.startsWith('?id=')){
					$location.url(menuitem.url);
				}else{
					if(menuitem.url_target.length==0){
						window.open(menuitem.url,'_self');
					}else{
						window.open(menuitem.url,menuitem.url_target);
					}
				}
			}else{
				if(menuitem.href){
					$location.url(menuitem.href);
				}
			}
		}
		
		if($scope.xsScreenSize){
			$('.collapse').collapse('hide');
		}

	}
	
	$scope.checkActive = function(href){
		if(!href || href === '?id='){
			return false;
		}else{
			return (parseInt($location.url().indexOf(href))>0);
		}
	};
	
	$scope.dynamicOpenPopUp = function() {
		if ($scope.data.useChatWidgetForCSM) {
			$scope.toggleChat();
		} else {
			$scope.openPopUp();
		}
	};
	
	//Show VA Chat
	var MOBILE_DEVICE_SCREEN_WIDTH = 767;
	$scope.mobileDevice = $scope.data.isMobile || ($(window).width() < MOBILE_DEVICE_SCREEN_WIDTH);
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
		var url = "$chat_support.do?queueID=" + $scope.data.connect_support_queue_id;
		var popup = window.open(url, "popup", "width=900, height=600");
	};
	
	$scope.openLogin = function () {
		$scope.modalInstance = $uibModal.open({
			templateUrl: 'loginleftNavTemplate',
			scope: $scope
		});
	};

	$scope.isHomepage = function() {
		if (!$scope.page.id){
			return true;
		}
		if ($scope.page.id == $scope.portal.homepage_dv){
			return true;
		}
		return false;
	};
	
	$scope.toggleCart = function() {
		$timeout.cancel(cancelTooltipPromise);
		$scope.itemAddedTooltipOpen = false;
		$timeout(function() {
			$("#cart-dropdown").dropdown("toggle");
		});
	};
	
	//~~ Scope ON Events
	$scope.$on('$locationChangeSuccess', function(event){
		renderPage();
	});
	
	$scope.$on('sp_loading_indicator', function(e, value) {
		$scope.loadingIndicator = value;
	});

	$rootScope.$on('sp.avatar_changed', function() {
		$scope.userID = "";
		$timeout(function(){
			$scope.userID = $scope.user.sys_id;
		});
	});

	$scope.$on("$sp.service_catalog.cart.count", function($evt, count) {
		$scope.cartItemCount = count;
	});
	
	$scope.$on("$sp.service_catalog.wishlist.count", function($evt, count) {
		$scope.wishlistItemCount = count;
	});
	
	var cancelTooltipPromise;
	$scope.$on("$sp.service_catalog.cart.add_item", function() {
		$timeout.cancel(cancelTooltipPromise);
		$scope.itemAddedTooltipOpen = true;
		cancelTooltipPromise = $timeout(function() {
			$scope.itemAddedTooltipOpen = false;
		}, 3000);
	});
	
	$scope.$on('sp-menu-update-tours', function(event, tours) {
		$scope.data.showTours = $scope.data.showTours && !spUtil.isMobile();
		if ($scope.data.showTours === false) return;
		var guidedToursLabel = 'Guided Tours';
		$scope.data.guidedTours = {
			label: guidedToursLabel,
			collection: []
		};
		if (tours.length > 0) {
			$scope.data.guidedTours.collection = tours.map(function(t) {
				return {
					title:  t.name,
					id: t.id,
					clicked: function() {
						spGtd.launch(t.id);
					}
				};
			});
		}
	});

	// PRB1108244: visibleItems array is used to improve keyboard nav
	// in menu, refresh it as needed
	if($scope.data.menu.data){
		$scope.$watch('data.menu.data.menu.items', function() {
			$scope.visibleItems = [];
			if ($scope.data.menu.data.menu.items) {
				for (var i in $scope.data.menu.data.menu.items) {
					var item = $scope.data.menu.data.menu.items[i];
					if (item.items || (item.scriptedItems && item.scriptedItems.count != 0)){
						$scope.visibleItems.push(item);
					}
				}
			}
		}, true);
		// Get list of record watchers
		var record_watchers = [];
		if ($scope.data.menu.data.menu.items) {
			for(var i in $scope.data.menu.data.menu.items) {
				var item = $scope.data.menu.data.menu.items[i];
				if (item.type == 'scripted') {
					if (item.scriptedItems.record_watchers)
						record_watchers = record_watchers.concat(item.scriptedItems.record_watchers);
				}
				if (item.type == 'filtered') {
					record_watchers.push({'table':item.table,'filter':item.filter});
				}
			}
		}
	}
	
	// Init record watchers
	for (var y in record_watchers){
		var watcher = record_watchers[y];
		spUtil.recordWatch($scope, watcher.table, watcher.filter);
	}
	$rootScope.$broadcast('sp-header-loaded');

}