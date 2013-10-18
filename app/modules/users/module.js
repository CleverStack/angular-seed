define(['angular'], function (ng) {
  'use strict';

  ng.module('users.providers', []);
  ng.module('users.controllers', []);
  ng.module('users.services', []);

  var module = ng.module('users', [
    'cs_common',
    'users.providers',
    'users.controllers',
    'users.services'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplateProvider) {

      CSTemplateProvider.setPath('/modules/users/views');

      $routeProvider
        .when('/users', {
          templateUrl: CSTemplateProvider.view('index'),
          controller: 'UsersController',
          public: false
        });

    }

  ]);

  return module;

});
