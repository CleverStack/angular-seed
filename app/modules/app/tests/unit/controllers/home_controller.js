define( [ 'angular', 'angular-mocks' ], function( ng ) {
  'use strict';

  describe( 'Controller: HomeController', function() {

    // load the controller's module
    beforeEach(ng.mock.module( 'app' ));

    var HomeCtrl
      , scope;

    // Initialize the controller and a mock scope
    beforeEach(ng.mock.inject( function( $controller, $rootScope ) {
      scope = $rootScope.$new();
      HomeCtrl = $controller( 'HomeController', {
        $scope: scope
      });
    }));

    it( 'should display a welcome message', function() {
      scope.welcome.should.equal( 'Welcome to the CleverStack AngularJS Front-end!' );
    });
  });

});
