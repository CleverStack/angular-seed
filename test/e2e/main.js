var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /^\/base\/test\/(.*)\.js$/.test(file) && !/main\.js$/.test(file);
});

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
    'angular-mocks':'../components/angular-mocks/angular-mocks',
    'angular-scenario':'../components/angular-scenario/angular-scenario'
  },
  shim: {
    app: {
        deps: [
            'angular',
            'angular-scenario',
            'ngResource',
            'http-auth-interceptor',
            'chai',
            'sinon'
        ]
    },

    'angular-mocks': {
      deps: ['angular']
    },

    'angular-scenario': {
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
            '../../test/app/services/http-options',
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
  'app',
  'angular-scenario',
  'services',
  'controllers',
  'directives',
  'filters',
  'config',
  'routes',
], function (angular, chai, app) {
  'use strict';

  window.angular = angular;
  window.chai = chai;
  window.should = chai.should();
  window.expect = chai.expect();

  angular.bootstrap(document, ['app']);

  var html = document.getElementsByTagName('html')[0];

  html.setAttribute('ng-app', 'app');
  html.dataset.ngApp = 'app';

  if (top !== window) {
      top.postMessage({
          type: 'loadamd'
      }, '*');
  }

  var baseTag = document.createElement('base');
  baseTag.setAttribute('href','/base');
  document.getElementsByTagName('head')[0].appendChild(baseTag);

  window.__karma__.start();
});
