(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.incident = options.incident || serverOptions.incident || 'd71f7935c0a8016700802b64c67c11c6';
  options.titleIconClasses = options.titleIconClasses || serverOptions.titleIconClasses || 'fa fa-bolt';

  var getState = function(stateValue, table ){
		var state = new GlideRecord('sys_choice');
    state.addQuery('element','state');
    state.addQuery('name', table);
    state.addQuery('value', stateValue);
    state.query();
    while(state.next()){
    	stateObj = {
      	value: stateValue,
      	label: state.label.toString()
      };
    };
		return stateObj;
	};

  if (options.incident){
  	
  	var incidentGR = new GlideRecord('incident');
		if (incidentGR.get(options.incident)) {
			var incident = {
				sys_id: incidentGR.sys_id.toString(),
				state: getState(incidentGR.state.toString(), 'incident'),
				ci: {
					name: incidentGR.cmdb_ci.name.toString(),
					sys_id: incidentGR.cmdb_ci.toString(),
				},
				problem: {
					name: incidentGR.problem_id.name.toString(),
					sys_id: incidentGR.problem_id.toString(),
					other_incidents: []
				},
				cause: {
					number: incidentGR.caused_by.number.toString(),
					description: incidentGR.short_description.toString(),
					sys_id: incidentGR.caused_by.toString()
				}
			};

			data.incident = incident;

			data.drawerWidget = $sp.getWidget('pe-root-cause-details', {
		    incident: incident.sys_id
		  });

		}

	}

})();