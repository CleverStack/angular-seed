describe('homepage', function() {

  var ptor;
  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('/#');
  });

  it('should load the homepage and say Hello', function() {
    expect(ptor.findElement(protractor.By.css('.container')).getText())
      .toContain('Hello');
  });

});
