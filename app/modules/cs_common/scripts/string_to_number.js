define(['angular', '../module'], function (ng) {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngSeed.directives:string2number
   * @description
   * Converts a string to a number. Useful in type="number" input
   * elements that bind to a stringified number model.
   */
  ng.module('cs_common.directives')
  .directive('string2number', function() {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {

        /**
         * @ngdoc method
         * @name fromField
         * @methodOf ngSeed.directives:string2number
         * @param  {Number, String} number Just the number that has been input.
         * @return {Number}        The number.
         */
        function fromField(number) {
          return Number(number);
        }

        /**
         * @ngdoc method
         * @name toField
         * @methodOf ngSeed.directives:string2number
         * @param  {Number, String} number Just the number that has been input.
         * @return {Number}        The number or 0.
         */
        function toField(text) {
          return Number(text || 0);
        }

        ngModel.$parsers.push(fromField);
        ngModel.$formatters.push(toField);
      }
    };

  });

});
