define( [ 'angular', 'underscore', '../module' ], function( ng, _ ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'PasswordResetSubmitController', function( $scope, $routeParams, $location, $injector, Session, Helpers ) {
    var messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' );

    $scope.helpers = Helpers;
    $scope.credentials = {
      token:  $routeParams.t,
      user:   $routeParams.u
    };

    $scope.submit = function() {
      if( $scope.form && $scope.form.$invalid ){
        return;
      }

      $scope.processing = true;
      $scope.submitted = false;

      Session.submitPasswordReset( _( $scope.credentials ).omit( 'passwordConfirmation' ) );
    };

    $scope.$on( 'SessionProvider:submitPasswordResetSuccess', function() {
      messenger.success( 'Your new password is saved. You may now sign in with your new password.' );
    });

    $scope.$on( 'SessionProvider:submitPasswordResetFailure', function() {
      $scope.processing = false;
      messenger.error( 'Unable to store new password.' );
    });

  });
});
