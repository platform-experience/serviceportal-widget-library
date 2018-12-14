function CardScrollController($document, $timeout) {
  var c = this;
  var scrollSpeed = 700;
  var scrollOffset = 30;
  c.toggleTrends = toggleTrends;

  c.$onInit = function() {
    c.isToggled = false;
    c.isVisible = false;
  };

  function scrollDown() {
    var securityTrends = angular.element(document.getElementById('security-trends'));
    $document.scrollTo(securityTrends, scrollOffset, scrollSpeed);
    c.isToggled = true;
  }

  function scrollUp() {
    var subHeader = angular.element(document.getElementById('sub-header'));
    $document.scrollTo(subHeader, scrollOffset, scrollSpeed);
    $timeout(function() {
      c.isToggled = false;
    }, scrollSpeed);
  }

  function toggleTrends() {
    c.isVisible = !c.isVisible;
    c.isToggled === true ? scrollUp() : scrollDown();
  }
}