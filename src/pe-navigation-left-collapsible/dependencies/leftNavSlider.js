angular.module('leftNavSlider', [])
	.directive('main', function (leftNavSideBar) {
	
	return {
		
		link: function (scope, elem, array) {
			
			if (leftNavSideBar.isExpanded()) {
				elem.addClass('leftnav-expanded');
			}
			
			//leftNavSideBar
			
			scope.$on('leftnavSideBarToggled', function (e, expanded) {
				if (expanded) {
					elem.addClass('leftnav-expanded');
					return;
				}
				
				elem.removeClass('leftnav-expanded');
				return;
			});
		}
		
	};
	
	

})
	.service('leftNavSideBar', function ($rootScope, $window) {
	
	var lsVal = $window.localStorage.getItem('leftnav-expanded');

	var expanded = lsVal === null ? true : lsVal == 'true';
	var visible = true;
	
	function isExpanded () {
		return expanded;
	}
	
	function isVisible () {
		return visible;
	}
	
	function toggleExpanded () {
		expanded = !expanded;
		$window.localStorage.setItem('leftnav-expanded', expanded);

		$rootScope.$broadcast('leftnavSideBarToggled', isExpanded());
		return expanded;
	}

	return {
		isExpanded: isExpanded,
		isVisible: isVisible,
		toggleExpanded: toggleExpanded
	};

});