describe('homepage', function() {

  var ptor = protractor.getInstance();

  it('should load the homepage and say Hello', function() {
    ptor.get('/#');
    expect(ptor.findElement(protractor.By.css('.container')).getText()).toContain('Hello');
  });

});
