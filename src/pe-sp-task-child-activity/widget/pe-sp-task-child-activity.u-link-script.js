function link(scope, element, attrs, controller) {
  scope.c.closeModal = function () {
    var button = $('body').find('button.close');
    angular.element(button).scope().$dismiss();
  };
  scope.c.cssModal = function () {
    var modalBody = $('body').find('.modal-body');
    modalBody.css('padding', '0');
    modalBody.css('-webkit-font-smoothing', 'antialiased');
    modalBody.css('-moz-osx-font-smoothing', 'grayscale');
    modalBody.css('text-rendering', 'optimizeLegibility');
    var panel = modalBody.find('.panel');
    panel.css('border', '0');
    panel.css('box-shadow', 'none');
  };
  scope.c.toggleCollapse = function (taskId) {
    $('#collapseTask' + taskId).collapse('toggle');
    $('#collapseCircle' + taskId).toggleClass('collapse-opened');
  };
}
