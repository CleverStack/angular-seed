// test the main navigation
describe('e2e: navigation', function() {

  var ptor;
  browser.get('/');
  ptor = protractor.getInstance();

  beforeEach(function() {
    link = element(by.css('.navbar ul.nav li a[href="/login"]'));
    link.click();
  });

  it('should navigate to the /login page when clicking', function() {
    expect(ptor.getCurrentUrl()).toMatch(/\/login/);
  });

  //todo: not implemented yet
  // it('should make the nav class active when at /login', function() {
  //   expect(link.getAttribute('class')).toMatch(/active/);
  // });

});
