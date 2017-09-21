(function() {
  'use strict';

  function timeService() {
    var service = {
      getTimeAgo: getTimeAgo
    };
    return service;

    function getTimeAgo(openedTime, serverDate) {
      var timeAgo = {};
      if (openedTime) {
        var today = new Date(serverDate);
        var problemTime = new Date(openedTime);
        var secondDiff = today - problemTime;
        timeAgo.days = Math.floor(secondDiff / 86400000);
        timeAgo.hours = Math.floor((secondDiff % 86400000) / 3600000);
        timeAgo.minutes = Math.round(((secondDiff % 86400000) % 3600000) / 60000);
      }
      return timeAgo;
    }
  }

  angular
    .module('pe-incident-message')
    .service('timeService', timeService);
})();