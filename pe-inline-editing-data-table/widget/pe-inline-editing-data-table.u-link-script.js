function(scope, element, attrs, ctrl){
	var $ul, $contextMenu;

	scope.focusOnTableHeader = function() {
		element.find(".data-table-title").attr("tabindex", "-1").focus();
	}

	element.on('contextmenu', function(e){
		if (e.ctrlKey)
			return; // ctrlKey is for the debug menu, not this menu

		var rowScope = angular.element(e.target).scope();
		var field, item, fieldVal;

		// Context Menu for tbody
		if (angular.isDefined(rowScope.field) && angular.isDefined(rowScope.item)){
			e.preventDefault();
			field = rowScope.field;
			item = rowScope.item;
			fieldVal = item[field].value;

			var items = [
				['${Show Matching}', function(){
					ctrl.createQueryTerm(scope.data.table, field, item.sys_id, '=').then(function(term){
						ctrl.showMatching(field, term);
					});
				}],
				['${Filter Out}', function(){
					ctrl.createQueryTerm(scope.data.table, field, item.sys_id, '!=').then(function(term){
						ctrl.filterOut(field, term);
					});
				}]
			];

			renderContextMenu(items);
			setContextMenuPosition(e);
		}
	});

	function renderContextMenu(items){
		var scrollHeight = $('body').get(0).scrollHeight;
		$contextMenu = angular.element('<div>', {'class': 'dropdown clearfix context-dropdown open'});

		$contextMenu.on('click', function (e) {
			if ($(e.target).hasClass('dropdown')) {
				_clearContextMenus(event);
			}
		});
		$contextMenu.on('contextmenu', function (event) {
			event.preventDefault();
			_clearContextMenus(event);
		});

		$contextMenu.css({
			position: 'absolute',
			top: 0,
			height: scrollHeight,
			left: 0,
			right: 0,
			zIndex: 9999
		});

		$('body').append($contextMenu);

		$ul = angular.element('<ul>', {
			'class': 'dropdown-menu',
			'role': 'menu'
		});
		renderItems();
		$contextMenu.append($ul);

		function renderItems(){
			angular.forEach(items, function (item) {
				var $li = angular.element('<li>');

				if (item === null) {
					$li.addClass('divider');
				} else {
					var $a = angular.element('<a>');
					$a.attr({tabindex: '-1', href:'#'});
					$a.text(item[0]);
					$li.append($a);
					$li.on('click', function (e) {
						e.preventDefault();
						scope.$apply(function () {
							_clearContextMenus(e);
							item[1].call(item, item);
						});
					});
				}

				$ul.append($li);
			});
		}
	}

	function _clearContextMenus(event){
		if (!event){
			return;
		}

		angular.element(event.currentTarget).removeClass('context');

		var els = angular.element(".context-dropdown");
		angular.forEach(els, function(el){
			angular.element(el).remove();
		});
	}

	var contextMenuItemHeight = 0;
	function setContextMenuPosition(event){
		if (contextMenuItemHeight === 0)
			contextMenuItemHeight = $ul.children(0).height();

		// Why not just call .width() and .height() on the container? Because those calculations cause browsers to reflow
		// that can cause IE10 to take 200ms to render a context menu.
		var cmWidth = 150;
		var cmHeight = contextMenuItemHeight * $ul.children().length;
		var startX = event.pageX + cmWidth >= window.innerWidth ? event.pageX - cmWidth : event.pageX;
		var startY = event.pageY + cmHeight >= window.innerHeight ? event.pageY - cmHeight : event.pageY;

		$ul.css({
			display: 'block',
			position: 'absolute',
			left: startX,
			top: startY,
			'min-width': cmWidth
		});
	}
}