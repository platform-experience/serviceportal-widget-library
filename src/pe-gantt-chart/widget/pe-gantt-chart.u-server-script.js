(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

  //Collecting data from options
  var rp = options.project_list.split(',') || [];
  data.series = [];
  data.categories = [];
  var project = [];
  for (var i = 0; i < rp.length; i++) {
    var grProject = new GlideRecord('pm_project');
    grProject.addQuery('sys_id', rp[i]);
    grProject.query();
    while (grProject.next()) {
      var start = new GlideDateTime(grProject.start_date.getDisplayValue());
      var end = new GlideDateTime(grProject.end_date.getDisplayValue());
      if (grProject.short_description && grProject.start_date && grProject.end_date != null) {
        data.series.push({
          id: grProject.getUniqueValue(),
          text: grProject.short_description.getDisplayValue(),
          state: grProject.state + "",
          start_date: start.getDate() + "",
          end_date: end.getDate() + ""
        })
      }

      var grTask = new GlideRecord('pm_project_task');
      grTask.addQuery('parent', grProject.getUniqueValue());
      grTask.query();
      var task = [];
      while (grTask.next()) {
        var taskStart = new GlideDateTime(grTask.start_date.getDisplayValue());
        var taskEnd = new GlideDateTime(grTask.end_date.getDisplayValue());
        data.series.push({
          parent: grTask.getValue('parent'),
          text: grTask.short_description.getDisplayValue(),
          state: grTask.state + "",
          start: taskStart.getDate() + "",
          end_date: taskStart.getDate() + ""
        })
      }
    }

  }


})();

