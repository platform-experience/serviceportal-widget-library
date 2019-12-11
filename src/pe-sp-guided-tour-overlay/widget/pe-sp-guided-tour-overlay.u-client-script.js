function SPGuidedTourOverlayController($scope, $rootScope, $timeout, $location, spGtd) {
  /* widget controller */
  var c = this;

  c.$onInit = function() {
    c.tour_id = '';
  };

  var eventListenerStepStarted = function(data) {
    $timeout(function() {
      if (c.tour_id.length == 0) {
        c.server
          .get({
            tour_id: data.tour
          })
          .then(function(response) {
            c.tour_id = data.tour;
            c.data = response.data;
            $scope.stepStarted(data.step);
          });
      } else {
        $scope.stepStarted(data.step);
      }
    }, 0);
  };

  var eventListenerTourEnded = function(data) {
    $timeout(function() {
      $scope.tourEnded();
    }, 0);
  };

  $rootScope.$on('$locationChangeStart', function(event, current, previous) {
    c.$onInit();
  });

  top.NOW.guided_tours.events.on('stepStarted', eventListenerStepStarted);
  top.NOW.guided_tours.events.on('tourEnded', eventListenerTourEnded);

}
