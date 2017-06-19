(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    var serverOptions = input.options ? input.options : (input.parameters ? input.parameters : {});
    options.alert_sysid = options.alert_sysid || serverOptions.alert_sysid;
    options.titleIconClasses = options.titleIconClasses || serverOptions.titleIconClasses || 'fa fa-bolt';

    var getState = function(stateValue, table) {
        var stateObj = {
            value: null,
            label: 'Unknown State'
        };
        var state = new GlideRecord('sys_choice');
        state.addQuery('element', 'state');
        state.addQuery('name', table);
        state.addQuery('value', stateValue);
        state.query();
        while (state.next()) {
            stateObj = {
                value: stateValue,
                label: state.label.toString()
            };
        }
        return stateObj;
    };

    var buildAlert = function(rec) {
        return {
            sys_id: rec.sys_id.toString(),
            type: rec.type.getDisplayValue(),
            description: rec.description.toString(),
            state: rec.state.toString(),
            incident: {
                sys_id: rec.incident.sys_id.toString(),
                state: getState(rec.incident.state.toString(), 'incident'),
                problem: {
                    name: rec.incident.problem_id.short_description.toString(),
                    sys_id: rec.incident.problem_id.toString(),
                    other_incidents: []
                },
                cause: {
                    number: rec.incident.caused_by.number.toString(),
                    description: rec.incident.caused_by.short_description.toString(),
                    sys_id: rec.incident.caused_by.toString()
                }
            },
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
    data.drawerWidget = $sp.getWidget('pe-root-cause-details', {
        alert_sysid: options.alert_sysid
    });

})();