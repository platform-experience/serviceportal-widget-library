function link($scope,$el,$attrs,$ctrl){
	
	
/* DO NOT edit below this line */
	var sass = document.getElementById($attrs.id).querySelector('.sassvars');
	var sassv = window.getComputedStyle(sass);
	
	if($scope.options.greeting_color && $scope.options.greeting_color.length > 0){
		sass.style.setProperty('--greeting-color', $scope.options.greeting_color);
	}
	if($scope.options.message_color && $scope.options.message_color.length > 0){
		sass.style.setProperty('--message-color', $scope.options.message_color);
	}
	if($scope.options.greeting_font_size && $scope.options.greeting_font_size.length > 0){
		sass.style.setProperty('--greeting-font-size', $scope.options.greeting_font_size);
	}
}