function NextTaskController($scope, $location) {
  var c = this;

  c.$onInit = function() {
    c.data.startMonth = moment(c.data.data).format('MMM');
    c.data.startDay = moment(c.data.date).date();
    if (c.data.async) {
      $scope.data.action = 'loadData';
      $scope.server.update();
    }

    if (c.data.taskCount <= 0) {
      $location.search('id', 'skohr_summary');
    } else {
      c.showOnboarding = true;
    }
  };
}
