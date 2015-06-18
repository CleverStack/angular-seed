define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.services' )
  .service( 'SessionService', function( $resource ) {

    return $resource( '/auth/:Action', {}, {
      signIn: {
        method: 'POST',
        params: {
          Action: 'signIn'
        }
      },
      signOut: {
        method: 'POST',
        params: {
          Action: 'signOut'
        }
      },
      session: {
        method: 'GET',
        params: {
          Action: 'session'
        }
      },
      requestPasswordReset: {
        method: 'POST',
        params: {
          Action: 'recover'
        },
        url: '/auth/users/:Action'
      }
    });

  });
});
