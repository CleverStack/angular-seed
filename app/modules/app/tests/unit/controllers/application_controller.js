define(['angular', 'angular-mocks'], function(ng) {
  'use strict';

  describe('Controller: ApplicationController', function() {

    // load the controller's module
    beforeEach(ng.mock.module('app'));

    var ApplicationCtrl
      , scope;

    // Initialize the controller and a mock scope
    beforeEach(ng.mock.inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ApplicationCtrl = $controller('ApplicationController', {
        $scope: scope
      });
    }));

    it('should have loaded helpers and set it on the scope', function() {
      scope.helpers.should.be.an('object');
    });

    it('should have loaded the template helper and set it on the scope', function() {
      scope.tpl.should.be.an('object');
    });
  });
});
