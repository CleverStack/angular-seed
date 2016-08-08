define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('cs_currency.directives')
  .directive('currency', [
    'CurrencyService',
    function (CurrencyService) {

      /**
       * @description
       * The actual service.
       */
      return {
        restrict: 'E',
        template: '<select ng-options="currency.id as currency.name for currency in currencies"></select>',
        replace: true,
        link: function (scope, elem, attrs) {
          scope.currencies = CurrencyService.query();
        }
      };
    }
  ]);
});
