function IncidentMessageController($interval, timeService) {
  var c = this;

  c.$onInit = function() {
    getTimes();
    incrementTime();
  };

  function getTimes() {
    c.timeAgo = timeService.getTimeAgo(c.data.problemTime);
    return c.timeAgo;
  }

  function incrementTime() {
    $interval(function() {
      getTimes();
    }, 60000);
  }
}