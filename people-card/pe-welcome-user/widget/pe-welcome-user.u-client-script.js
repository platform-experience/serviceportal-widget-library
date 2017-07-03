function WelcomeLoggedUser($scope, $state) {
  /* widget controller */
  var c = this;
  c.showNotification = false;
  c.notificationNum = 1;
  c.notificationTitle = 'Title';

  c.notificationBodyText = true;
  c.notificationBody = "this can be text or eventually HTML rendered thorugh ng-bind-html";
  $scope.userID = $scope.user.sys_id;

  c.action = function () {
    $state.go('', {
      widget: ''
    });
  };

}