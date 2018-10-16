(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	data.options = options;
	var menu_id = $sp.getValue("sp_rectangle_menu");
	
	
	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	
	
	data.menu = {
		sys_id: menu_id,
		items : sortByKey($sp.getMenuItems(menu_id),'order'),
		widget : $sp.getWidgetFromInstance(menu_id)
	};
	
	
})();