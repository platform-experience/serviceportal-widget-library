function peImageLinkCtrl($location, $window) {
	
  var c = this;
	
	c.go = function () {
		
		if (c.options.type === 'url') {
			window.location.href = c.data.href;
		} else {
			$location.url(c.data.href);
		}
	}
	
}