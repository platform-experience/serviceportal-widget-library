function ApprovalCardController(spUtil, $scope) {
  var c = this;

  spUtil.get('pe-approval-card', {}).then(function (response) {
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