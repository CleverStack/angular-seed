define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.directives' )
  .directive( 'mustBeEqualTo', function() {
    var link = function( $scope, $element, $attrs, ctrl ) {

      function validate( value ) {
        ctrl.$setValidity( 'mustBeEqualTo', value === $scope.$eval( $attrs.mustBeEqualTo ) );
        return value;
      }

      $scope.$watch( $attrs.mustBeEqualTo, function( equalTo ) {
        if ( ng.isUndefined( equalTo ) ) {
          return;
        }
        $scope.equalTo = equalTo;
        return validate( $element.val() );
      });

      ctrl.$parsers.unshift( validate );

    };

    return {
      require: 'ngModel',
      link: link
    };

  });

});
