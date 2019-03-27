function PIProcessFlowLiteController(spUtil, $scope) {
  var c = this;

  c.$onInit = function () {};

  c.showProcessFlow = function () {
    return c.data.process_flow && c.data.process_flow.stages.length > 0;
  };

  if (c.data.table)
    spUtil.recordWatch($scope, c.data.table, 'sys_id=' + c.data.sys_id, function () {
      spUtil.update($scope);
    });

}
