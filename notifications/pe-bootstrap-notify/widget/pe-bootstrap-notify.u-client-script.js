function BootstrapNotifyController($rootScope) {
  var c = this;

  c.start = function() {
    $rootScope.$broadcast('bn-notify-show');
    $rootScope.$broadcast('bn-notify-count', 5);
  };
}
