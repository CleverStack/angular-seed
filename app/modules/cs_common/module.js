define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_common.providers', []);
  ng.module('cs_common.controllers', []);
  ng.module('cs_common.services', []);
  ng.module('cs_common.directives', []);
  ng.module('cs_common.filters', []);

  var module = ng.module('cs_common', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'http-auth-interceptor',
    'cs_common.providers',
    'cs_common.controllers',
    'cs_common.services',
    'cs_common.directives',
    'cs_common.filters'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      CSTemplate.setPath('/modules/cs_common/views');

      $routeProvider
        .when('/error', {
          templateUrl: CSTemplate.view('error'),
          public: true
        })
        .otherwise({
          redirectTo: '/'
        });

    }

  ]);

  return module;

});
