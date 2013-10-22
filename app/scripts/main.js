require.config({
  baseUrl: './scripts',
  paths: {
    angular: '../components/angular-unstable/angular',
    async: '../components/async/lib/async',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngResource: '../components/angular-resource-unstable/angular-resource',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    ngSanitize: '../components/angular-sanitize/angular-sanitize',
    webStorageModule: '../components/angular-webstorage/angular-webstorage'
  },
  shim: {
    angular: {
      exports: 'angular'
    },

    'http-auth-interceptor': {
      deps: ['angular']
    },

    ngResource: {
      deps: ['angular']
    },

    ngSanitize: {
      deps: ['angular']
    },

    webStorageModule: {
      deps: ['angular']
    },

    'services/digital-fingerprint': {
      deps: ['angular', 'jquery']
    }
  }
});

require([
    'angular',
    'ngResource',
    'http-auth-interceptor',
    'ngSanitize',
    'webStorageModule',

    // Init
    'app',

    // Config
    'routes',
    'config',

    // Controllers
    'controllers/home',
    'controllers/navbar',
    'controllers/login',
    'controllers/logout',
    'controllers/registration',
    'controllers/users',

    // Directives
    'directives/string-to-number',

    // Filters
    'filters/starts-with',

    // Services
    'services/debug',
    'services/http-options',
    'services/user',
    'services/templates',
    'services/browser-detect',
    'services/digital-fingerprint',
    'services/resource-factory',
    'services/auth',
  ], function (angular) {
  'use strict';

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
  });
});