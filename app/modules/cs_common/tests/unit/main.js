var tests = Object.keys(window.__karma__.files).filter(function (file) {
  'use strict';
  return (/^\/base\/app\/modules\/(.*)\/tests\/(.*)\.js$/).test(file) && !(/tests\/unit\/main\.js$/).test(file);
});

var should;

require(['/base/app/modules/application/config.js'], function (){
  'use strict';

  require.config({
     // baseUrl: '/base/app/scripts',
    baseUrl: '/base/app/modules/application',
    // baseUrl: '/base/app',
    paths: {
      angular: '../../components/angular-unstable/angular',
      chai: '../../components/chai/chai',
      sinon: '../../components/sinon/lib/sinon',
      'angular-mocks': '../../components/angular-mocks/angular-mocks'
    },
    shim: {
      angular: {
        exports: 'angular'
      },
      'angular-mocks': ['angular']
    },
    deps: tests
  });

  require([
    'angular',
    'chai',
    'angular-mocks',
    'sinon',
    'app',
    'cs_common',

    // Controllers
    'scripts/controllers/application_controller',
    'scripts/controllers/home_controller',

    // Providers
    'scripts/providers/helpers_provider'
  ], function (angular, chai) {

    window.angular = angular;
    window.chai = chai;
    should = chai.should();
    window.expect = chai.expect;

    angular.element(document).ready(function () {
      angular.bootstrap(document, ['app']);
      window.__karma__.start();
    });
  });

});
