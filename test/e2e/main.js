var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /^\/base\/test\/(.*)\.js$/.test(file) && !/main\.js$/.test(file);
});

require.config({
  baseUrl: '/base/app',
  paths: {
    angular: 'components/angular-unstable/angular',
    async: 'components/async/lib/async',
    jquery: 'components/jquery/jquery',
    underscore: 'components/underscore/underscore',
    ngResource: 'components/angular-resource-unstable/angular-resource',
    'http-auth-interceptor': 'components/angular-http-auth/src/http-auth-interceptor',
    chai: 'components/chai/chai',
    sinon: 'components/sinon/lib/sinon',
    'angular-mocks': 'components/angular-mocks/angular-mocks',
    funcunit: 'components/funcunit/funcunit',
  },
  shim: {
    app: {
        deps: [
            'angular',
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

    funcunit: {
      // deps: ['components/steal/steal']
      deps: ['../components/funcunit/browser/resources/json.js',
            '../components/funcunit/syn',
            '../components/funcunit/browser/core.js',
            '../components/funcunit/browser/adapters/adapters.js',
            '../components/funcunit/browser/open.js',
            '../components/funcunit/browser/actions.js', 
            '../components/funcunit/browser/getters.js',
            '../components/funcunit/browser/traversers.js',
            '../components/funcunit/browser/queue.js', 
            '../components/funcunit/browser/waits.js'
        ]
      }
  },

  deps: tests,
  
});

deps = ['angular', 'chai', 'funcunit'].concat(tests);

require(deps, function (angular, chai) {
  'use strict';

  window.angular = angular;
  window.chai = chai;
  window.should = chai.should();
  window.expect = chai.expect();

  window.__karma__.start();
});