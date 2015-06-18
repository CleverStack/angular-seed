describe('e2e: accounts', function() {

  var ptor, appMsg, addButton;

  var testAccount = {
    name: 'Test.account',
    subDomain: 'A test account created from running e2e testing'
  };

  beforeEach(function() {
    browser.get('/settings/accounts');

    ptor       = protractor.getInstance();
    appMsg     = element(by.id('app_message'));
    addButton  = element(by.id('add-account'));

    browser.driver.sleep(1000);
  });

  it('Displays page title & subDomain in the panel header', function() {
    expect(ptor.getCurrentUrl()).toMatch(/\/settings\/accounts/);
    expect(element(by.id('panel-title')).getText()).toEqual('Account List\nThis page lists all of the accounts in the system.');

    addButton.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);

      element(by.id('accounts-list')).isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
      });
    });
  });

  it('Displays validation errors in the "Account Modal" correctly', function() {
    addButton.click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      expect(element(by.css('button[type="submit"]')).isDisplayed()).toBeTruthy();

      // Click on the submit button
      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);

      // Make sure we get error messages
      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
        expect(element(by.css('#app_message span')).getText()).toEqual('Please fix the form errors highlighted red and try again.');
      });
    });
  });

  it('Able to create a new account using the "Account Modal"', function() {
    // Click on the add button and wait for the modal to open
    addButton.click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      // Fill in the form
      element(by.model('account.name')).sendKeys(testAccount.name);
      element(by.model('account.subDomain')).sendKeys(testAccount.subDomain);

      // Click on the "Roles" select2 input and click on the first result
      element(by.css('.modal .select2-search-field input')).click();
      element(by.css('.select2-results-dept-0')).click();

      // Submit the form (and wait for the modal to close)
      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);

      // Did the Messenger display an alert and was it successful
      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
        expect(element(by.css('#app_message span')).getText()).toEqual('Account ' + testAccount.name + ' successfully created.');
      });

      // Click on the id header to sort by (id: 'desc')
      element(by.css('.col-head-id')).click();
      browser.driver.sleep(500);

      // Keep a reference to the new id for future testing
      testAccount.id = element(by.css('.col-id .ng-binding')).getText();

      // Find the row and confirm its name & subDomain display
      element.all(by.css('table tbody tr')).then(function(rows) {
        rows[0].all(by.css('td')).then(function(columns) {

          // Make sure we have 4 columns
          expect(columns.length).toBe(4);

          expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testAccount.name);
          expect(element(by.css('.col-subDomain .ng-binding')).getText()).toEqual(testAccount.subDomain);
        });
      });
    });
  });

  it('Able to list accounts and see the each column and buttons as well as paging', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element.all(by.css('table tbody tr')).then(function(rows) {

      // Make sure we have 10 records displaying (cleverstack comes with default accounts)
      expect(rows.length).toBe(10);

      // Check column output
      rows[0].all(by.css('td')).then(function(columns) {

        // Make sure all four columns are there
        expect(columns.length).toBe(4);

        // Make sure the "id" and "name" columns output correctly
        expect(element(by.css('.col-id .ng-binding')).getText()).toEqual(testAccount.id);
        expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testAccount.name);
        expect(element(by.css('.col-subDomain .ng-binding')).getText()).toEqual(testAccount.subDomain);

        // Make sure the edit button is present
        columns[3].element(by.id('edit-account')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });

        // Make sure the delete button is present
        columns[3].element(by.id('delete-account')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });

        // Make sure we can see the Prev/Next paging buttons
        element(by.css('.next a')).click();
        browser.driver.sleep(1000);
        browser.waitForAngular();

        expect(element(by.css('.col-id .ng-binding')).getText()).not.toEqual(testAccount.id);
      });
    });
  });

  it('Able to use the table filters to search for records', function() {
    expect(element(by.css('.open-filters')).isDisplayed()).toBeTruthy();
    element(by.css('.open-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.disable-filters')).isDisplayed()).toBeTruthy();

    element(by.css('.col-name-filter')).sendKeys(testAccount.name);
    browser.driver.sleep(500);

    expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testAccount.name);
    expect(element(by.css('.clear-filters')).isDisplayed()).toBeTruthy();

    element(by.css('.clear-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.col-name .ng-binding')).getText()).not.toBe(testAccount.name);

    element(by.css('.disable-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.open-filters')).isDisplayed()).toBeTruthy();
  });

  it('Able to show & hide individual columns', function() {
    element(by.css('.configure-columns')).click();
  });

  it('Able to edit accounts using the "Account Modal"', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-account')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      expect(element(by.model('account.name')).getAttribute('value')).toEqual(testAccount.name);
      expect(element(by.model('account.subDomain')).getAttribute('value')).toEqual(testAccount.subDomain);

      element(by.model('account.name')).sendKeys('-edited');
      testAccount.name += '-edited';

      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);
      browser.waitForAngular();

      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Account ' + testAccount.name + ' successfully updated.');

        element(by.css('.reload-table')).click();
        browser.driver.sleep(500);

        expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testAccount.name);
      });
    });
  });

  it('Reverts changes made in the "Account Modal" when editing and cancel is clicked', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-account')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.model('account.name')).getAttribute('value')).toEqual(testAccount.name);
    expect(element(by.model('account.subDomain')).getAttribute('value')).toEqual(testAccount.subDomain);

    element(by.model('account.name')).sendKeys('-cancelled');
    element(by.css('.btn-cancel')).click();

    browser.driver.sleep(1000);

    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(false);
    });

    expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testAccount.name);
  });

  it('Does not allow editing the name of the testAccount so that it would be ambiguous/unique (duplicate)', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-account')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.model('account.name')).clear().then(function() {
        element(by.model('account.name')).sendKeys('Account.list');
        element(by.css('button[type="submit"]')).click();
        browser.driver.sleep(1000);

        // Make sure we get error messages
        expect(appMsg.isDisplayed()).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Unable to update account Account.list due to error (Error, account with that name name already exists)');
      });
    });
  });

  it('Does not delete the account if cancel is pressed in the confirmation modal', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('delete-account')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.css('.cancel-btn')).click();
      browser.driver.sleep(1000);

      expect(element(by.css('.col-id .ng-binding')).getText()).toBe(testAccount.id);
    });
  });

  it('Able to delete a account', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('delete-account')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.css('.confirm-btn')).click();
      browser.driver.sleep(1000);

      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Account successfully deleted.');

        expect(element(by.css('.col-id .ng-binding')).getText()).not.toBe(testAccount.id);
      });
    });
  });
});
