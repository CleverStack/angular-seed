define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
    .module( 'auth.filters' )
    .filter( 'lastLogin', [
      'dateFilter',
      function( dateFilter ) {
        return function( input, dateFormat ) {
          if ( input ) {
            return dateFilter( input, dateFormat || 'short' );
          }
          return 'Not Active';
        };
      }
    ]);

});
