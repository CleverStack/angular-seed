module("ngSeed:Auth",{
  setup : function(){
    S.open('test-index.html');
  },
  teardown : function(){

  }
});

test("Navigation", function () {
  S("ul.nav").visible(function () {
    ok( S("ul.nav"), "Nav bar is here");
  });
});

test("Login Tests", function () {
  S('ul.nav').visible(function () {
    // Click on the users link
    S("a[href='/login']").click(function () {

      S('.container').visible(function(){
        // Check if the login form exists
        // And type username and password
        S("input#username").exists()
        .click()
        .type('admin');

        S("input#password").exists()
        .click()
        .type('1234');

        // Click to login
        S("button[type=submit]").exists().click();
        S.wait(2000, function() {
          // Click on Users
          S("a[href='/users']").click();
          S.wait(100, function() {

            equal( S('h1').text(), "This is a private area.", "Access the private area");

            // Click on the logout button
            S("a[href='/logout']").click();
            S.wait(100, function() {

              // Click again in the users link
              S("a[href='/users']").click();
              S.wait(100, function() {
                ok( S('input#username'), "Login form is being displayed after logout")
              });
            });
          });
        });
      });
    });
  });
});

test("Registration Tests", function () {
  var n = Math.random()*10;
  S('.container').visible(function(){
    // Click on the users link
    S("a[href='/register']").click(function () {
      S("form#registration").visible(function () {
        ok( S("form#registration"), "Registration form is being displayed" );
        // Check if the login form exists
        // And type username and password
        S("input#username").exists()
        .click()
        .type('test'+n);

        S("input#password").exists()
        .click()
        .type('1234');

        S("input#passwordConfirmation").exists()
        .click()
        .type('1234');

        S("input#email").exists()
        .click()
        .type('test'+n+'@example.com');

        // Click to login
        S("button[type=submit]").exists()
        .click({}, function () {

          // See if the container has the text
          S('.container').visible(2000, function(){
            equal( S('h1').text(), "Hello there!", "Redirected to home page")

            S("a[href='/users']").click(function () {
              S('.container').visible(function () {
                equal (S('h1').text(), "This is a private area.", "Can access private area.");
              })
            })
          });
        });
      })
    });
  });
});