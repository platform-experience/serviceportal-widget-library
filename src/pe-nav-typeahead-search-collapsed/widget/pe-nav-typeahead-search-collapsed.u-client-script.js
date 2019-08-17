function ($http, $filter, $location,spAriaUtil, $window, $scope, spAriaFocusManager,$timeout) {
	var c = this;
	
	c.options.glyph = c.options.glyph || 'search';
	c.options.title = c.options.title || c.data.searchMsg;
	c.searchTerm = c.data.q;
	c.showSearch = false;
	
	c.$onInit = function(){
		$timeout(function(){
			var nav = angular.element(document.querySelector('nav'));
			c.dynamicHeight = nav[0].offsetHeight;
		});
	}
	
	c.onSelect = function($item, $model, $label) {
		c.searchTerm = ""; // prevents unexpected result if user quickly clicks search button after selecting
		c.showSearch = false;
		if ($item.target)
			window.open($item.url, $item.target);
		else {
			var newUrl = $location.url($item.url);
			spAriaFocusManager.navigateToLink(newUrl.url());
		}
	};

	c.getResults = function(query) {
		var payload = {
			"query": query,
			"portal": c.data.portalID,
			"source": c.data.searchSources,
			"include_facets": false,
			"searchType": "typeahead"
		};
		if (c.options.limit || c.options.limit == 0)
			payload.count = c.options.limit;

		return $http.post("/api/now/sp/search", payload).then(function(response) {

			// Prevents typeahead from displaying suggestions if queries from page and input are the same
			if ($location.search().q == query)
				return;

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
							item.url += "&table=" + item.table
							}
				}
				return item;
			});
		});
	}

	c.searchType = c.data.searchType;

	c.toggleSearch = function(){
		c.showSearch = !c.showSearch;
		var el = angular.element(document.getElementsByClassName("btn-search"));
		if(c.showSearch){
			document.getElementById("nav-typeahead").focus();
			el.addClass('active');
		}else{
			el.removeClass('active').blur();
		}
	}

	$scope.$on('$locationChangeSuccess', onLocationChangeSuccess);

	function onLocationChangeSuccess(event, newUrl, oldUrl) {
		c.showSearch = false;
		var el = angular.element(document.getElementsByClassName("btn-search"));
		el.removeClass('active').blur();
		
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

		if(c.searchTerm===null || c.searchTerm===''){
			c.toggleSearch();
			return;
		}else{
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
				c.searchTerm='';
				c.toggleSearch();
			}
		}
	}

	function getNavigationKeys() {
		if($window.navigator.userAgent.indexOf("Mac OS X") > -1)
			return '⌘';
		return 'Control';
	}
}