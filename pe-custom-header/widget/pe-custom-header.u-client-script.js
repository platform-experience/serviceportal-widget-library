function CustomHeaderController($rootScope, $scope, snRecordWatcher, spUtil, $location, $uibModal, cabrillo, $timeout) {
  var c = this;

  $scope.userID = $scope.user.sys_id;
  if (cabrillo.isNative())
    $scope.isViewNative = true;

  $scope.openPopUp = function () {
    var url = "$chat_support.do?queueID=" + $scope.data.connect_support_queue_id;
    var popup = window.open(url, "popup", "width=900, height=600");
  };

  $scope.openLogin = function () {
    $scope.modalInstance = $uibModal.open({
      templateUrl: 'modalLogin',
      scope: $scope
    });
  };

  $rootScope.$on('sp.avatar_changed', function () {
    $scope.userID = "";
    $timeout(function () {
      $scope.userID = $scope.user.sys_id;
    });
  });

  $scope.isHomepage = function () {
    if (!$scope.page.id)
      return true;

    if ($scope.page.id == $scope.portal.homepage_dv)
      return true;

    return false;
  };

  c.reset = function () {
    c.server.get({
      action: 'reset'
    }).then(function (response) {
      window.location.reload();
    });
  }


  c.goBack = function () {
    window.history.back();
  };
}