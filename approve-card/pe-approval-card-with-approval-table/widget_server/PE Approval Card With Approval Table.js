(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  var task_sysid = options.task_record;
  var taskGr = new GlideRecord('sc_task');
  if (!taskGr.get(task_sysid)) {
    return
  }


  if (input.action == 'approve') {
    taskGr.approval = 'approved';
    taskGr.update();
    return;
  }

  if (input.action == 'reject') {
    taskGr.approval = 'rejected';
    taskGr.update();
    return;
  }

  var obj = {};
  $sp.getRecordElements(obj, taskGr, 'short_description,description,request_item,assigned_to');
  data.task = obj;
})();