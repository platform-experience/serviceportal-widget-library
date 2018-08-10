function LocationController($rootScope, $scope) {
  var c = this;
  c.selectLocation = selectLocation;

  c.$onInit = function() {
    $rootScope.wrapper.actionLabel = 'Submit';
  };

  function selectLocation() {
    c.locationSelected = true;
    $rootScope.wrapper.actionEnabled = true;
    $rootScope.wrapper.action = nextTask; //this comes from Link function
  }

  function nextTask() {
    $scope.$emit('next-task', { changeState: true });
  }
}
