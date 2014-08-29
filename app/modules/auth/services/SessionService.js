define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.services' )
  .service( 'SessionService', function( $resource ) {

    return $resource( '/auth/:action', {}, {
      signIn: {
        method: 'POST',
        params: {
          action: 'signIn'
        }
      },
      signOut: {
        method: 'POST',
        params: {
          action: 'signOut'
        }
      },
      session: {
        method: 'GET',
        params: {
          action: 'session'
        }
      },
      requestPasswordReset: {
        method: 'POST',
        params: {
          action: 'recover'
        },
        url: '/auth/users/:action'
      }
    });

  });
});
