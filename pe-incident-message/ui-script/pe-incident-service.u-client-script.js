(function() {
  'use strict';

  function timeService() {
    var service = {
      getTimeAgo: getTimeAgo
    };
    return service;

    function getTimeAgo(openedTime) {
      var timeAgo = {};
      if (openedTime) {
        var problemTime = new Date(openedTime);
        var currentTime = new Date();
        var timeDiff = currentTime - problemTime;
        var minDiff = timeDiff / 60000;
        var hourDiff = timeDiff / 3600000;
        var dayDiff = timeDiff / 86400000;
        timeAgo.minutes = Math.floor(minDiff - 60 * Math.floor(hourDiff));
        timeAgo.hours = Math.floor(Math.abs(hourDiff + 4));
        timeAgo.days = Math.floor(Math.abs(dayDiff) + 1);
      }
      return timeAgo;
    }
  }

  angular
    .module('pe-incident-message')
    .service('timeService', timeService);
})();