(function() {
  'use strict';

  function gaService() {
    var service = {
      getTrackingSnippet: getTrackingSnippet,
      setDebugMode: setDebugMode
    };
    return service;

    function getTrackingSnippet(isDebug) {
      (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();
        a = s.createElement(o), m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', setDebugMode(isDebug), 'ga');
    }

    function setDebugMode(isDebug) {
      var debugUrl = 'https://www.google-analytics.com/analytics_debug.js';
      var url = 'https://www.google-analytics.com/analytics.js';
      return isDebug === 'true' ? debugUrl : url;
    }
  }


  angular
    .module('googleAnalytics')
    .service('gaService', gaService);
})();