var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /^\/base\/test\/(.*)\.js$/.test(file) && !/main\.js$/.test(file);
});

var deps = [
    // Init
    'app',

    // Controllers
    'controllers/home',
    'controllers/login',
    'controllers/users',

    // Directives
    'directives/string-to-number',

    // Filters
    'filters/starts-with',

    // Services
    'services/debug',
    'services/http-options',
    'services/auth',
    'services/user',
    'services/templates',
    'services/browser-detect',
    'services/resource-factory',

    // Mocks
    '../../test/mocks/services/user',

    // Config
    '../../test/e2e/config',
    'routes'
  ];

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
  },
  deps: tests,
});

deps = ['angular', 'chai'].concat(deps);

require(deps, function (angular, chai) {
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
