(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
    options.alert_sysid = options.alert_sysid || serverOptions.alert_sysid;

    var getState = function(stateValue, table) {
        var state = new GlideRecord('sys_choice');
        state.addQuery('element', 'state');
        state.addQuery('name', table);
        state.addQuery('value', stateValue);
        state.query();
        while (state.next()) {
            stateObj = {
                value: stateValue,
                label: state.label.toString(),
                labelClass: state.label.toLowerCase().split(' ').join('-')
            };
        };
        return stateObj;
    };

    var buildAlert = function(rec) {
        return {
            sys_id: rec.sys_id.toString(),
            type: rec.type.getDisplayValue(),
            description: rec.description.toString(),
            incident: rec.incident.sys_id.toString(),
            ci: {
                name: rec.cmdb_ci.name.toString(),
                sys_id: rec.cmdb_ci.toString(),
                number: rec.cmdb_ci.number.toString()
            }
        }
    }

    var alert;
    var alertGR = new GlideRecord('em_alert_anomaly');
    if (options.alert_sysid) {
        alertGR = new GlideRecord('em_alert_anomaly');
        alertGR.get(options.alert_sysid);
        alert = buildAlert(alertGR);
    } else {
        alertGR = new GlideRecord('em_alert_anomaly');
        //alertGR.addEncodedQuery('state!=Closed');
        alertGR.orderByDesc('sys_created_on');
        alertGR.query();
        alertGR.next();
        alert = buildAlert(alertGR);
    }

    data.alert = alert;

    if (alert.incident) {

        var incidentGR = new GlideRecord('incident');
        if (incidentGR.get(alert.incident)) {
            var incident = {
                sys_id: incidentGR.sys_id.toString(),
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
                while (otherIncidentGR.next()) {
                    otherIncidents.push({
                        sys_id: otherIncidentGR.sys_id.toString(),
                        description: otherIncidentGR.short_description.toString(),
                        number: otherIncidentGR.number.toString(),
                        state: getState(otherIncidentGR.state.toString(), 'incident')
                    });
                }
                incident.problem.other_incidents = otherIncidents;
            }

            data.incident = incident;

        }

    }

})();