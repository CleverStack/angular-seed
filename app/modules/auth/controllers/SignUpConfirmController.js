define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.controllers' )
  .controller( 'SignUpConfirmController', function( $scope, Session, AuthHelpers, $routeParams ) {
      
      $scope.$on( 'SessionProvider:signUpConfirmationSuccess', function( event, data ) {
        Session.authenticate( data.user );
        $scope.success = true;
      });

      $scope.$on('SessionProvider:signUpConfirmationFailure', function(){
        $scope.failure = true;
      });

      Session.confirmSignUp( { id: $routeParams.u, token: $routeParams.t, name: $routeParams.n } );

    }
  );
});
