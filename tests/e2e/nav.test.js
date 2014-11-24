// test the main navigation
describe('e2e: navigation', function() {

  var ptor;
  browser.get('/');
  ptor = protractor.getInstance();

  beforeEach(function() {
    link = element(by.css('.navbar a[href="/signIn"]'));
    link.click();
  });

  it('should navigate to the /signIn page when clicking', function() {
    expect(ptor.getCurrentUrl()).toMatch(/\/signIn/);
  });

  //todo: not implemented yet
  // it('should make the nav class active when at /login', function() {
  //   expect(link.getAttribute('class')).toMatch(/active/);
  // });

});
