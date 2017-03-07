function TimelineController(eventsService) {
  var c = this;
  c.nextInitialEvent = nextInitialEvent;
  c.expandInitialEvents = expandInitialEvents;
  c.collapseInitialEvents = collapseInitialEvents;

  c.$onInit = function() {
    c.title = c.data.title;
    c.initialEvents = getInitialEvents();
    c.itemsCount = c.initialEvents.length;
    c.fadeOldEvents = false;
  };

  function showEvents() {
    c.shownInitialEvents = c.data.initial_elements;
    if (c.shownInitialEvents === undefined) {
      c.shownInitialEvents = 0;
    }
  }

  function getInitialEvents() {
    showEvents();
    var events = eventsService.getInitialEvents();
    return events;
  }

  function nextInitialEvent() {
    if (c.shownInitialEvents < c.initialEvents.length) {
      c.shownInitialEvents++;
    } else {
      c.shownInitialEvents = 0;
      c.fadeOldEvents = false;
    }
  }

  function expandInitialEvents() {
    c.shownInitialEvents = c.initialEvents.length;
    c.fadeOldEvents = false;
  }

  function collapseInitialEvents() {
    c.shownInitialEvents = 0;
    c.fadeOldEvents = false;
  }
}