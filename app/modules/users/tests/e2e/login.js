xdescribe('login', function() {

  var ptor;
  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#/login');
  });

  it('should login with the default user account', function() {
    var username = element(by.model('credentials.username'));
    var password = element(by.model('credentials.password'));

    username.sendKeys('admin');
    password.sendKeys('1234');
    ptor.findElement(protractor.By.css('button[type="submit"]')).click();

    expect(ptor.findElement(protractor.By.tagName('h1')).getText())
      .toEqual('Homepage');

  });

});
