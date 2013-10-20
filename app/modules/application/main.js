require(['./config'], function (){
  'use strict';

  require([
    'angular',
    './app',
    'cs_account',
    'cs_common',
    'cs_session',
    'users',

    // Controllers
    'scripts/controllers/application_controller',
    'scripts/controllers/home_controller',

    // Providers
    'scripts/providers/helpers_provider'

  ], function (ng){

    ng.element(document).ready(function () {
      ng.bootstrap(document, ['app']);
    });

  });

});
