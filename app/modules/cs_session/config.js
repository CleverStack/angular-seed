define(['angular', './module'], function(ng){
  'use strict';

  ng.module('cs_session')
  .config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      $routeProvider
        .when('/login', {
          template: 'LOGIN',
          // templateUrl: CSTemplate.view('login'),
          controller: 'CSLogin',
          public: true
        })
        .when('/logout', {
          templateUrl: CSTemplate.view('login'),
          controller: 'CSLogout',
          public: true
        });
    }

  ]);

});
