define( [ 'angular', 'jqueryMinicolors', '../module' ], function( ng ){
  'use strict';

  ng.module( 'cs_common.directives' )
    .directive( 'colorPicker',
    [
      function(){
        return {
          require: '?ngModel',
          link: function( $scope, $element, $attrs, ngModelCtrl ) {

            ngModelCtrl.$render = function() {
              $element.minicolors( 'value', ngModelCtrl.$modelValue );
            };

            $element.minicolors({
              theme:      'bootstrap',
              letterCase: 'uppercase',
              position:   'top right',
              change: function( hex ) {
                ngModelCtrl.$setViewValue( hex );
                !$scope.$$phase && $scope.$apply();
              }
            });
          }
        };
      }
    ]
  );

});
