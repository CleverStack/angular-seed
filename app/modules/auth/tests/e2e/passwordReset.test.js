describe('e2e: passwordReset', function() {

  var ptor, submit, appMsg;

  beforeEach(function() {
    browser.get('/requestPasswordReset');

    ptor   = protractor.getInstance();
    submit = element(by.css('button[type="submit"]'));
    appMsg = element(by.css('#app_message'));
  });

  it('Can reset password', function() {
    // Fill out the form
    element(by.model('email')).sendKeys('default@cleverstack.io');

    // Submit the form
    submit.click();

    browser.driver.sleep(1);
    browser.waitForAngular();

    // Did the right success message show up after signup?
    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
    });
    expect(element(by.css('#app_message span')).getText()).toEqual('');
  });
});
