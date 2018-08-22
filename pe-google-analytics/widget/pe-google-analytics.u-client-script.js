function GoogleAnalyticsController(gaService) {
  var c = this;

  c.$onInit = function() {
    activateTracking();
    capturePageView();
  };

  function activateTracking() {
    gaService.getTrackingSnippet(c.options.debug);
    ga('create', c.options.trackingId, 'auto');
  }

  function capturePageView() {
    ga('send', 'pageview');
  }
}
