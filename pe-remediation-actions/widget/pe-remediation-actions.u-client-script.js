function RemediationActionsController($window, actionService) {
  var c = this;
  c.goToAction = goToAction;

  c.$onInit = function() {
    c.alert = c.data.alert;
    getActions();
  };

  function getActions() {
    c.actions = actionService.getActions();
    return c.actions;
  }

  function goToAction(href) {
    $window.location.href = href;
  }
}