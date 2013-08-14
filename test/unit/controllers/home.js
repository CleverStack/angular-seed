define(['controllers/home'], function () {
  'use strict';

  describe('Controller: HomeCtrl', function () {

    // load the controller's module
    beforeEach(angular.mock.module('app'));

    var HomeCtrl
      , scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      HomeCtrl = $controller('Home', {
        $scope: scope
      });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
      scope.welcome.should.equal('Hello there!');
    });
  });

});