describe('Events service', function() {
  beforeEach(module('pe-timeline'));

  beforeEach(
    inject(function(_eventsService_) {
      eventsService = _eventsService_;
    })
  );

  it('getInitialEvents method should exist', function() {
    expect(eventsService.getInitialEvents).toBeDefined();
  });

  it('should have 3 events', function() {
    var eventLength = eventsService.getInitialEvents().length;
    expect(eventLength).toEqual(3);
  });

  it('should have Automated Risk Assessment as the last event', function() {
    var events = eventsService.getInitialEvents();
    var lastEvent = Object.keys(events).sort().pop();
    expect(events[lastEvent].description).toBe('Automated Risk Assessment');
  });
});
