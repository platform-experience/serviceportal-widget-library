function link($scope,$el,$attrs,$ctrl){
	
/* DO NOT edit below this line */
	var sass = document.getElementById($attrs.id).querySelector('.sassvars');
	var sassv = window.getComputedStyle(sass);
	
	if($scope.options.title_color && $scope.options.title_color.length > 0){
		sass.style.setProperty('--title-color', $scope.options.title_color);
	}
	if($scope.options.annotation_color && $scope.options.annotation_color.length > 0){
		sass.style.setProperty('--annotation-color', $scope.options.annotation_color);
	}
	
}
