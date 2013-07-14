'use strict';

var should = chai.should();

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('app'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    scope.awesomeThings.length.should.equal(3);
  });
});
