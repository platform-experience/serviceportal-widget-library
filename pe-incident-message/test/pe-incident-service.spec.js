describe('Time ago service', function() {
  beforeEach(module('pe-incident-message'));

  beforeEach(
    inject(function(_timeService_) {
      timeService = _timeService_;
    })
  );

  it('getTimeAgo method should exist', function() {
    expect(timeService.getTimeAgo).toBeDefined();
  });

  it('should return 3 properties', function() {
    var pastTime = '2017-08-07 19:22:32';
    var timeAgo = timeService.getTimeAgo(pastTime);
    expect(Object.keys(timeAgo).length).toBe(3);
  });

  it('new problem should be zero minutes ago', function() {
    var currentTime = new Date();
    var timeAgo = timeService.getTimeAgo(currentTime);
    expect(timeAgo.minutes).toEqual(0);
  });
});
