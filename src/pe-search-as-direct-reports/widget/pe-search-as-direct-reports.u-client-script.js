function ($scope, $sce, $location, spUtil, $element, $timeout, $rootScope, spFacetsClientService, spFacetManager, $window) {
	var url = null;
	spUtil.setSearchPage($scope.data.t);
	$scope.isLoading = true;
	$scope.isFilterMenuLoading = true;
	$scope.showPagination = false;
	$scope.showFilterMenu = false;
	$scope.isFilterApplied = spFacetManager.isAnyFacetSelected();
	$scope.showApply = false;
	$scope.collpaseFacets = !$scope.data.t || $scope.data.t == "" ;
	
	$scope.currentViewAs = $scope.user.sys_id;
	$scope.activeTab = {
		label: 'My Results',
		name: $scope.user.name,
		user_id: $scope.user.sys_id
	};
	
	$scope.tabs = [$scope.activeTab];
	$scope.data.reports.forEach(function(report){
		$scope.tabs.push({
			label: report.name + ' Results',
			name: report.name,
			user_id: report.sys_id
		})
	});
	
	$scope.getBGImage = function(item) {
		return {"background-image": "url('" + item.picture + "')"};
	}

	$scope.search = function(searchTerm) {
		$location.search('q', searchTerm);
	}

	$scope.clearAll = function () {
		spFacetManager.clearAllFacet();
		$scope.isFilterApplied = false;
	}

	$scope.fetchMoreResults = function(query_start_location) {
		fetch(query_start_location);
	}
	
	$scope.viewAs = function(tab) {
		$scope.currentViewAs = tab.user_id;
		$scope.activeTab = tab;
		fetch(0);
	}

	$scope.openFilterMenu = function() {
		url = $location.url();
		$scope.showApply = false;
		$scope.showFilterMenu = true;
	}

	$scope.cancel = function () {
		if(url) {
			$location.url(url);
		}
    $scope.showFilterMenu = false;
	}

	$scope.apply = function () {
		$scope.showFilterMenu = false;
	}

	fetch(0);

	$scope.$on('$locationChangeSuccess', onLocationChangeSuccess);

	$scope.highlight = function(haystack, needle) {
		if (!haystack)
			return "";

		if (!needle)
			return haystack;

		return haystack.replace(new RegExp(needle.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "gi"), function(match) {
			return '<span class="highlight mark">' + match + '</span>';
		});
	}

	$scope.smallScreenSize = isSmallScreenSize();

	function isSmallScreenSize() {
		return $window.matchMedia('(max-width: 767px)').matches;
	}

	angular.element($window).on('resize', function () {
		$scope.smallScreenSize = isSmallScreenSize();
	});

	function onLocationChangeSuccess(event, newUrl, oldUrl) {
		if(!pageChanged(newUrl, oldUrl)) {
			fetch();
		}
	}

	function pageChanged(newUrl, oldUrl) {
		var newUrlParams = newUrl.match(/id=.+/),
		oldUrlParams = oldUrl.match(/id=.+/);

		if(!newUrlParams && !oldUrlParams) {
			return false;
		}

		if((!newUrlParams && oldUrlParams) || (newUrlParams && !oldUrlParams)) {
			return true;
		}

		return newUrlParams[0].split("&")[0] !== oldUrlParams[0].split("&")[0];
	}

	function fetch(query_start_location) {
		$scope.isLoading = true;
		$scope.isFilterMenuLoading = true;
		$scope.showApply = true;
		var urlParams = $location.search();

		$scope.limit = urlParams.t && urlParams.t !== "" ? $scope.data.limit_group : $scope.data.limit_all;
		$scope.data.q = urlParams.q;
		
		var	params = {
					query: urlParams.q,
					query_start_location: query_start_location,
					count: $scope.limit,
					source: urlParams.t,
					portal: $rootScope.portal_id,
					include_facets: false
				},
				additionalQuery = getAdditionalQuery(urlParams);

		if(!isAllSearchSource(urlParams)) {
			$scope.collpaseFacets = false;
			if($scope.data.searchSources[urlParams.t]) {
				$scope.t_label = $scope.data.searchSources[urlParams.t].name;
			}
			$scope.showFilterIcon = true;
		} else {
			$scope.t_label = "${All}";
			$scope.showFilterIcon = false;
			$scope.collpaseFacets = true;
		}

		if ($scope.options.show_did_you_mean == "true")
			params.include_suggestions = true;

		if(urlParams.t && urlParams.t !== "" && additionalQuery !== "") {
			params.additionalQuery = additionalQuery;
		}
		
		$scope.server.get({
			'action': 'impersonate',
			'user_id': $scope.currentViewAs,
			'self': $scope.currentViewAs == $scope.user.sys_id
		}).then(function(r){
		
			spFacetsClientService.search(params).then(function(response) {
				var searchResults = response.data.result.results.map(function(result) {
					result.templateID = "sp-search-source-" + result.__search_source_id__ + ".html";
					return result;
				});
				if(query_start_location > 0) {
					$scope.results = $scope.results.concat(searchResults);

				} else {
					$scope.results = searchResults;
				}
				$scope.isLoading = false;

				if (response.data.result.pagination_supported) {
					generatePagination(searchResults, query_start_location);
				} else {
					$scope.showPagination = false;
				}

				if (response.data.result.suggestions)
					$scope.data.suggestions = response.data.result.suggestions;
				
				$scope.server.get({'action': 'unimpersonate', 'self': r.data.self });
			});
			
		});

		var paramsCopy = JSON.parse(JSON.stringify(params))
		paramsCopy.include_facets = true;
		paramsCopy.include_suggestions = false;

		spFacetsClientService.search(paramsCopy).then(function(response) {
			$scope.isFilterMenuLoading = false;
			if (!response.data.result.pagination_supported) {
				$scope.endPagination = getEndPagination(response.data.result.results, hasFacet(response.data.result.facets, params.source));
			}
		});

		$scope.isFilterApplied = spFacetManager.isAnyFacetSelected();
		setFocusSearchResult();
	}

	spFacetManager.subscribe("spFacets.refresh.data", "Pills", onFacetsData);

	function isAllSearchSource(urlParams) {
		return !urlParams.t || urlParams.t == "";
	}

	function setFocusSearchResult() {
		$timeout(function() {
			var element = $element.find(".results-heading")[0];
			if(element) {
				element = angular.element(element);
				element.focus();
			}
		}, 500);
	}

	function setFocusNextItem(index) {
		$timeout(function() {
			var element = $element.find(".result-item")[index];
			if(element) {
				element = element.querySelector("a");
				element = angular.element(element);
				element.focus();
			}
		}, 500);
	}

	function generatePagination(results, previousIndex) {
			var last = results[results.length-1];
			$scope.showPagination = true;
			$scope.showLoadMore= last && !last.isLastResult;

		if(last && last.query_location != undefined) {
				$scope.query_start_location = last.query_location + 1;
			} else {
				$scope.query_start_location = 0;
			}

		  if(previousIndex > 0) {
				setFocusNextItem(previousIndex);
			}
	}

	function hasFacet(facets, searchSource) {
		if(searchSource && searchSource !== "") {
			return facets  && facets[searchSource] && facets[searchSource].length > 0
		} else {
			for(var key in facets) {
				if(facets[key].length > 0) {
					return true;
				}
			}
		}
		return false;
	}

	function getEndPagination(results, hasFacet) {
		if(results.length >= $scope.limit) {
			if(hasFacet) {
				return "${Results are limited to }" + $scope.limit + "${ items per search. Try using filters or more specific keywords.}";
			}
			return "${Results are limited to }" + $scope.limit + "${ items per search. Try using more specific keywords.}";
		}

		return "${End of results}";
	}

	function getAdditionalQuery(params) {
		var paramsCopy = _.clone(params);

		delete paramsCopy.q;
		delete paramsCopy.t;
		delete paramsCopy.id;
		delete paramsCopy.spa;

		if (_.isEmpty(paramsCopy))
			return "";

		for(var key in paramsCopy) {
			if(paramsCopy.hasOwnProperty(key))
				paramsCopy[key] = processURLProperty(paramsCopy[key]);
		}

		return paramsCopy;
	}

	function propertyIsArray(prop) {
		return prop.charAt(0) === '[' && prop.charAt(prop.length - 1) === ']';
	}

	function processURLProperty(property) {
		if (propertyIsArray(property)) {
			var properties = property.substring(1, property.length - 1).split(",");
			properties = properties.map(function(prop) {
				return prop.split("%2C").join(",");
			});
			return properties;
		} else {
			return property;
		}
	}

	function findItems(facet, key, valueArr) {
		if (!Array.isArray(valueArr))
			valueArr = [valueArr];

		var items = facet.items.filter(function(item) {
			return valueArr.some(function(value) {
				return value === item.value;
			})
		});

		if(items && items.length > 0) {
			return items;
		}

		return null;
	}

	function findFacet(facets, key) {
		var f = null;
		if(facets && facets.length > 0) {
			f = facets.filter(function(d) {
					return d.id === key;
			});
		}

		if(f && f.length > 0) {
			return f[0];
		}

		return null;
	}

	function onFacetsData(params) {
		var query = params.query,
				facets = params.data[query.t],
				pills = {};

		var keys = Object.keys(query);
		keys.forEach(function(k) {

			var facet = findFacet(facets, k);
			if(facet) {
				var items = findItems(facet, k, processURLProperty(query[k]));
				if(items) {
					items.forEach(function(item) {
						if(!pills[item.label]) {
							pills[item.label] = {id: k, label: item.label, facet: facet, item: item};
						} else {
							//update previous pill
							updatPreviousPill(pills, item.label);
							//add current pill
							var label = getLabel(facet, item);
							pills[label] = {id: k, label: label, facet: facet, item: item};
						}
					});
				}
			}
		});
		$scope.data.pills = _.values(pills);
	}

	function getLabel(facet, item) {
		return item.label + " (" + facet.label + ")";
	}

	function updatPreviousPill(pills, label) {
		var previous = pills[label],
				updatedLabel = getLabel(previous.facet, previous.item);
		previous.label = updatedLabel;
		pills[updatedLabel] = previous;
		delete pills[label];
	}
}