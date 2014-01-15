require(['./config'], function (){
  'use strict';

  require([
    'angular',
    './app',
    'cs_account',
    'cs_common',
    'cs_session',
    'cs_browserdetect',
    'users',

    // Controllers
    'scripts/application_controller',
    'scripts/home_controller',

    // Providers
    'scripts/helpers_provider'

  ], function (ng){

    ng.element(document).ready(function () {
      ng.bootstrap(document, ['app']);
    });

  });

});
