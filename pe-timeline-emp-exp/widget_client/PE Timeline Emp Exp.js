function TimelineController(timelineService) {
  var c = this;

  c.$onInit = function () {
    c.timelinedata = getInitialEvents();
    console.log(c.timelinedata);

  };

  function getInitialEvents() {
    var events = timelineService.getInitialEvents();
    return events;
  }



}