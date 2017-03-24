function ApprovalCardController(spUtil, $scope) {
  var c = this;

  var widget_param = {
    title: c.data.task.short_description.display_value || c.options.title,
    purpose: c.data.task.request_item.display_value || c.options.purpose,
    icon: c.options.icon,
    user: c.data.task.assigned_to.value
  };


  spUtil.get('pe-approval-card', widget_param).then(function (response) {
    c.data.embedded_widget = response;
  });

  $scope.$on('cart-solved', function (event, param) {
    c.server.get({action: param.status}).then(function () {
      $scope.$broadcast('card-update', param);
    })
  });


  $scope.$on('cart-view', function (event, param) {
    // {table: "x", record: 'y'}
  });
}