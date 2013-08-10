define(['angular','app'], function (angular, app) {
  'use strict';

  describe("E2E: Testing Routes", function() {

    beforeEach(function() {
      console.log("Inside beforeEach")
      browser().navigateTo('/base/app/index.html');
    });

    it('should have a working / route', function() {
      console.log("Inside it")
      browser().navigateTo('#/');
      browser().location().path().should.be("/");
    });

  });

});