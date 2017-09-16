describe('Incident message controller', function() {
  beforeEach(module('pe-incident-message'));

  it('should have a named function', function() {
    expect(IncidentMessageController).toBeDefined();
  });

  it('has two arguments', function() {
    var argLength = IncidentMessageController.length;
    expect(argLength).toEqual(2);
  });
});
