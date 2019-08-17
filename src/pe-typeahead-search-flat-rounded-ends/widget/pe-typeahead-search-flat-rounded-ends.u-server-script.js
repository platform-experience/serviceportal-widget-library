(function() {
	if (options.title) {
		options.title = gs.getMessage(options.title);
	}

	if (options.refresh_page_on_search_submission == undefined)
		data.refreshPageOnSearch = true;
	else
		data.refreshPageOnSearch = options.refresh_page_on_search_submission;

	data.resultMsg = gs.getMessage("Search results");
	data.navigationMsg = gs.getMessage("To navigate, use up and down arrow keys while holding ");
	data.portalID = $sp.getPortalRecord().getUniqueValue();
	data.searchMsg = gs.getMessage("Search");
	data.q = $sp.getParameter('q');

	var searchSources;
	data.searchType = null;
	data.searchSources = [];
	if ($sp.getParameter("id") == "search" && $sp.getParameter("t")) {
		data.searchType = $sp.getParameter("t");
		searchSources = $sp.getSearchSources(data.portalID);
	} else {
		var contextualSearchSourceIDs = options.contextual_search_sources || null;
		searchSources = $sp.getSearchSources(data.portalID, contextualSearchSourceIDs);
		if (searchSources.length == 1) {
			data.searchType = searchSources[0].id;
		}
	}

	data.typeaheadTemplates = {};
	data.searchSourceConfiguration = {};
	searchSources.forEach(function(source) {
		if (source.isTypeaheadEnabled) {
			data.searchSources.push(source.id);
		}
		var sourceTemplateConfiguration = {};
		if (source.isAdvancedTypeaheadConfig) {
			sourceTemplateConfiguration.type = "ADVANCED";
			sourceTemplateConfiguration.template = "sp-typeahead-" + source.id + ".html";
			data.typeaheadTemplates["sp-typeahead-" + source.id + ".html"] = $sp.translateTemplate(source.typeaheadTemplate);
		} else {
			sourceTemplateConfiguration.type = "SIMPLE";
			sourceTemplateConfiguration.glyph = source.typeaheadGlyph;
			sourceTemplateConfiguration.linkToPage = source.typeaheadPage;
			if (!sourceTemplateConfiguration.linkToPage)
				console.log("Warning: No typeahead page or URL provided for search source " + source.name);
		}
		data.searchSourceConfiguration[source.id] = sourceTemplateConfiguration;
	});
})();