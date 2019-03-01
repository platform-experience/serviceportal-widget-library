function PIProcessFlowCtrl(spUtil, $scope) {
  /* widget controller */
  var c = this;

  c.hasIcon = function (stage) {
    return c.options.show_icons && c.getIcon(stage);
  };

  c.getIcon = function (stage) {
    if (stage.state == 'past') {
      return 'fa-check';
    }

    return;
  };

  c.showProcessFlow = function () {
    return c.data.process_flow && c.data.process_flow.stages.length > 0;
  };

  spUtil.recordWatch($scope, c.data.table, 'sys_id=' + c.data.sys_id, function () {
    spUtil.update($scope);
  });
}
