define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * Angular v1.1.5 still doesn't support ngFocus so we build our own
   */
  ng
    .module( 'cs_common.directives' )
    .directive( 'ngFocus', [
      '$parse',
      function( $parse ) {
        return function( scope, element, attr ) {
          var fn = $parse( attr.ngFocus );
          element.bind( 'focus', function( event ) {
            scope.$apply( function() {
              fn( scope, { $event: event } );
            });
          });
        };
      }

    ]
  );

});
