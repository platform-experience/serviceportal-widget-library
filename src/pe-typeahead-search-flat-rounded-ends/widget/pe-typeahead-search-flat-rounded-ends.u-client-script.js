function ($http, $filter, $location,spAriaUtil, $window, $scope, spAriaFocusManager) {
	var c = this;

	c.options.glyph = c.options.glyph || 'search';
	c.options.title = c.options.title || c.data.searchMsg;
	c.options.color = c.options.color || "default";
	c.searchTerm = c.data.q;

	c.onSelect = function($item, $model, $label) {
		c.searchTerm = ""; // prevents unexpected result if user quickly clicks search button after selecting
		if ($item.target)
			window.open($item.url, $item.target);
		else {
			var newUrl = $location.url($item.url);
			spAriaFocusManager.navigateToLink(newUrl.url());
		}
	};
	c.clearResults = function() {
		c.searchTerm = '';
		$scope.focusInput();
	};
	c.getResults = function(query) {
		c.searchResults = false;
		var payload = {
			"query": query,
			"portal": c.data.portalID,
			"source": c.data.searchSources,
			"include_facets": false,
			"isTypeahead": true
		};
		if (c.options.limit || c.options.limit == 0)
			payload.count = c.options.limit;

		return $http.post("/api/now/sp/search", payload).then(function(response) {
			var result = response.data.result;
			spAriaUtil.sendLiveMessage(result.results.length + " " +
																 c.data.resultMsg + " " +
																 c.data.navigationMsg +
																 getNavigationKeys());
			return result.results.map(function(item) {
				var config = c.data.searchSourceConfiguration[item.__search_source_id__];
				if (config.type == "ADVANCED") {
					item.templateID = config.template;
				} else {
					item.glyph = config.glyph;
					if (!item.url && config.linkToPage) {
						item.url = "?id=" + config.linkToPage;
						if (item.sys_id)
							item.url += "&sys_id=" + item.sys_id;
						if (item.table)
							item.url += "&table=" + item.table;
					}
				}
				if(item){
					c.searchResults = true;
				}
				return item;
			});
		});
	};

	c.searchType = c.data.searchType;
	$scope.$on('$locationChangeSuccess', onLocationChangeSuccess);

	function onLocationChangeSuccess(event, newUrl, oldUrl) {
		if(searchSourceChanged(newUrl, oldUrl)) {
			var newUrlParams = newUrl.match(/t=.+/);
			if(!newUrlParams) {
				c.searchType = null;
			} else {
				c.searchType = newUrlParams[0].split("&")[0].substring(2);
			}
		}
  }

	function searchSourceChanged(newUrl, oldUrl) {
		var newUrlParams = newUrl.match(/t=.+/),
		oldUrlParams = oldUrl.match(/t=.+/);

		if(!newUrlParams && !oldUrlParams) {
			return false;
		}

		if((!newUrlParams && oldUrlParams) || (newUrlParams && !oldUrlParams)) {
			return true;
		}

		return newUrlParams[0].split("&")[0] !== oldUrlParams[0].split("&")[0];
	}

	c.submitSearch = function() {
		var shouldReloadPage = c.data.refreshPageOnSearch && $location.search().id === 'search';
		
		if (c.searchTerm) {
			var newUrl = $location.search({
				id: 'search',
				spa: '1',
				t: c.searchType,
				q: c.searchTerm
			});

			if (shouldReloadPage)
				$scope.$emit("sp.page.reload");
			
			spAriaFocusManager.navigateToLink(newUrl.url());
		}
	};

	function getNavigationKeys() {
		if($window.navigator.userAgent.indexOf("Mac OS X") > -1)
			return '⌘';
		return 'Control';
	}
}