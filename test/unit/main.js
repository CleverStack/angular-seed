var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /^\/base\/test\/(.*)\.js$/.test(file) && !/main\.js$/.test(file);
});

var should;

require.config({
  baseUrl: '/base/app/scripts',
  paths: {
    angular: '../components/angular-unstable/angular',
    async: '../components/async/lib/async',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngResource: '../components/angular-resource-unstable/angular-resource',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    chai: '../components/chai/chai',
    sinon: '../components/sinon/lib/sinon',
    'angular-mocks':'../components/angular-mocks/angular-mocks'
  },
  shim: {
    app: {
        deps: [
            'angular',
            'angular-mocks',
            'ngResource',
            'http-auth-interceptor',
            'chai',
            'sinon'
        ]
    },

    'angular-mocks': {
      deps: ['angular']
    },

    angular: {
        exports: 'angular'
    },

    'http-auth-interceptor': {
        deps: ['angular']
    },

    ngResource: {
        deps: ['angular']
    },

    underscore: {
        exports: '_'
    },


    // Controllers
    controllers: {
        deps: [
            'controllers/home',
            'controllers/login',
            'controllers/users'
        ]
    },

    // Directives
    directives: {
        deps: [
            'directives/string-to-number'
        ]
    },

    // Filters
    filters: {
        deps: [
            // 'filters/starts-with'
        ]
    },

    // Services
    services: {
        deps: [
            'services/debug',
            'services/http-options',
            'services/auth',
            'services/user',
            // 'services/browser-detect',
            // 'services/generic'
        ]
    },
  },
  deps: tests,
});

require([
  'angular',
  'chai',
  'app'
], function (angular, chai, app) {
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
