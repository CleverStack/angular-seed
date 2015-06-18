define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.models' )
  .factory( 'UserModel', function( ResourceFactory ) {
    return new ResourceFactory( '/auth/user', { id: '@id' }, {
      resend: {
        params: {
          Action: 'resend'
        },
        method: 'POST'
      },
      confirm: {
        params: {
          Action: 'confirm'
        },
        method: 'POST'
      }
    });
  });

});
