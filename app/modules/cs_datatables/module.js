define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_datatables.directives', []);
  ng.module('cs_datatables.services', []);

  var module = ng.module('cs_datatables', [
    'cs_common',
    'cs_datatables.directives',
    'cs_datatables.services'
  ]);

  return module;
});
