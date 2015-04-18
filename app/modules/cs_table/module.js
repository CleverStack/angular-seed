define(['angular'], function(ng) {
  'use strict';

  ng.module('cs_table.providers', []);
  ng.module('cs_table.controllers', []);
  ng.module('cs_table.services', []);
  ng.module('cs_table.directives', []);
  ng.module('cs_table.filters', []);

  var module = ng.module('cs_table', [
    'ngSanitize',
    'ui',
    'ui.bootstrap',
    'ngTable',
    'ngTableResizableColumns',
    'cs_table.providers',
    'cs_table.controllers',
    'cs_table.services',
    'cs_table.directives',
    'cs_table.filters'
  ]);

  return module;
});
