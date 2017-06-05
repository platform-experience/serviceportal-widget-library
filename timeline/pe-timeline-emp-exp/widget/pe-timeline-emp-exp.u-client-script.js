function TimelineController(timelineService) {
  var c = this;

  c.$onInit = function() {
    c.timelineData = timelineService.getInitialEvents();
  };
}