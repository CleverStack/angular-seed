define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_currency.directives', []);
  ng.module('cs_currency.services', []);

  var module = ng.module('cs_currency', [
    'cs_common',
    'cs_currency.directives',
    'cs_currency.services'
  ]);

  return module;
});
