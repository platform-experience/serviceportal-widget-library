if (input && input.action == 'impersonate') {
	session.onlineImpersonate(input.user_id);
	data.user_id = input.user_id;
}
if (input && input.action == 'unimpersonate') {
	session.onlineUnimpersonate();
}

data.canImpersonate = gs.hasRole('impersonator');
data.viewAsResults = getViewAsChoices(gs.getUserID());

function getViewAsChoices(userID) {
	var gr = new GlideRecord('sys_user');
	gr.addActiveQuery();
	gr.addQuery('manager', userID);
	gr.orderBy(gr.getDisplayName());
	gr.query();
	var choices = [];
	while (gr.next()) {
		choices.push({
			name: gr.getDisplayValue(),
			sys_id: gr.getUniqueValue()
		});
	}
	return choices;
}

data.showPrices = $sp.showCatalogPrices();
data.q = $sp.getParameter('q');
data.t = $sp.getParameter('t');
data.searchSources = {};
data.resultTemplates = {};

options.refresh_page_on_search_submission = false;

data.typeaheadSearchWidget = $sp.getWidget('typeahead-search', options);
data.breadcrumbsWidget = $sp.getWidget('breadcrumbs');
data.limit_group = options.max_group || 15;
data.limit_all = options.max_all || 30;
data.showTypeaheadSearch = options.show_typeahead_search == "true";

var portalID = $sp.getPortalRecord().getUniqueValue();
var searchSources = $sp.getSearchSources(portalID);
var i = 0;
searchSources.forEach(function(searchSource) {
	data.resultTemplates["sp-search-source-" + searchSource.id + ".html"] = $sp.translateTemplate(searchSource.template);
	data.searchSources[searchSource.id] = {
		name: searchSource.name,
		id: searchSource.id,
		order: i++
	};
});

if (data.t) {
	data.t_label = data.searchSources[data.t].name;
} else {
	data.t_label = gs.getMessage("All");
}
