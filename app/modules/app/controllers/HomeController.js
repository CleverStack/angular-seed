define( [ 'angular', 'app' ], function( ng ) {
  'use strict';

  ng
  .module( 'app.controllers' )
  .controller( 'HomeController', function( $scope, Helpers ) {
    $scope.welcome = 'Welcome to the CleverStack AngularJS Front-end!';
    $scope.helpers = Helpers;
  });

});
