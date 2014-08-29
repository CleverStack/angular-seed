define( [ 'angular', 'underscore', '../module' ], function( ng, _ ) {
  'use strict';

  ng.module( 'cs_common.directives' )
    .directive( 'focusedOn', [
      '$timeout'
      ,function( $timeout ) {
        return function( $scope, $element, $attrs ) {
          function focus() {
            $timeout( function() {
              $element.focus();
            }, 20);
          }

          if( _( $attrs.focusedOn ).isEmpty() ) {
            return focus();
          }

          $scope.$watch( $attrs.focusedOn, function( newVal ) {
            if( newVal ) {
              focus();
            }
          });

        };

      }
    ]

  );

});
