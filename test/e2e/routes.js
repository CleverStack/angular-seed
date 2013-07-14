describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo('index.html');
  });

  it('should have a working / route', function() {
    browser().navigateTo('#/');
    browser().location().path().should.be("/");
  });

});