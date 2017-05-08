(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
  options.alert = options.alert || serverOptions.alert;
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

	var buildAlert = function(gr){
		return {
			sys_id: gr.sys_id.toString(),
			type: gr.type.getDisplayValue(),
			description: gr.description.toString(),
			state: gr.state.toString(),
			incident: {
				sys_id: gr.incident.sys_id.toString(),
				state: getState(gr.incident.state.toString(), 'incident'),
				problem: {
					name: gr.incident.problem_id.name.toString(),
					sys_id: gr.incident.problem_id.toString(),
					other_incidents: []
				},
				cause: {
					number: gr.incident.caused_by.number.toString(),
					description: gr.incident.caused_by.short_description.toString(),
					sys_id: gr.incident.caused_by.toString()
				}
			},
			ci: {
				name: gr.cmdb_ci.name.toString(),
				sys_id: gr.cmdb_ci.toString(),
				number: gr.cmdb_ci.number.toString()
			}
		}
	}

	var alert;
	var alertGR = new GlideRecord('em_alert_anomaly');
	if (alertGR.get(options.alert)) {
		alert = buildAlert( alertGR );
	} else {
  	alertGR = new GlideRecord('em_alert_anomaly');
  	// alertGR.addEncodedQuery('state!=Closed');
  	alertGR.orderByDesc('sys_created_on');
  	alertGR.query();
  	alertGR.next();
  	alert = buildAlert( alertGR );
  }

	data.alert = alert;
	data.drawerWidget = $sp.getWidget('pe-root-cause-details', {
	  alert: alert.sys_id
	});
	
})();