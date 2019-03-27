(function () {
  input = input || {};
  data.table = input.table || options.table || $sp.getParameter('table');
  data.sys_id = input.sys_id || options.sys_id || $sp.getParameter('sys_id');
  data.show_arrow = input.show_arrow || options.show_arrow || false;
  data.show_arrow = data.show_arrow == 'true' || data.show_arrow == true;
  data.is_valid = false;

  if (!data.table)
    return;

  var taskGR = new GlideRecord(data.table);
  if (!taskGR.get(data.sys_id))
    return;

  data.is_valid = true;
  data.process_flow = new ProcessFlow(taskGR).toObject();
})();
