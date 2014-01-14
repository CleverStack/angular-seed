/**
 * @file Instantiates and configures angular modules for your module.
 */
define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_example.controllers', []);
  ng.module('cs_example.providers', []);
  ng.module('cs_example.services', []);

  var module = ng.module('cs_example', [
    'cs_common',
    'cs_example.controllers',
    'cs_example.providers',
    'cs_example.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      // Set the subfolder of your module that contains all your view templates.
      CSTemplate.setPath('/modules/cs_example/views');

      // Register any routes you need for your module.
      $routeProvider
        .when('/example', {
          templateUrl: CSTemplate.view('example-view'),
          controller: 'CSExampleController',
          public: true
        });
    }

  ]);

  return module;
});
