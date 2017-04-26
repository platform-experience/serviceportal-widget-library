(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.incident = options.incident || serverOptions.incident  || 'd71f7935c0a8016700802b64c67c11c6';

  var getState = function(stateValue, table ){
		var state = new GlideRecord('sys_choice');
    state.addQuery('element','state');
    state.addQuery('name', table);
    state.addQuery('value', stateValue);
    state.query();
    while(state.next()){
    	stateObj = {
      	value: stateValue,
      	label: state.label.toString(),
      	labelClass: state.label.toLowerCase().split(' ').join('-')
      };
    };
		return stateObj;
	};

  if (options.incident){
  	
  	var incidentGR = new GlideRecord('incident');
		if (incidentGR.get(options.incident)) {
			var incident = {
				sys_id: incidentGR.sys_id.toString(),
				ci: {
					name: incidentGR.cmdb_ci.name.toString(),
					sys_id: incidentGR.cmdb_ci.toString(),
					number: incidentGR.cmdb_ci.number.toString()
				},
				problem: {
					description: incidentGR.problem_id.short_description.toString(),
					number: incidentGR.problem_id.number.toString(),
					sys_id: incidentGR.problem_id.toString(),
					state: getState(incidentGR.problem_id.state.toString(), 'problem'),
					other_incidents: []
				},
				cause: {
					number: incidentGR.caused_by.number.toString(),
					description: incidentGR.caused_by.short_description.toString(),
					state: getState(incidentGR.caused_by.state.toString(), 'change_request'),
					sys_id: incidentGR.caused_by.toString()
				}
			};

			if (incident.problem.sys_id) {
				var otherIncidents = [];
				var otherIncidentGR = new GlideRecord('incident');
				otherIncidentGR.addQuery('problem_id', incident.problem.sys_id);
				otherIncidentGR.query();
				while(otherIncidentGR.next()){
					if(otherIncidentGR.sys_id.toString() !== incident.sys_id){
						otherIncidents.push({
							sys_id: otherIncidentGR.sys_id.toString(),
							description: otherIncidentGR.short_description.toString(),
							number: otherIncidentGR.number.toString(),
							state: getState(otherIncidentGR.state.toString(), 'incident')
						});
					}
				}
				incident.problem.other_incidents = otherIncidents;
			}

			data.incident = incident;

		}

	}

})();