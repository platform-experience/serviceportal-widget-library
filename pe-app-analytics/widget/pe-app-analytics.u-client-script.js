function AppAnalyticsController($scope) {
  /* widget controller */
  var c = this;
  var url = "https://www.google-analytics.com/analytics.js";
  var gaObj = {
    trackingId: c.options.gacode,
    cookieDomain: 'auto'
  };

  if (c.options.debug) {
    url = "https://www.google-analytics.com/analytics_debug.js";
  }


  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', url, 'ga');


  if (c.options.debug) {
    ga('set', 'sendHitTask', null);
    window.ga_debug = {trace: true};
  }

  if ($scope.user) {
    gaObj.userId = $scope.user.user_name;
  }
  ga('create', gaObj);
}