(function () {
  input = input || {};
  data.sys_id = input.sys_id || options.task_id || $sp.getParameter('sys_id');
  data.table = options.table || $sp.getParameter('table') || 'task';
  data.tasks = [];

  function GetAttributes(gr) {
    var record = {
      sys_id: gr.getUniqueValue(),
      table: gr.getTableName(),
      number: gr.number.getDisplayValue(),
      short_description: gr.short_description.getDisplayValue(),
      parent: gr.parent.toString(),
      assignment_group: gr.assignment_group.getDisplayValue(),
      assigned_to: gr.assigned_to.getDisplayValue(),
      assigned_to_id: gr.getValue('assigned_to'),
      due_date: gr.due_date.getDisplayValue(),
      state: gr.state.getDisplayValue(),
      proc_flow: new x_pisn_sp_procflow.ProcessFlow(gr).toObject(),
      pf_widget: $sp.getWidget('x-pisn-sp-procflow-lite', {
        table: gr.sys_class_name.toString(),
        sys_id: gr.getUniqueValue()
      }),
      pf_popup_widget: $sp.getWidget('x-pisn-sp-procflow-popup', {
        table: gr.sys_class_name.toString(),
        sys_id: gr.getUniqueValue()
      }),
      active: gr.active == true,
      approval: gr.approval.getDisplayValue(),
      approval_internal: gr.approval.toString()
    };
    return record;
  }

  function GetChildren(sys_id, order_by) {
    var records = [];
    var gr = new GlideRecord(data.table);
    gr.addQuery('parent', sys_id);
    if (options.order_by) {
      if (options.order_direction == 'desc')
        gr.orderByDesc(options.order_by);
      else
        gr.orderBy(options.order_by);
    }
    gr.query();
    while (gr.next())
      records.push(GetAttributes(gr));

    return records;
  }

  if (input && input.action == 'approved') {
    var appGR = new GlideRecord('sysapproval_approver');
    if (appGR.get(input.approval_id) && appGR.state.canWrite()) {
      appGR.state = 'approved';
      appGR.update();
    }
    return;
  }

  if (!data.sys_id)
    return;

  var parentTaskGR = new GlideRecord(data.table);
  if (parentTaskGR.get(data.sys_id)) {
    data.task_number = parentTaskGR.number.getDisplayValue();
    data.task_table = parentTaskGR.getTableName();
  }

  var taskGR = new GlideRecord(data.table);
  taskGR.addQuery('parent', data.sys_id);

  if (options.order_by) {
    if (options.order_direction == 'desc')
      taskGR.orderByDesc(options.order_by);
    else
      taskGR.orderBy(options.order_by);
  }

  taskGR.query();
  while (taskGR.next()) {
    data.tasks.push(GetAttributes(taskGR));
    data.tasks = data.tasks.concat(GetChildren(taskGR.getUniqueValue()));
  }

  var taskIDs = data.tasks.map(function (t) {
    return t.sys_id;
  });
  var taskTables = data.tasks.map(function (t) {
    return t.table;
  });

  data.attachments = [];
  data.approvals = [];
  data.task_ids = taskIDs;
  data.task_tables = taskTables;

  if (taskIDs.length) {
    var attachmentGR = new GlideRecord('sys_attachment');
    attachmentGR.addQuery('table_sys_id', 'IN', taskIDs);
    attachmentGR.query();
    while (attachmentGR.next()) {
      data.attachments.push({
        sys_id: attachmentGR.getUniqueValue(),
        file_name: attachmentGR.file_name.toString(),
        content_type: attachmentGR.content_type.toString(),
        state: attachmentGR.state.toString(),
        table_sys_id: attachmentGR.table_sys_id.toString()
      });
    }

    var approvalGR = new GlideRecord('sysapproval_approver');
    approvalGR.addQuery('sysapproval', 'IN', taskIDs);
    approvalGR.query();
    while (approvalGR.next()) {
      data.approvals.push({
        sys_id: approvalGR.getUniqueValue(),
        sysapproval: approvalGR.sysapproval.toString(),
        state: approvalGR.state.toString(),
        approver: approvalGR.approver.getDisplayValue(),
        approver_id: approvalGR.approver.toString(),
        is_mine: approvalGR.approver.toString() == gs.getUserID()
      });
    }
  }
})();
