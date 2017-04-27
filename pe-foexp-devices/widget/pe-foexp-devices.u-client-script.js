function(spUtil, $scope, $window, $sce) {
  var c = this;
	
	c.type = '';
	c.item = '';
	c.itemWidget = '';
	c.view = 'pe-foexp-devices-main.html';
	
	c.setView = function (view) {
		switch (view) {
			case 'main':
				c.view = 'pe-foexp-devices-main.html';
				break;
			case 'select':
				c.view = 'pe-foexp-devices-select.html';
				break;
			case 'checkout':
				c.view = 'pe-foexp-devices-checkout.html';
				break;
			default:
				c.view = 'pe-foexp-devices-main.html';
		}
	}
	
	c.setType = function (type) {
		c.type = type;
		c.setView('select');
		c.server.get({action: 'getItems', type: type}).then(function (response) {
			c.data.items = response.data.items;
		});
	}
	
	c.goBack = function () {
		if (c.view == 'pe-foexp-devices-checkout.html') {
			c.setType(c.type);
		} else {
			c.setView();
		}
	}
	
	c.setItem = function (item) {
		c.item = item;
		
		spUtil.get("widget-sc-cat-item", {
			sys_id: item.sys_id
		})
		.then(function (response) {
			c.itemWidget = response;
			c.setView('checkout');
		});
	}
	
	$scope.$on('$sp.sc_cat_item.submitted', function () {
		$window.location.reload();
	});
}