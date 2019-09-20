function SpSwapperController($scope, $location) {
  var c = this;
  if ($scope.portal && $scope.portal.logo) {
    c.logo = $scope.portal.logo;
  }

  c.goToPortal = function(item) {
    $location.path("/" + item.url_suffix).search({
      id: item.homepage
    });
  };

  c.goToHomepage = function() {
    $location.search({
      id: $scope.portal.homepage_dv
    });
  };
}
