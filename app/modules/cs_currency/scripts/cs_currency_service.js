define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('cs_currency.services')
    .factory('CurrencyService', [
    '$resource',
    function ($resource) {
      return $resource('/currency/:id/:action', {id: '@id'});
    }
  ]);
});
