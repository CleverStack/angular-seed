define( [ 'angular', 'underscore', '../module' ], function( ng, _ ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'SignUpController', function( $rootScope, $scope, $injector, $log, Account, Helpers, Session, $location ) {
      var messenger = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $log;

      $scope.helpers = Helpers;
      $scope.credentials = {};

      $scope.processing = false;

      $scope.signUp = function() {
        if ( $scope.form && $scope.form.$invalid ) {
          messenger.warn( 'Fix form errors and try again.' );
          return;
        }

        if ( $scope.processing ) {
          return;
        }
        $scope.processing = true;

        var credentials = _( $scope.credentials ).omit( 'passwordConfirmation' );
        credentials.username = credentials.email.split( '@' )[ 0 ];

        Session.signUp( credentials );
      };

      $rootScope.$on( 'SessionProvider:signUpSuccess', function( event, user ) {
        $scope.success = true;
        Session.authenticate( user );
        $location.path( '/' );
      });

      $rootScope.$on( 'SessionProvider:signUpFailure', function( event, data ) {
        $scope.success = false;
        $scope.processing = false;
        messenger.error( data && data.message ? data.message : 'Unable to Sign Up. Please try again. (or later)' );
      });

      $scope.checkUrl = function( $event ) {
        if ( !/(https?:\/\/)/ig.test( $event.target.value ) ) {
          $event.target.value = 'http://' + $event.target.value.replace( RegExp.$1, '' );
          $scope.credentials[ $event.target.name ] = $event.target.value;
        }
      };
    }
  );
});
