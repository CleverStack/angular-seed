// test if the homepage is loading
describe('e2e: home', function() {

  var ptor;
  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('should load the home page', function() {
    expect(ptor.isElementPresent(by.id('home'))).toBe(true);
  });

});
