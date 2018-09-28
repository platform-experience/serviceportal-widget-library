(function(angular) {
  var app = angular.module('bn.core');
  app.directive('bnNotify', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        classes: '@',
        demo: '@',
        options: '@',
        settings: '@',
        broadcast: '@',
        broadcastCount: '@',
        count: '@'
      },
      controllerAs: 'bnNotifyCtrl',
      controller: function($scope, $rootScope, $transclude) {
        if (!$scope.broadcast) {$scope.broadcast = 'bn-notify-show';}
        if (!$scope.broadcastCount) {$scope.broadcastCount = 'bn-notify-count';}
        if (!$scope.count) {$scope.count = 0;}
        else {$scope.count = parseInt($scope.count);}

        if ($scope.demo)
        {$scope.demo = $scope.demo == 'true' || $scope.demo == true;}

        if (!$scope.options)
        {$scope.options = {
          title: '<strong>DEMO</strong>',
          message:
              'A notification pops communicating the last thing happened in the app.'
        };}
        else {$scope.options = JSON.parse(scope.options);}

        if (!$scope.settings)
        {$scope.settings = {
          type: 'info',
          delay: 1000,
          z_index: 9999,
          animate: {
            enter: 'animated fadeInDown'
          }
        };}
        else {$scope.settings = JSON.parse(scope.settings);}

        $rootScope.$on($scope.broadcastCount, function(event, value) {
          if (value) {$scope.count = value;}
        });
        $rootScope.$on($scope.broadcast, function(event, obj) {
          if (obj && obj.options) {$scope.options = obj.options;}
          if (obj && obj.settings) {$scope.settings = obj.settings;}
          $scope.showNotification();
        });

        if ($scope.demo && $scope.demo == true) {
          setTimeout(function() {
            $scope.count = 1;
            $scope.showNotification();
          }, 1000);
        }
      },
      link: function(scope) {
        $(document).ready(function() {
          scope.$watch(scope, function(newValues, oldValues, scope) {
            scope.showNotification = function() {
              $.notify(scope.options, scope.settings);
            };
          });
        });
      },
      template:
        '<div class="bn-notify {{classes}}"><img src="notifications.svg" /><span class="badge bn-notify-badge-circle" ng-show="count>0">{{count}}</span></div>'
    };
  });
})(angular);
