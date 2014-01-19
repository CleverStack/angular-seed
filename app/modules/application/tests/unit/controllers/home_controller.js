define(['angular', 'angular-mocks'], function (ng) {
  'use strict';

  describe('Controller: HomeController', function () {

    // load the controller's module
    beforeEach(ng.mock.module('app'));

    var HomeCtrl
      , scope;

    // Initialize the controller and a mock scope
    beforeEach(ng.mock.inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      HomeCtrl = $controller('HomeController', {
        $scope: scope
      });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
      scope.welcome.should.equal('Hello clever!');
    });
  });

});
