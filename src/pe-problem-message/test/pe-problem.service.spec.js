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

  it('has two arguments', function() {
    var argLength = timeService.getTimeAgo.length;
    expect(argLength).toEqual(2);
  });

  it('should return 3 properties', function() {
    var pastTime = new Date('2017-08-07 19:22:32');
    var timeAgo = timeService.getTimeAgo(pastTime);
    expect(Object.keys(timeAgo).length).toBe(3);
  });

  it('new problem should be zero minutes ago', function() {
    var problemTime = new Date();
    var serverTime = new Date();
    var timeAgo = timeService.getTimeAgo(problemTime, serverTime);
    expect(timeAgo.minutes).toEqual(0);
  });

  it('problem should be one hour ago', function() {
    var problemTime = 'Thu Sep 21 2017 14:51:05 GMT-0500 (CDT)';
    var serverTime = 'Thu Sep 21 2017 15:51:05 GMT-0500 (CDT)';
    var timeAgo = timeService.getTimeAgo(problemTime, serverTime);
    expect(timeAgo.hours).toEqual(1);
  });
});
