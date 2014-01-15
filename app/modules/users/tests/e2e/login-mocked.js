var protractor = require('protractor');
require('protractor/jasminewd');

var httpBackendMock = function() {
  angular.module('httpBackendMock', ['ngMockE2E', 'app'])
    .run(function($httpBackend) {
      var authenticated = false;
      var testAccount = {
        username: 'test@example.com',
        password: '1234'
      };

      $httpBackend.whenPOST('/user/login').respond(function(method, url, data, headers) {
        return authenticated ? [200, testAccount, {}] : [401, {}, {}];
      });

    })
};

describe('login (mocked)', function() {
  var ptor = protractor.getInstance();

  beforeEach(function () {
    ptor.addMockModule('httpBackendMock', httpBackendMock);
    ptor.get('/#/login');
  });

  it('should login with the default user account', function() {
    var username = element(by.model('credentials.username')),
        password = element(by.model('credentials.password')),
        submit = ptor.findElement(protractor.By.css('button[type="submit"]'));

    username.sendKeys('admin');
    password.sendKeys('1234');
    submit.click();

    expect(ptor.findElement(protractor.By.tagName('h1')).getText())
      .toEqual('Homepage');

  });

});
