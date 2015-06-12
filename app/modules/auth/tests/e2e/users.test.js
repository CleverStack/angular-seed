describe('e2e: users', function() {

  var ptor, appMsg;

  beforeEach(function() {
    browser.get('/settings/users');
    ptor = protractor.getInstance();
    appMsg = element(by.css('#app_message'));

    browser.driver.sleep(1000);
  })

  it('Displays the users list', function() {
    expect(element(by.css('h4')).getText()).toEqual('User List\nThis page lists all of the Users available in your account, you can add as many as you want');

    expect(element(by.css('.content .ng-table .col-id')).getText()).toEqual('1');
    expect(element(by.css('.content .ng-table .col-firstName')).getText()).toEqual('Clever');
    expect(element(by.css('.content .ng-table .col-lastName')).getText()).toEqual('User');
    expect(element(by.css('.content .ng-table .col-email')).getText()).toEqual('default@cleverstack.io');

    element(by.css('.content .ng-table #edit-user')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
    });
  });

  it('Can view "My Account" modal by clicking on the navbar button', function() {
    link = element(by.css('.navbar-right .btn-group a:nth-child(3)'));
    link.click();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);

      expect(element(by.id('firstName')).getAttribute('value')).toEqual('Clever');
      expect(element(by.id('lastName')).getAttribute('value')).toEqual('User');
      expect(element(by.id('email')).getAttribute('value')).toEqual('default@cleverstack.io');

      element(by.css('.modal .btn-cancel')).click();
    });
  });

  it('Edit modal will revert changes if cancel is pressed', function() {
    var editButton = element(by.css('.content .ng-table #edit-user'))
      , closeBtn   = element(by.css('.modal .btn-cancel'));

    editButton.click();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.id('firstName')).getAttribute('value')).toEqual('Clever');
    expect(element(by.id('lastName')).getAttribute('value')).toEqual('User');
    expect(element(by.id('email')).getAttribute('value')).toEqual('default@cleverstack.io');
    // expect(element(by.binding('user.RoleId')).getAttribute('value')).toEqual('-- Role --\nAdmin');

    element(by.model('user.firstName')).sendKeys('-edited');

    // Test closing the modal before saving
    closeBtn.click();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    // Make sure it has reverted it's value!
    expect(element(by.css('.content .ng-table .col-firstName')).getText()).toEqual('Clever');
  });

  it('Can edit the logged in users data', function() {
    var editButton = element(by.css('.content .ng-table #edit-user'))
      , closeBtn   = element(by.css('.modal .btn-cancel'));

    editButton.click();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.id('firstName')).getAttribute('value')).toEqual('Clever');
    expect(element(by.id('lastName')).getAttribute('value')).toEqual('User');
    expect(element(by.id('email')).getAttribute('value')).toEqual('default@cleverstack.io');
    // expect(element(by.binding('user.RoleId')).getAttribute('value')).toEqual('-- Role --\nAdmin');

    element(by.model('user.firstName')).sendKeys('-edited');

    element(by.css('button[type="submit"]')).click();

    browser.driver.sleep(1000);
    browser.waitForAngular();

    // Make sure it has saved
    expect(element(by.css('.content .ng-table .col-firstName')).getText()).toEqual('Clever-edited');

    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
      //@TODO - it could be displaying an error?
    });
  });
});
