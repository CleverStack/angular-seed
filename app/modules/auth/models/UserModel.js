define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.models' )
  .factory( 'UserModel', function( ResourceFactory ) {
    return new ResourceFactory( '/auth/user', { id: '@id' }, {
      resend: {
        params: {
          action: 'resend'
        },
        method: 'POST'
      },
      confirm: {
        params: {
          action: 'confirm'
        },
        method: 'POST'
      }
    });
  });

});
