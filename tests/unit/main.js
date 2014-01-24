var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/^\/base\/app\/modules\/(.*)\/tests\/(.*)\.js$/).test(file) && !(/tests\/unit\/main\.js$/).test(file);
});

var should;

require.config({
  baseUrl: '/base/app/modules',
  packages: [
    'application',
    'cs_account',
    'cs_common',
    'cs_session',
    'users'
  ],
  paths: {
    angular: '../components/angular/angular',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngCookies: '../components/angular-cookies/angular-cookies',
    ngResource: '../components/angular-resource/angular-resource',
    ngRoute: '../components/angular-route/angular-route',
    ngSanitize: '../components/angular-sanitize/angular-sanitize',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    chai: '../components/chai/chai',
    sinon: '../components/sinon/lib/sinon',
    'angular-mocks':'../components/angular-mocks/angular-mocks'
  },
  shim: {
    'angular-mocks': {
      deps: ['angular']
    },
    angular: {
      exports: 'angular'
    },
    ngCookies: {
      deps: ['angular']
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    },
    'http-auth-interceptor': {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    }
  },
  deps: tests,
});

require([
  'angular',

  'chai',

  'ngRoute',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',

  'application',
], function (angular, chai) {
  'use strict';

  window.angular = angular;
  window.chai = chai;
  should = chai.should();
  window.expect = chai.expect;

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
    window.__karma__.start();
  });
});
