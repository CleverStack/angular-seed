define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'SignInController', function( $rootScope, $scope, $log, $location, $injector, Session, Helpers ) {
    var messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $log;

    $scope.helpers = Helpers;
    $scope.processing = false;
    $scope.submitted = false;

    $scope.signIn = function() {
      if ( $scope.form && $scope.form.$invalid ) {
        messenger.warn( 'Fix form errors and try again.' );
        return;
      }

      if( $scope.processing ){
        return;
      }

      $scope.processing = true;

      Session.signIn( $scope.credentials );

      $scope.$on( 'SessionProvider:signInFailure', function( event, data ) {
        $scope.processing = false;
        messenger.error( data.message ? data.message : data );
      });

      $scope.$on( 'SessionProvider:signInSuccess', function( event ) {
        messenger.success( 'User <strong>' + event.currentScope.credentials.username + '</strong> signed in.' );
        $scope.processing = false;
        $location.path( '/' );
      });
    };

  });
});
