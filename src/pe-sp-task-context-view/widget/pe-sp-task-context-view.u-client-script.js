function SpContextViewsController(spUtil, $scope) {
  var c = this;

  c.$onInit = function() {
    c.currentView = undefined;
    c.selecting = false;
    c.current = '';

    c.data.views.forEach(function(element) {
      spUtil.recordWatch($scope, element.table, element.filter, function(data) {
        c.server.get({}).then(function(response) {
          c.data = response.data;
        });
      });
    });
  };

  c.getColor = function(task) {
    if (
      task.view.states &&
      task.view.states[task.state_value] &&
      c.current != task.sys_id
    ) {
      return task.view.states[task.state_value];
    } else {
      return '';
    }
  };

  c.select = function(task) {
    c.currentView = undefined;
    c.selecting = true;
    spUtil
      .get(task.view.widget_view, task.view.widget_options)
      .then(function(response) {
        c.currentView = response;
        c.current = task.sys_id;
      });
  };
}
