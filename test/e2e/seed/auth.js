module("ngSeed:Auth",{
  setup : function(){
    S.open('test-index.html');
  },
  teardown : function(){

  }
});

test("Login Tests", function () {
  S('.container').visible(function(){
    // Click on the users link
    S("a[href='/users']").click();

    // Check if the login form exists
    // And type username and password
    S("input#username").exists()
    .click()
    .type('admin');

    S("input#password").exists()
    .click()
    .type('1234');

    // Click to login
    S("button[type=submit]").exists()
    .click({}, function () {

      // See if the container has the text
      S('.container').visible(function(){
        equal( S('h1').text(), "This is a private area.", "Access the private area")
      });

    });

    // Click on the logout button
    S("a[href='/logout']").click();

    // Click again in the users link
    S("a[href='/users']").click(); 

    S('.container').visible(function(){
      ok( S('input#username'), "Login form is being displayed after logout")
    });
  });
});

test("Registration Tests", function () {
  ok(true, "Dummy");
});