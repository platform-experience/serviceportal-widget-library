function PeopleCardFlyoutController() {
  var c = this;
  c.toggleTrends = toggleTrends;

  c.$onInit = function() {
    c.isVisible = false;
  };

  function toggleTrends() {
    c.isVisible = !c.isVisible;
  }
}
