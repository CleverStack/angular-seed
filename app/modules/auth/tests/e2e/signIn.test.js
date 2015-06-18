describe('e2e: signIn', function() {

  var ptor, appMsg, submit, username, password;
  beforeEach(function() {
    browser.get('/signIn');
    ptor = protractor.getInstance();

    appMsg = element(by.css('#app_message'));
    submit = element(by.css('button[type="submit"]'));
    username = element(by.model('credentials.username'));
    password = element(by.model('credentials.password'));
  });

  it('should not allow sign-in with a fake account', function() {
    username.sendKeys('fake@cleverstack.io');
    password.sendKeys('fake');

    submit.click();

    browser.driver.sleep(1);
    browser.waitForAngular();

    // Make sure we get error messages
    expect(appMsg.isDisplayed()).toBeTruthy();
    expect(element(by.css('#app_message span')).getText()).toEqual('Invalid login credentials.');
  });

  it('should not allow sign-in without a username', function() {
    username.sendKeys('');
    password.sendKeys('fake');

    submit.click();

    // Make sure we get error messages
    expect(appMsg.isDisplayed()).toBeTruthy();
    expect(element(by.css('#app_message span')).getText()).toEqual('Fix form errors and try again.');
  });

  it('should not allow sign-in without a password', function() {
    username.sendKeys('fake@cleverstack.io');
    password.sendKeys('');

    submit.click();

    // Make sure we get error messages
    expect(appMsg.isDisplayed()).toBeTruthy();
    expect(element(by.css('#app_message span')).getText()).toEqual('Fix form errors and try again.');
  });

  it('should allow sign-in with the default account', function() {
    username.sendKeys('default@cleverstack.io');
    password.sendKeys('clever');

    // Check to make sure we can't click submit multiple times while we are waiting
    browser.actions().doubleClick(submit).perform();

    browser.driver.sleep(1);
    browser.waitForAngular();

    expect(appMsg.isDisplayed()).toBeTruthy();
    expect(element(by.css('#app_message span')).getText()).toEqual('User default@cleverstack.io signed in.');

    // Make sure we get redirected OK
    expect(element(by.css('h1')).getText()).toEqual('Homepage');
  });
});
