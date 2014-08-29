define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.directives' )
  .directive( 'loading',
    [
      '$timeout',
      function( $timeout ) {

        return {
          restrict: 'C',
          link: function( $scope, $element ) {
            var promise;

            $scope.$on( '$routeChangeStart', function() {
              promise = $timeout( function() {
                $element.show();
              }, 400);
            });

            function removeLoader() {
              $timeout.cancel( promise );
              $element.hide();
            }

            $scope.$on('SessionProvider:signInRequired', removeLoader);
            $scope.$on('$routeChangeSuccess', removeLoader);
          }
        };
      }
    ]

  );

});
