if (input && input.action == 'impersonate') {
	if (!input.self) session.onlineImpersonate(input.user_id);
	data.user_id = input.user_id;
	data.self = input.self;
}
if (input && input.action == 'unimpersonate') {
	if (!input.self) session.onlineUnimpersonate();
}

data.canImpersonate = gs.hasRole('impersonator');
data.reports = getReports(gs.getUserID());

function getReports(userID) {
	var gr = new GlideRecord('sys_user');
	gr.addActiveQuery();
	gr.addQuery('manager', userID);
	gr.orderBy(gr.getDisplayName());
	gr.query();
	var reports = [];
	while (gr.next()) {
		reports.push({
			name: gr.getDisplayValue(),
			sys_id: gr.getUniqueValue()
		});
	}
	return reports;
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
