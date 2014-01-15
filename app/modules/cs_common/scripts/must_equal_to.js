define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_common.directives')
  .directive('mustEqualTo', function() {
    var link = function($scope, $element, $attrs, ctrl) {

      function validate(value){
        ctrl.$setValidity('mustEqualTo', value === $scope.$eval($attrs.mustEqualTo));
        return value;
      }

      $scope.$watch($attrs.mustEqualTo, function(equalTo){
        if(ng.isUndefined(equalTo)){
          return;
        }
        $scope.equalTo = equalTo;
        return validate($element.val());
      });

      ctrl.$parsers.unshift(validate);

    };

    return {
      require: 'ngModel',
      link: link
    };

  });

});
