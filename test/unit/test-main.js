var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /^\/base\/test\/(.*)\.js$/.test(file) && !/main\.js$/.test(file);
});

var should;

require.config({
  packages: [
    {
      name: 'cs_account',
      // location: '/modules/cs_account'
    },
    {
      name: 'cs_common',
      // location: '/modules/cs_common'
    },
    {
      name: 'cs_session',
      // location: '/modules/cs_session'
    },
    {
      name: 'users',
      // location: '/modules/users'
    }
  ],
  baseUrl: '/base/app/modules',
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
      deps:  [
        'angular',
        'application/app',
        'cs_account',
        'cs_common',
        'cs_session',
        'users',

        // Controllers
        'controllers',

        // Testing utility
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
        'application/scripts/controllers/home_controller',
        'application/scripts/controllers/application_controller'
      ]
    },

    // Directives
    directives: {
      deps: [
        // 'directives/string-to-number'
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
        // 'services/debug',
        // 'services/http-options',
        // 'services/auth',
        // 'services/user',
        // 'services/browser-detect',
        // 'services/generic'
      ]
    },

    providers: {
      deps: [
        'application/scripts/providers/helpers_provider',
      ]
    }
  },
  deps: tests,
});

require([
  'angular',
  'chai',
  'app',
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
