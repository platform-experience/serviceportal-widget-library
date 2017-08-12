function TitleCardController($scope, $window) {
  var c = this;

  c.status = {
    name: "Abnormally High Response Times",
    number: "ALT3690",
    probability: 78,
    createdAgo: "2m",
    bu: "Retail POS"
  };

  $rootScope.$on('recovered', function (event, data) {
    c.recovered = true;
    $window.scrollTo(0, 0);
  });
}