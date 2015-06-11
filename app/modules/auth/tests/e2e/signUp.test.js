describe('e2e: signUp', function() {

  var ptor, submit, appMsg;

  beforeEach(function() {
    browser.get('/signUp');
    ptor = protractor.getInstance();
    submit = element(by.css('button[type="submit"]'));
    appMsg = element(by.css('#app_message'));
  });

  it('Sign-up form validation works', function() {

    // Displays the validation errors for the form and all of its field's correctly when submit is clicked
    submit.click();

    browser.driver.sleep(1);
    browser.waitForAngular();

    // Top message bar displayed with the right text?
    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
      expect(element(by.css('#app_message span')).getText()).toEqual('Fix form errors and try again.');

      // Individual error notices displayed correctly?
      expect(element(by.css('#signup :nth-child(2) .error')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#signup :nth-child(3) .error')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#signup :nth-child(4) .error')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#signup :nth-child(5) .error')).isDisplayed()).toBeTruthy();
      expect(element(by.css('#signup :nth-child(7) .error')).isDisplayed()).toBeTruthy();
    });
  });

  it('Sign-up works for users', function() {

    // Fill out the form
    element(by.model('credentials.firstname')).sendKeys('Clever');
    element(by.model('credentials.lastname')).sendKeys('User');
    element(by.model('credentials.company')).sendKeys('CleverStack');
    element(by.model('credentials.domain')).sendKeys('example.com');
    element(by.model('credentials.email')).sendKeys('default-e2e@cleverstack.io');
    element(by.model('credentials.password')).sendKeys('Clever1~');
    element(by.model('credentials.passwordConfirmation')).sendKeys('Clever1~');

    // Submit the form
    submit.click();

    browser.driver.sleep(3);
    browser.waitForAngular();

    // Did the right success message show up after signup?
    element(by.css('div[rel=success]')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);

      expect(element(by.id('confirmation-message-1')).getText()).toEqual('Almost Done!');
      expect(element(by.id('confirmation-message-2')).getText()).toEqual('You should be receiving an email shortly with instructions on how to activate your account.');
    });
  });
});
