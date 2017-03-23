function ApprovalCardController(spUtil, $scope) {
  var c = this;

  spUtil.get('pe-approval-card', {
  }).then(function (response) {
    c.data.embedded_widget = response;
  });

  $scope.$on('cart-solved', function (event, param) {
    c.server.get({action: 'approve'}).then(function () {
    })
  });

  $scope.$on('cart-reject', function (event, param) {
    c.server.get({action: 'approve'}).then(function () {
    })
  });

  $scope.$on('cart-view', function (event, param) {
    // {table: "x", record: 'y'}
  });
}