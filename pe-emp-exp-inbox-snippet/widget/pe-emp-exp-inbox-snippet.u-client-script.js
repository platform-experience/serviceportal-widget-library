function InboxController($rootScope, $scope, $timeout) {
  var c = this;
  $rootScope.$broadcast('changeBackState', '');
  $rootScope.title = 'MY TEAM';

  c.getStyleOne = function (type) {
    if (type == 'complete') {
      return {
        'background': '#fff',
        'clip': 'rect(0 40px 22px 0)',
        'transform': 'rotate(90deg)',
        'border-radius': '50%'
      };
    }
  };

  c.getStyleTwo = function (deg) {
    return {
      'background': '#fff',
      'clip': 'rect(0 20px 40px 0)',
      'transform': 'rotate(' + deg + 'deg)',
      'border-radius': '50%'
    };
  };
}