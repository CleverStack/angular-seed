describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo('index.html');
  });

  it('should have a working / route', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/");
  });

});