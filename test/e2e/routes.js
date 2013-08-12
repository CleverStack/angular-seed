define(['angular'], function (angular) {
  'use strict';

  describe("E2E: Testing Routes", function() {

    beforeEach(function() {
      S.open("/");
    });

    it('should have a working / route', function() {
      ok( S("body *").size(), "There be elements in that there body");
    });


  });

});