module("Routes",{
  setup: function() {
    S.open('test-index.html');
  }
});

test("/ template",function(){
  // wait until we have some results
  S('.container').visible(function(){
    equal( S('h1').text(), "Hello there!", "Loads the template properly")
  });
});

