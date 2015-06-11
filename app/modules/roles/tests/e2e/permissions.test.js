describe('e2e: permissions', function() {

  var ptor, appMsg, addButton, editButton, delButton;

  var testPermission = {
    action: 'Test.permission',
    description: 'A test permission created from running e2e testing'
  };

  beforeEach(function() {
    browser.get('/settings/permissions');

    ptor       = protractor.getInstance();
    appMsg     = element(by.id('app_message'));
    addButton  = element(by.id('add-permission'));
    editButton = element(by.id('edit-permission'));
    delButton  = element(by.id('delete-permission'));

    browser.driver.sleep(1000);
  });

  it('Displays page title & description in the panel header', function() {
    expect(ptor.getCurrentUrl()).toMatch(/\/settings\/permissions/);
    expect(element(by.id('panel-title')).getText()).toEqual('Permission List\nViewing all Permissions available in your account, you can define your own custom ones by clicking the "Add Permission" Button.');

    addButton.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);

      element(by.id('permissions-list')).isDisplayed().then(function(isDisplaying) {
        expect(isDisplaying).toBe(true);
      });
    });
  });

  it('Displays validation errors in the "Permission Modal" correctly', function() {
    // Click on the add button and wait for the modal to open
    addButton.click();
    browser.driver.sleep(1000);

    // Click on the submit button
    element(by.css('button[type="submit"]')).click();
    browser.driver.sleep(1000);

    // Make sure we get error messages
    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
      expect(element(by.css('#app_message span')).getText()).toEqual('Please fix the form errors highlighted red and try again.');
    });
  });

  it('Able to create a new permission using the "Permission Modal"', function() {
    // Click on the add button and wait for the modal to open
    addButton.click();
    browser.driver.sleep(1000);

    // Fill in the form
    element(by.model('permission.action')).sendKeys(testPermission.action);
    element(by.model('permission.description')).sendKeys(testPermission.description);

    // Click on the "Roles" select2 input and click on the first result
    element(by.css('.modal .select2-search-field input')).click();
    element(by.css('.select2-results-dept-0')).click();

    // Submit the form (and wait for the modal to close)
    element(by.css('button[type="submit"]')).click();
    browser.driver.sleep(1000);

    // Did the Messenger display an alert and was it successful
    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(true);
      expect(element(by.css('#app_message span')).getText()).toEqual('Permission ' + testPermission.action + ' successfully created.');
    });

    // Click on the id header to sort by (id: 'desc')
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    // Keep a reference to the new id for future testing
    testPermission.id = element(by.css('.col-id .ng-binding')).getText();

    // Find the row and confirm its action & description display
    element.all(by.css('table tbody tr')).then(function(rows) {
      rows[0].all(by.css('td')).then(function(columns) {

        // Make sure we have 4 columns
        expect(columns.length).toBe(4);

        expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
        expect(element(by.css('.col-description .ng-binding')).getText()).toEqual(testPermission.description);
      });
    });
  });

  it('Able to list permissions and see the each column and buttons as well as paging', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    element.all(by.css('table tbody tr')).then(function(rows) {

      // Make sure we have 10 records displaying (cleverstack comes with default permissions)
      expect(rows.length).toBe(10);

      // Check column output
      rows[0].all(by.css('td')).then(function(columns) {

        // Make sure all four columns are there
        expect(columns.length).toBe(4);

        // Make sure the "id" and "action" columns output correctly
        expect(element(by.css('.col-id .ng-binding')).getText()).toEqual(testPermission.id);
        expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
        expect(element(by.css('.col-description .ng-binding')).getText()).toEqual(testPermission.description);

        // Make sure the edit button is present
        columns[3].element(by.id('edit-permission')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });

        // Make sure the delete button is present
        columns[3].element(by.id('delete-permission')).isDisplayed().then(function(isDisplaying) {
          expect(isDisplaying).toBe(true);
        });

        // Make sure we can see the Prev/Next paging buttons
        element(by.css('.next')).click();
        browser.driver.sleep(300);

        expect(element(by.css('.col-id .ng-binding')).getText()).not.toEqual(testPermission.id);
      });
    });
  });

  it('Able to use the table filters to search for records', function() {
    element(by.css('.open-filters')).click();
    element(by.css('.col-action-filter')).sendKeys(testPermission.action);
    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
    element(by.css('.clear-filters')).click();
    browser.driver.sleep(300);

    expect(element(by.css('.col-action .ng-binding')).getText()).not.toBe(testPermission.action);
  });

  it('Able to show & hide individual columns', function() {
    element(by.css('.configure-columns')).click();
  });

  // it('Able to resize columns', function() {
  //   //
  // });

  it('Able to edit permissions using the "Permission Modal"', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    editButton.click();
    browser.driver.sleep(1000);

    expect(element(by.model('permission.action')).getAttribute('value')).toEqual(testPermission.action);
    expect(element(by.model('permission.description')).getAttribute('value')).toEqual(testPermission.description);

    element(by.model('permission.action')).sendKeys('-edited');
    testPermission.action += '-edited';

    element(by.css('button[type="submit"]')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    element(by.css('.reload-table')).click();
    browser.driver.sleep(100);
    browser.waitForAngular();


    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBeTruthy();
      expect(element(by.css('#app_message span')).getText()).toEqual('Permission ' + testPermission.action + ' successfully updated.');

      expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
    });
  });

  it('Reverts changes made in the "Permission Modal" when editing and cancel is clicked', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    editButton.click();
    browser.driver.sleep(1000);

    expect(element(by.model('permission.action')).getAttribute('value')).toEqual(testPermission.action);
    expect(element(by.model('permission.description')).getAttribute('value')).toEqual(testPermission.description);
    browser.driver.sleep(100);

    element(by.model('permission.action')).sendKeys('-cancelled');
    element(by.css('.modal .btn-cancel')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    appMsg.isDisplayed().then(function(isDisplaying) {
      expect(isDisplaying).toBe(false);
    });

    expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
  });

  it('Does not allow editing the action of the testPermission so that it would be ambiguous/unique (duplicate)', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    editButton.click();
    browser.driver.sleep(1000);

    element(by.model('permission.action')).clear().then(function() {
      element(by.model('permission.action')).sendKeys('Account.list');
      element(by.css('button[type="submit"]')).click();
      browser.driver.sleep(1000);

      // Make sure we get error messages
      expect(appMsg.isDisplayed()).toBeTruthy();
      expect(element(by.css('#app_message span')).getText()).toEqual('Unable to update permission Account.list due to error (Error, permission with that action name already exists)');
    });
  });

  // it('Warns of unsaved changes before navigation takes place with an alert/confirm', function() {
  //   //
  // });

  // it('Cannot delete the accounts systemPermissions (default/system) permissions', function() {
  //   //
  // });

  it('Does not delete the permission if cancel is pressed in the confirmation modal', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    delButton.click();
    browser.driver.sleep(1000);

    element(by.css('.modal .btn-confirm')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.css('.col-id .ng-binding')).getText()).not.toBe(testPermission.id);
  });

  it('Able to delete a permission', function() {
    element(by.css('.col-head-id')).click();
    browser.driver.sleep(300);

    delButton.click();
    browser.driver.sleep(1000);

    element(by.css('.modal .btn-cancel')).click();
    browser.driver.sleep(1000);
    browser.waitForAngular();

    expect(element(by.css('.col-action .ng-binding')).getText()).toEqual(testPermission.action);
  });
});
