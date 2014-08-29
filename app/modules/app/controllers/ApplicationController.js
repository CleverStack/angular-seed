define( [ 'angular', 'app' ], function( ng ) {
  'use strict';

  ng
  .module( 'app.controllers' )
  .controller( 'ApplicationController', function( $scope, Helpers, Template, Session ) {
      $scope.helpers      = Helpers;
      $scope.tpl          = Template;

      $scope.currentUser  = null;

      $scope.$watch( Session.getCurrentUser, function( user ) {
        $scope.currentUser = user || false;
      });
    }
  );

});
