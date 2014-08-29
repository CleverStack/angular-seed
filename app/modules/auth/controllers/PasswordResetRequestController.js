define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'PasswordResetRequestController', function( $scope, $injector, Session, Helpers ) {
    var messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $injector.get( '$log' );

    $scope.helpers = Helpers;

    $scope.submit = function() {
      if( $scope.form && $scope.form.$invalid ){
        return;
      }
      $scope.submitted = false;
      $scope.processing = true;

      Session.requestPasswordReset( { email: $scope.email } );
    };

    $scope.$on( 'SessionProvider:requestPasswordResetSuccess', function() {
      $scope.success = true;

      messenger.success( 'You will shortly receive a confirmation email. Please follow it to reset your password.' );
    });

    $scope.$on( 'SessionProvider:requestPasswordResetFailure', function( err ) {
      $scope.processing = false;
      $scope.success = false;

      messenger.error( err || 'Unknown email address.' );
    });
  });
});
