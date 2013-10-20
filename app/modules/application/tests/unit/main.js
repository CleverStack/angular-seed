var tests = Object.keys(window.__karma__.files).filter(function (file) {
  'use strict';
  return (/^\/base\/(.*)\/tests\/(.*)\.js$/).test(file) && !/main\.js$/.test(file);
});

var should;

// require(['/base/app/modules/application/config.js'], function (){
  // 'use strict';

  require.config({
    packages: [
      {
        name: 'cs_account',
        location: '/modules/cs_account'
      },
      {
        name: 'cs_common',
        location: '/modules/cs_common'
      },
      {
        name: 'cs_session',
        location: '/modules/cs_session'
      },
      {
        name: 'users',
        location: '/modules/users'
      }
    ],
  // baseUrl: '/modules/application',
  // paths: {
    // angular: '/components/angular-unstable/angular'
  // },
    baseUrl: '/base/app/modules/application',
    paths: {
      angular: '../../components/angular-unstable/angular',
      async: '../../components/async/lib/async',
      jquery: '../../components/jquery/jquery',
      underscore: '../../components/underscore/underscore',
      chai: '../../components/chai/chai',
      sinon: '../../components/sinon/lib/sinon',
      'angular-mocks':'../../components/angular-mocks/angular-mocks'
    },
    shim: {
      angular: {
        exports: 'angular'
      },
      'angular-mocks': {
        deps: ['angular']
      },

      underscore: {
        exports: '_'
      }
    },
    deps: tests
  });

  require([
    'angular',
    'chai',
    'app',
    'angular-mocks',
    'chai',
    'sinon'
  ], function (angular, chai) {

    window.angular = angular;
    window.chai = chai;
    should = chai.should();
    window.expect = chai.expect;

    angular.element(document).ready(function () {
      angular.bootstrap(document, ['app']);
      // window.__karma__.start();
    });
  });

// });
