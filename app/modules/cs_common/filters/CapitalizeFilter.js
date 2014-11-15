define( [ 'angular', 'moment', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.filters' )
  .filter( 'capitalize', [
    function() {
      return function( input ) {
        return ( !!input ) ? input.replace( /([^\W_]+[^\s-]*) */g, function( txt ){ return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase(); } ) : '';
      };
    }
  ]);

});