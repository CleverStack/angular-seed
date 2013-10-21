define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_account.controllers', []);
  ng.module('cs_account.providers', []);
  ng.module('cs_account.controllers', []);
  ng.module('cs_account.services', []);

  var module = ng.module('cs_account', [
    'cs_common',
    'cs_account.controllers',
    'cs_account.providers',
    'cs_account.controllers',
    'cs_account.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    'CSAccountHelpersProvider',
    function ($routeProvider, CSTemplate, CSAccountHelpersProvider) {

      CSAccountHelpersProvider.extend('CSCommonHelpers');

      CSTemplate.setPath('/modules/cs_account/views');

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
