define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'auth.models' )
  .factory( 'AccountModel', function( ResourceFactory ) {
    return new ResourceFactory( '/account', {}, {} );
  });

});
