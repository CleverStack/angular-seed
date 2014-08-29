// test if the signIn is working against a running back-end
describe('e2e: signIn', function() {

  var ptor;
  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get( '/signIn?redirect=users' );
  });

  it('should signIn with the default user account', function() {
    var username = element( by.model( 'credentials.username' ) );
    var password = element( by.model( 'credentials.password' ) );

    username.sendKeys( 'user1234@email.com' );
    password.sendKeys( '1234' );
    ptor.findElement( protractor.By.css( 'button[type="submit"]' ) ).click();

    expect( ptor.findElement( protractor.By.tagName('h1') ).getText() )
      .toEqual( 'Users' );

  });

});
