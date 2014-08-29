define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * Angular v1.1.5 still doesn't support ngBlur so we build our own
   */
  ng
    .module( 'cs_common.directives' )
    .directive( 'ngBlur', [
      '$parse',
      function( $parse ) {
        return function( scope, element, attr ) {
          var fn = $parse( attr.ngBlur );
          element.bind( 'blur', function( event ) {
            scope.$apply( function() {
              fn( scope, { $event: event} );
            });
          });
        };
      }

    ]
  );

});
