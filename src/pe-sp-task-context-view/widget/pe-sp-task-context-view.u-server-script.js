(function() {
  var spTaskContextViewAPI = new x_pisn_sp_ctx_view.SpTaskContextViewAPI();

  data.views = spTaskContextViewAPI.getViews();

  data.tasks = spTaskContextViewAPI.getTasks(
    options.table,
    options.filter,
    options.maximum_entries,
    options.order_by,
    options.order_direction,
    options.field_list
  );

  data.tasks.forEach(function(task) {
    task.view = spTaskContextViewAPI.getTaskView(task, data.views);
    if (!task.view.widget_options) {
      task.view = {};
      task.view.widget_view = options.default_view_widget;
      task.view.widget_options = JSON.parse(
        options.default_view_widget_options
      );
      task.view.widget_options.sys_id = task.sys_id;
      task.view.widget_options.table = task.sys_class_name;
    }
  });
})();
