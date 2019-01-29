function ProblemMessageController($interval, timeService) {
  var c = this;

  c.$onInit = function() {
    getTimes();
    incrementTime();
  };

  function getTimes() {
    c.timeAgo = timeService.getTimeAgo(c.data.problemTime, c.data.today);
    return c.timeAgo;
  }

  function incrementTime() {
    $interval(function() {
      getTimes();
    }, 60000);
  }
}