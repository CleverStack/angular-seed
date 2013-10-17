define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_account.providers', []);
  ng.module('cs_account.controllers', []);
  ng.module('cs_account.services', []);

  var module = ng.module('cs_account', [
    'cs_common',
    'cs_account.providers',
    'cs_account.controllers',
    'cs_account.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      $routeProvider
        .when('/register', {
          templateUrl: CSTemplate.view('registration'),
          controller: 'CSAccountCreateController',
          public: true
        });
    }

  ]);

  return module;

});
