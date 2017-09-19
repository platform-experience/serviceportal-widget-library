describe('Timeline controller', function() {
  beforeEach(module('pe-timeline'));

  it('should have a named function defined', function() {
    expect(TimelineController).toBeDefined();
  });

  it('has one argument', function() {
    var argLength = TimelineController.length;
    expect(argLength).toEqual(1);
  });
});
