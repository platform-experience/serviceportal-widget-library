function TimelineController(eventsService) {
  var c = this;
  c.collapseInitialEvents = collapseInitialEvents;
  c.expandInitialEvents = expandInitialEvents;
  c.nextInitialEvent = nextInitialEvent;

  c.$onInit = function() {
    c.title = c.data.title;
    c.initialEvents = getInitialEvents();
    c.itemsCount = c.initialEvents.length;
    c.fadeOldEvents = false;
  };

  function collapseInitialEvents() {
    c.shownInitialEvents = 0;
    c.fadeOldEvents = false;
  }

  function expandInitialEvents() {
    c.shownInitialEvents = c.initialEvents.length;
    c.fadeOldEvents = false;
  }

  function nextInitialEvent() {
    if (c.shownInitialEvents < c.initialEvents.length) {
      c.shownInitialEvents++;
    } else {
      c.shownInitialEvents = 0;
      c.fadeOldEvents = false;
    }
  }

  function getInitialEvents() {
    showEvents();
    var events = eventsService.getInitialEvents();
    return events;
  }

  function showEvents() {
    c.shownInitialEvents = c.data.initial_elements;
    if (c.shownInitialEvents === undefined) {
      c.shownInitialEvents = 0;
    }
  }
}