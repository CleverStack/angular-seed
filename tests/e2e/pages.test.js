// test the main pages are working
describe('e2e: pages', function() {

  var ptor;
  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('check the signIn page is accasible from the homepage and has a form', function() {
    element(by.css('a[href="/signIn"]')).click();
    expect(ptor.getCurrentUrl()).toMatch(/\/signIn/);
    expect(ptor.findElement(protractor.By.tagName('form')).getAttribute('id'))
      .toMatch('signIn');
  });

  it('check the signUp page is accasible from the homepage and has a form', function() {
    element(by.css('a[href="/signUp"]')).click();
    expect(ptor.getCurrentUrl()).toMatch(/\/signUp/);
    expect(ptor.findElement(protractor.By.tagName('form')).getAttribute('id'))
      .toMatch('signup');
  });

});
