define(['chai', 'controllers/home'],
  function (chai) {
  'use strict';

  describe('Controller: HomeCtrl', function () {

    // load the controller's module & setup chai should and expect
    beforeEach(function () {
      should = chai.should();
      expect = chai.expect;
      angular.mock.module('app')
    });

    var HomeCtrl
      , scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      HomeCtrl = $controller('Home', {
        $scope: scope
      });
    }));

    it('should welcome visitors with a hello message', function () {
      scope.welcome.should.equal('Hello there!');
    });
  });

});
