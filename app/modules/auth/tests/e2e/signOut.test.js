describe('e2e: signOut', function() {

  var ptor;
  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
    appMsg = element(by.css('#app_message'));
  });

  it('should signOut of the default user account', function() {
    element(by.css('a[href="/signOut"]')).click();

    browser.driver.sleep(1);
    browser.waitForAngular();

    // Top message bar displayed with the right text?
    expect(appMsg.isDisplayed()).toBeTruthy();
    expect(element(by.css('#app_message span')).getText()).toEqual('You have signed out.');
  });
});
