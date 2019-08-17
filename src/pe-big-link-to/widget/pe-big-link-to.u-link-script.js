function link($scope,$el,$attrs,$ctrl){
	
	
/* DO NOT edit below this line */
	var sass = document.getElementById($attrs.id).querySelector('.sassvars');
	var sassv = window.getComputedStyle(sass);
	
	if($scope.options.context && $scope.options.context.length > 0){
		sass.style.setProperty('--button-bg-color', sassv.getPropertyValue('--bs-context-'+$scope.options.context) );
	}
	if($scope.options.button_bg_color && $scope.options.button_bg_color.length > 0){
		sass.style.setProperty('--button-bg-color', $scope.options.button_bg_color);
	}
	if($scope.options.button_min_height && $scope.options.button_min_height.length > 0){
		sass.style.setProperty('--button-min-height', $scope.options.button_min_height);
	}
	if($scope.options.title_color && $scope.options.title_color.length > 0){
		sass.style.setProperty('--title-color', $scope.options.title_color);
	}
	if($scope.options.annotation_color && $scope.options.annotation_color.length > 0){
		sass.style.setProperty('--annotation-color', $scope.options.annotation_color);
	}
	if($scope.options.background_url && $scope.options.background_url.length > 0){
		sass.style.setProperty('--button-image', 'url(' + $scope.options.background_url + ')');
	}
	if($scope.options.background_position && $scope.options.background_position.length > 0){
		sass.style.setProperty('--button-image-position', $scope.options.background_position);
	}
	if($scope.options.border_radius && $scope.options.border_radius.length > 0){
		sass.style.setProperty('--button-border-radius', $scope.options.border_radius);
	}
	
}
