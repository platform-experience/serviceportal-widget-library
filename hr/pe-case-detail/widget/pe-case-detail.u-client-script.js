function CaseDetailController($location) {
  var c = this;
  c.openTask = openTask;

  c.$onInit = function() {
    populateDueSoonAndOverdue();
  };

  function populateDueSoonAndOverdue() {
    var now = moment();
    c.due_soon = [];
    c.overdue = [];
    c.data.tasks.forEach(function(task, index) {
      var taskMoment = moment(task.due_date, 'YYYY-MM-DD hh:mm:ss');
      task.due_in = taskMoment.diff(now, 'days');
      task.due_in_dv = taskMoment.fromNow(true);
      if (task.due_in < 0 && task.state != '3') {
        task.overdue = true;
        c.overdue.push(task);
      } else if (task.due_in <= 5 && task.state != '3') {
        task.due_soon = true;
        c.due_soon.push(task);
      }
    });
  }

  function openTask(task) {
    $location.url('?id=' + c.options.link + '&sys_id=' + task.sys_id);
  }
}
