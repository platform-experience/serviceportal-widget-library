function(scope, element) {	
	$(element).on('click.nav','.navbar-collapse.in',function(e) {	
		var target = $(e.target);
		if (target.is('a')) {
			// collapse mobile nav if clicked an anchor
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
}