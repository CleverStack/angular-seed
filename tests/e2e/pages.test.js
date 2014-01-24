// test the main pages are working
describe('e2e: pages', function() {

  var ptor;
  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('check the login page is accasible from the homepage and has a form', function() {
    element(by.css('a[href="/login"]')).click();
    expect(ptor.getCurrentUrl()).toMatch(/\/login/);
    expect(ptor.findElement(protractor.By.tagName('form')).getAttribute('id'))
      .toMatch('login');
  });

  it('check the register page is accasible from the homepage and has a form', function() {
    element(by.css('a[href="/register"]')).click();
    expect(ptor.getCurrentUrl()).toMatch(/\/register/);
    expect(ptor.findElement(protractor.By.tagName('form')).getAttribute('id'))
      .toMatch('registration');
  });

});
