define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'RegistrationConfirmController', [
    '$scope',
    '$auth',
    'AuthHelpers',
    '$routeParams',
    '$location',
    function ($scope, $auth, AuthHelpers, $routeParams, $location) {
      $scope.$on('$auth:registrationConfirmationSuccess', function(){
        if($auth.getCurrentUser()){
          $location.url('/dashboard');
        } else {
          $location.url('/login');
        }
        $scope.success = true;
      });

      $scope.$on('$auth:registrationConfirmationFailure', function(){
        $scope.failure = true;
      });

      $auth.confirmRegistration({accountId: $routeParams.accountId, token: $routeParams.token});

    }
  ]);
});
