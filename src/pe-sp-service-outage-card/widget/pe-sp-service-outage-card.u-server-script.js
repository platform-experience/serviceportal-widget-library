(function () {
  input = input || {};
  data.sys_id = options.sys_id || input.sys_id || $sp.getParameter("sys_id");
  data.outages = [];

  if (!data.sys_id)
    return;

  var serviceGR = new GlideRecord("cmdb_ci_service");
  if (serviceGR.get(data.sys_id))
    data.name = serviceGR.getDisplayValue();

  if (input.action && input.action == 'create') {
    var gr = new GlideRecord('cmdb_ci_outage');
    if (gr.get(input.outage_sys_id)) {
      if (!gr.getValue('task_number')) {
        var grIncInsert = new GlideRecord('incident');
        grIncInsert.caller_id = gs.getUserID();
        grIncInsert.cmdb_ci = serviceGR.getUniqueValue();
        grIncInsert.business_service = serviceGR.getUniqueValue();
        grIncInsert.contact_type = 'email';
        grIncInsert.short_description = gs.getMessage('Major incident for outage affected by') + ' ' + gr.getDisplayValue('short_description');
        data.incident_sys_id = grIncInsert.insert();
        var grUpdate = new GlideRecord('cmdb_ci_outage');
        grUpdate.get(input.outage_sys_id);
        grUpdate.setValue('task_number', data.incident_sys_id);
        grUpdate.update();
      }
    }
  }

  var outageGR = x_pisn_mso.ServiceOutage.outagesGR(data.sys_id);
  outageGR.addQuery('type', 'Outage');
  outageGR.orderByDesc('sys_updated_on');
  outageGR.query();
  var outage = {};
  var task = {};

  while (outageGR.next()) {

    outage = new x_pisn_mso.ServiceOutage(outageGR).serialize();
    outage.message = outageGR.getDisplayValue('message');
    outage.short_description = outageGR.getDisplayValue('short_description');
    outage.begin_ts = outageGR.getValue('begin');
    outage.sys_updated_on = outageGR.getValue('sys_updated_on');
    outage.incidents = [];
    if (outageGR.task_number && outageGR.task_number.sys_class_name == 'incident') {
      var incidentID = outageGR.task_number.toString();
      var incidentGR = new GlideRecord('incident');
      incidentGR.get(incidentID);
      if (incidentGR.caller_id.toString() == gs.getUserID()) {
        task = {};
        task.sys_id = incidentGR.getUniqueValue();
        task.number = incidentGR.number.getDisplayValue();
        task.short_description = incidentGR.short_description.getDisplayValue();
        task.state = incidentGR.state.getDisplayValue();
        task.__table = incidentGR.getTableName();
        outage.incidents.push(task);
      }

      outage.outage_detail = new x_pisn_mso.MajorIncident(incidentID).getMainInfo();
      outage.services_impacted = x_pisn_mso.ServiceData.getImpactedServices(incidentID);
      outage.task = incidentID;
      outage.task_caller = incidentGR.caller_id.toString();
      outage.is_affected = outage.task_caller == gs.getUserID() && outage.incidents.length == 0;

      if (!outage.is_affected) {
        var childGR = new GlideRecord('incident');
        childGR.addQuery('caller_id', gs.getUserID());
        childGR.addQuery('parent', incidentID);
        childGR.query();
        outage.is_affected = childGR.hasNext();
      }
    }
    data.outages.push(outage);
  }

})();
