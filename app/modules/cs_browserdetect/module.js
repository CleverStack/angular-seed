/**
 * @file Instantiates and configures angular modules for your module.
 */
define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_browserdetect.controllers', []);
  ng.module('cs_browserdetect.services', []);

  var module = ng.module('cs_browserdetect', [
    'cs_common',
    'cs_browserdetect.controllers',
    'cs_browserdetect.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      // Set the subfolder of your module that contains all your view templates.
      CSTemplate.setPath('/modules/cs_browserdetect/views');

      // Register any routes you need for your module.
      $routeProvider
        .when('/browserdetect', {
          templateUrl: CSTemplate.view('test'),
          controller: 'CSBrowserdetectCtrl',
          public: true
        });
    }

  ]);

  return module;
});
