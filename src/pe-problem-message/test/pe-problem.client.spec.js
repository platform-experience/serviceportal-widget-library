describe('Incident message controller', function() {
  beforeEach(module('pe-problem-message'));

  it('should have a named function', function() {
    expect(ProblemMessageController).toBeDefined();
  });

  it('has two arguments', function() {
    var argLength = ProblemMessageController.length;
    expect(argLength).toEqual(2);
  });
});
