var tests = Object.keys(window.__karma__.files).filter(function (file) {
  'use strict';
  return (/^\/base\/test\/(.*)\.js$/).test(file) && !/main\.js$/.test(file);
});

var should;

// require.config({
  // baseUrl: '/base/app'
// });

  // baseUrl: '/base/app/scripts',

require(['rjs_config'], function (){
  'use strict';

  require.config({
    baseUrl: '/base/app/modules/application',
    paths: {
      async: '/components/async/lib/async',
      jquery: '/components/jquery/jquery',
      underscore: '/components/underscore/underscore',
      chai: '/components/chai/chai',
      sinon: '/components/sinon/lib/sinon',
      'angular-mocks':'../components/angular-mocks/angular-mocks'
    },
    shim: {
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

});
