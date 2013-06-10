'use strict';

var directives = angular.module('app.directives');

directives.directive('string2number', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {

      function fromField(number) {
          return number;
      }

      function toField(text) {
          return Number(text || 0);
      }
      ngModel.$parsers.push(fromField);
      ngModel.$formatters.push(toField);
    }
  };
});