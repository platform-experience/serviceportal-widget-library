function ($scope,$el,$attrs,$ctrl) {
	
	/*
	Need to reposition #uiNotificationContainer so it is in the main page space
	*/
	
	var $window = $injector.get('$window');
	var leftNavSideBar = $injector.get('leftNavSideBar');
	
	var $interval = $injector.get('$interval');
	var $location = $injector.get('$location');
	
	var body, section, header, main, nav, footer;
	
	function updatePage(data){
		
		var sass = document.querySelector('.navsass');

		var sassv = window.getComputedStyle(sass);
		$scope.options.nav_width = sassv.getPropertyValue('--nav-width').trim();
		$scope.options.nav_height = sassv.getPropertyValue('--nav-header-height').trim();
		$scope.options.nav_width_collapsed = sassv.getPropertyValue('--nav-width-collapsed').trim();
		$scope.options.nav_gutter = sassv.getPropertyValue('--nav-padding-left-right').trim();
		$scope.options.page_top = sassv.getPropertyValue('--page-margin-top').trim();
		$scope.options.nav_secondary_height = sassv.getPropertyValue('--nav-secondary-height').trim();

		body = document.getElementsByTagName("body");
		section = document.getElementsByTagName("section");
		header = document.getElementsByTagName("header");
		main = document.getElementsByTagName("main");
		nav = document.getElementsByTagName("nav");
		footer = document.getElementsByTagName("footer");
		uinotif = document.getElementById("uiNotificationContainer");

		$scope.navpilldefaulticon = sassv.getPropertyValue('--nav-pills-icon-default').trim();
		
		var wait = $interval(function(){

			if(header!=undefined && footer!=undefined){
				var containers,breadcrumbs,headercontainers;
				var expanded = $scope.expanded();
				try{

					$(header).css('z-index','100');
					$(main).css('z-index','0');

					var w = $(main).width();

					if( w > 767){				
						
						var marginLeft = 'calc(' + $scope.options.nav_width_collapsed + ' + calc(' + $scope.options.nav_gutter + ' * 2) )';
						var marginLeftContainers = 'calc( 100% - calc(' + $scope.options.nav_width_collapsed + ' / 2) )';
						
						if(expanded){
							marginLeft = 'calc(' + $scope.options.nav_width + ' + calc(' + $scope.options.nav_gutter + ' * 2) )';
							marginLeftContainers = 'calc( 100% - calc(' + $scope.options.nav_width + ' / 2) )';
						}

						$(section).css('overflow','auto');
						
						$(main).css('overflow','unset').css('margin-left', marginLeft );
						
						$(uinotif).css('margin-left', marginLeft);
						
						$(footer).css('margin-left', marginLeft);
						
						if($scope.options.nav_secondary){
							$(nav).css('margin-top', 'calc( -1 * calc(' + $scope.options.nav_secondary_height + '))');
							$(body).css('overflow','hidden');
						}else{
							$(main).css('margin-top', $scope.options.page_top);
						}
						
						containers = $(main).find(".container");
						for (var x=0;x<containers.length;x++){
							$(containers[x]).css('width',marginLeftContainers);
						}

						if(data && data.bc){
							data.bc.css('margin-left', marginLeft );
						}else{
							breadcrumbs = $(header).find(".breadcrumbs-container");
							if(breadcrumbs){
								for (var z=0;z<breadcrumbs.length;z++){
									$(breadcrumbs[z]).css('margin-left', marginLeft );
								}
							}
						}
						
						headercontainers = $(header).find(".container");
						if(headercontainers){
							for (var y=0;y<headercontainers.length;y++){
									$(headercontainers[y]).css('width', marginLeftContainers);
							}
						}
					}else{
						//Mobile
						$(header).css('height',$scope.options.nav_height);
						
						/*
						if( w > 767){

							var width = 'calc('+$scope.options.nav_width+' / 2 )';
							sass.style.setProperty('--nav-width', width);	

							$(section).css('overflow','hidden');
							$(main).css('overflow-x','auto').css('margin-left', 'calc(' + width + ' + calc(' + $scope.options.nav_gutter + ' * 2) )' );

							if($scope.options.nav_secondary){
								$(nav).css('margin-top', 'calc( -1 * calc(' + $scope.options.nav_secondary_height + '))');
								$(body).css('overflow','hidden');
							}
							var containers = $(main).find(".container");
							for (var x=0;x<containers.length;x++){
								$(containers[x]).css('width','calc( 100% - calc(' + $scope.options.nav_width + ' / 2) )');
							}
							var breadcrumbs = $(header).find(".breadcrumbs-container");
							if(breadcrumbs){
								$(breadcrumbs).css('margin-left', 'calc(' + $scope.options.nav_width + ' + calc(' + $scope.options.nav_gutter + ' * 2) )' );
							}
							var headercontainers = $(header).find(".container");
							for (var y=0;y<headercontainers.length;y++){
								$(headercontainers[y]).css('width','calc( 100% - calc(' + $scope.options.nav_width + ' / 2) )');
							}

							$(footer).css('margin-left',  'calc(' + width + ' + calc(' + $scope.options.nav_gutter + ' * 2) )');

						}else{
							
						}
						*/
					}

					window.dispatchEvent(new Event('resize'));
				}catch(e){
					console.log(e);
				}

				$interval.cancel(wait);
				wait = undefined;
				
			}
		});
	}
	
	function setHeaderByScroll(){
		var sass = document.querySelector('.navsass');

		var footer = document.getElementsByTagName("footer");	
		var main = document.getElementsByTagName("main");
		var body = document.getElementsByTagName("body");

		var mainHeight = parseInt($(main).innerHeight())+parseInt($scope.options.nav_secondary_height)+parseInt($(footer).innerHeight());
		var bodyHeight = parseInt($(body).innerHeight());
		var scrollBarWidth = getScrollbarWidth() + 'px';
		if(mainHeight > bodyHeight){
			sass.style.setProperty('--page-scrollWidth', scrollBarWidth);	
		}else{
			sass.style.setProperty('--page-scrollWidth', '0px');
		}
	}

	function getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);        

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	}
	
	$scope.width = $window.innerWidth;
	$scope.expanded = leftNavSideBar.isExpanded;
	
	$scope.toggle = function () {
		leftNavSideBar.toggleExpanded();

		updatePage();
	}

	$scope.toggleSubMenu = function(e,id){
		var submenus = document.getElementsByClassName("submenu");
//		angular.element(submenus).removeClass('submenushow');
//console.log(submenus)
		var el = angular.element("#"+id);
		el.toggleClass('submenushow');
//		el.parent().toggleClass('submenushow')
//console.log(el.parent())		
		
//Need to figure out why this is not working on mobile
//Remove --  ng-class="{ submenushow : xsScreenSize }"
//- from visibileItemsLeftNavTemplate once fixed
		
		e.stopPropagation();
    e.preventDefault();
	};

	angular.element($window).bind('resize', function(){
		$scope.width = $window.innerWidth;
		setHeaderByScroll();
		$scope.navExpanded = $scope.expanded();
		if($scope.xsScreenSize){
			$scope.navExpanded = true;
		}
	});

	$(document).keyup(function(event) {
		if (event.which == 9) { //tab key handler + arrow keys
			if ($(event.target).parents(".dropdown-menu").length == 0) { //if we are NOT inside a dropdown...
				//close the dropdowns
				$(".dropdown").removeClass("open");
				$("[data-toggle='dropdown']").attr("aria-expanded", "false");
			}
		}
	});

	$scope.$on('renderPage',function(action,data){
		updatePage(data);
	});

	$($el).on('click.a','click.nav','.navbar-collapse.in',function(e) {

		var target = $(e.target);
		
		if (target.is('a')||target.is('span')) {
			if (target.hasClass('sp-menu-has-items'))
				return; // menu item has a submenu, so just toggle it
			
			// collapse mobile nav if clicked an anchor
			$(this).removeClass('in').addClass('collapse');
			return;
		}

		if (target.parent().hasClass("toggle-dropdown")) {
			// collapse mobile nav if parent has toggle-dropdown class
			$(this).removeClass('in').addClass('collapse');
			return;
		}

		// if neither target nor parent is an anchor, do nothing
		if (!target.parent().is('a'))
			return;

		// collapse mobile nav if target is part of a submenu
		if (target.parents("ul.dropdown-menu").length > 0)
			$(this).removeClass('in').addClass('collapse');
	});
	
	updatePage();
	
//console.log('~~~ Link Function ~~~')	
//console.log($scope)
}