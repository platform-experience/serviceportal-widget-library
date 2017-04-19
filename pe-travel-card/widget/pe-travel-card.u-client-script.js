function TravelCardController($timeout) {
  var c = this;
  c.cancelAction = cancelAction;

  function cancelAction() {
    c.data.canceled = true;
    $timeout(function() {
      c.data.hideWidget = true;
    }, 1500);
  }
}