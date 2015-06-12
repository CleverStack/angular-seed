describe('e2e: roles', function() {

  var ptor, appMsg, addButton;

  var testRole = {
    name: 'Test.role',
    description: 'A test role created from running e2e testing'
  };

  beforeEach(function() {
    browser.get('/settings/roles');

    ptor       = protractor.getInstance();
    appMsg     = element(by.id('app_message'));
    addButton  = element(by.id('add-role'));

    browser.driver.sleep(1000);
  });

  it('Displays page title & description in the panel header', function() {
    expect(ptor.getCurrentUrl()).toMatch(/\/settings\/roles/);
    expect(element(by.id('panel-title')).getText()).toEqual('Role List\nThis page lists all of the Roles available in your account, you can add as many as you want');

    addButton.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);

      element(by.id('roles-list')).isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
      });
    });
  });

  it('Displays validation errors in the "Role Modal" correctly', function() {
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

  it('Able to create a new role using the "Role Modal"', function() {
    // Click on the add button and wait for the modal to open
    addButton.click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      // Fill in the form
      element(by.model('role.name')).sendKeys(testRole.name);
      element(by.model('role.description')).sendKeys(testRole.description);

      // Click on the "Roles" select2 input and click on the first result
      element(by.css('.modal .select2-search-field input')).click();
      element(by.css('.select2-results-dept-0')).click();

      // Submit the form (and wait for the modal to close)
      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);

      // Did the Messenger display an alert and was it successful
      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
        expect(element(by.css('#app_message span')).getText()).toEqual('Role ' + testRole.name + ' successfully created.');
      });

      // Click on the id header to sort by (id: 'desc')
      element(by.css('.col-head-id')).click();
      browser.driver.sleep(500);

      // Keep a reference to the new id for future testing
      testRole.id = element(by.css('.col-id .ng-binding')).getText();

      // Find the row and confirm its name & description display
      element.all(by.css('table tbody tr')).then(function(rows) {
        rows[0].all(by.css('td')).then(function(columns) {

          // Make sure we have 4 columns
          expect(columns.length).toBe(4);

          expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testRole.name);
          expect(element(by.css('.col-description .ng-binding')).getText()).toEqual(testRole.description);
        });
      });
    });
  });

  it('Able to list roles and see the each column and buttons (no paging)', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element.all(by.css('table tbody tr')).then(function(rows) {

      // Make sure we have 10 records displaying (cleverstack comes with default roles)
      expect(rows.length >= 2).toBe(true);

      // Check column output
      rows[0].all(by.css('td')).then(function(columns) {

        // Make sure all four columns are there
        expect(columns.length).toBe(4);

        // Make sure the "id" and "action" columns output correctly
        expect(element(by.css('.col-id .ng-binding')).getText()).toEqual(testRole.id);
        expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testRole.name);
        expect(element(by.css('.col-description .ng-binding')).getText()).toEqual(testRole.description);

        // Make sure the edit button is present
        columns[3].element(by.id('edit-role')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });

        // Make sure the delete button is present
        columns[3].element(by.id('delete-role')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });
      });
    });
  });

  it('Able to use the table filters to search for records', function() {
    expect(element(by.css('.open-filters')).isDisplayed()).toBeTruthy();
    element(by.css('.open-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.disable-filters')).isDisplayed()).toBeTruthy();

    element(by.css('.col-name-filter')).sendKeys(testRole.name);
    browser.driver.sleep(500);

    expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testRole.name);
    expect(element(by.css('.clear-filters')).isDisplayed()).toBeTruthy();

    element(by.css('.clear-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.col-name .ng-binding')).getText()).not.toBe(testRole.name);

    element(by.css('.disable-filters')).click();
    browser.driver.sleep(500);

    expect(element(by.css('.open-filters')).isDisplayed()).toBeTruthy();
  });

  it('Able to show & hide individual columns', function() {
    element(by.css('.configure-columns')).click();
  });

  it('Able to edit roles using the "Role Modal"', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-role')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      expect(element(by.model('role.name')).getAttribute('value')).toEqual(testRole.name);
      expect(element(by.model('role.description')).getAttribute('value')).toEqual(testRole.description);

      element(by.model('role.name')).sendKeys('-edited');
      testRole.name += '-edited';

      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);
      browser.waitForAngular();

      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Role ' + testRole.name + ' successfully updated.');

        element(by.css('.reload-table')).click();
        browser.driver.sleep(500);

        expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testRole.name);
      });
    });
  });

  it('Reverts changes made in the "Role Modal" when editing and cancel is clicked', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-role')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.model('role.name')).getAttribute('value')).toEqual(testRole.name);
    expect(element(by.model('role.description')).getAttribute('value')).toEqual(testRole.description);

    element(by.model('role.name')).sendKeys('-cancelled');
    element(by.css('.btn-cancel')).click();

    browser.driver.sleep(1000);

    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(false);
    });

    expect(element(by.css('.col-name .ng-binding')).getText()).toEqual(testRole.name);
  });

  it('Does not allow editing the name of the testRole so that it would be ambiguous/unique (duplicate)', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('edit-role')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.model('role.name')).clear().then(function() {
        element(by.model('role.name')).sendKeys('Admin');
        element(by.css('button[type="submit"]')).click();
        browser.driver.sleep(1000);

        // Make sure we get error messages
        expect(appMsg.isDisplayed()).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Unable to update role Admin due to error (Role with that name already exists)');
      });
    });
  });

  it('Does not delete the role if cancel is pressed in the confirmation modal', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('delete-role')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.css('.cancel-btn')).click();
      browser.driver.sleep(1000);

      expect(element(by.css('.col-id .ng-binding')).getText()).toBe(testRole.id);
    });
  });

  it('Able to delete a role', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(500);

    element(by.id('delete-role')).click();
    browser.driver.sleep(1000);

    element(by.css('.modal')).isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();

      element(by.css('.confirm-btn')).click();
      browser.driver.sleep(1000);

      appMsg.isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBeTruthy();
        expect(element(by.css('#app_message span')).getText()).toEqual('Role successfully deleted.');

        expect(element(by.css('.col-id .ng-binding')).getText()).not.toBe(testRole.id);
      });
    });
  });

  // it('Able to resize columns', function() {
  //   //
  // });

  // it('Warns of unsaved changes before navigation takes place with an alert/confirm', function() {
  //   //
  // });

  // it('Cannot delete the accounts systemRoles (default/system) roles', function() {
  //   //
  // });
});
