(function () {
  input = input || {};
  data.table = input.table || options.table || $sp.getParameter('table');
  data.sys_id = input.sys_id || options.sys_id || $sp.getParameter('sys_id');
  if (!data.table)
    return;
  data.embedded_widget = $sp.getWidget('x-pisn-sp-procflow-lite', {
    table: data.table,
    sys_id: data.sys_id
  });

})();
