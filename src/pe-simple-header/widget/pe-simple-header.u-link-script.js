function ($scope,$el,$attrs,$ctrl) {

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

	$(document).keyup(function(event) {
		if (event.which == 9) { //tab key handler + arrow keys
			if ($(event.target).parents(".dropdown-menu").length == 0) { //if we are NOT inside a dropdown...
				//close the dropdowns
				$(".dropdown").removeClass("open");
				$("[data-toggle='dropdown']").attr("aria-expanded", "false");
			}
		}
	});
	
	$(document).on('click',function(){
		$('.collapse').collapse('hide');
	});
}