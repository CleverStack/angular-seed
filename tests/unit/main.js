var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/^\/base\/app\/modules\/(.*)\/tests\/(.*)\.js$/).test(file) && !(/tests\/unit\/main\.js$/).test(file);
});

var should;

require.config({
  baseUrl: '/base/app/modules',
  packages: [
    'app',
    'cs_common',
    'cs_modal',
    'cs_messenger',
    'auth',
    'roles'
  ],
  paths: {
    chai:                     '../components/chai/chai',
    sinon:                    '../components/sinon/lib/sinon',
    'angular-mocks':          '../components/angular-mocks/angular-mocks',
    angular:                  '../components/angular/angular',
    ngCookies:                '../components/angular-cookies/angular-cookies',
    ngResource:               '../components/angular-resource/angular-resource',
    ngRoute:                  '../components/angular-route/angular-route',
    ngSanitize:               '../components/angular-sanitize/angular-sanitize',
    ngTable:                  '../components/ng-table/ng-table',
    ngTableResizableColumns:  '../components/ng-table-resizable-columns/ng-table-resizable-columns.src',
    ngUi:                     '../components/angular-ui/build/angular-ui',
    ngUiBootstrap:            '../components/angular-bootstrap/ui-bootstrap-tpls',
    httpAuthInterceptor:      '../components/angular-http-auth/src/http-auth-interceptor',
    bootstrap:                '../components/bootstrap/dist/js/bootstrap',
    // bootstrap:                '../scripts/bootstrap',
    jquery:                   '../components/jquery/dist/jquery',
    jqueryMinicolors:         '../components/jquery-minicolors/jquery.minicolors',
    underscore:               '../components/underscore/underscore',
    selectn:                  '../components/selectn/selectn',
    inflection:               '../components/inflection/lib/inflection',
    select2:                  '../components/select2/select2',
    'ui.select2':             '../components/angular-ui-select2/src/select2',
    moment:                   '../components/momentjs/moment'
  },
  shim: {
    'angular-mocks': {
      deps: ['angular']
    },
    angular: {
      deps:     [ 'jquery' ],
      exports:  'angular'
    },
    ngCookies: {
      deps:     [ 'angular' ]
    },
    ngResource: {
      deps:     [ 'angular' ]
    },
    ngRoute: {
      deps:     [ 'angular' ]
    },
    ngSanitize: {
      deps:     [ 'angular' ]
    },
    ngTable: {
      deps:     [ 'angular' ],
      exports:  'ngTable'
    },
    ngTableResizableColumns: {
      deps:     [ 'angular' ],
      exports:  'ngTableResizableColumns'
    },
    ngUi: {
      deps:     [ 'angular' ]
    },
    ngUiBootstrap: {
      deps:     [ 'angular' ]
    },
    httpAuthInterceptor: {
      deps:     [ 'angular' ]
    },
    bootstrap: {
      deps:     [ 'jquery' ]
    },
    underscore: {
      exports:  '_'
    },
    selectn: {
      deps:     [ 'bootstrap' ]
    },
    inflection: {
      exports:  'inflection'
    },
    select2: {
      deps:     [ 'jquery' ]
    },
    'ui.select2': {
      deps:     [ 'angular', 'select2' ]
    },
    moment: {
      exports:  'moment'
    },
    jqueryMinicolors: {
      deps:     [ 'jquery' ]
    }
  },
  deps: tests,
});

require([
  'angular',

  'chai',

  'bootstrap',
  'ngUi',
  'ngUiBootstrap',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngTable',
  'ngTableResizableColumns',
  'httpAuthInterceptor',

  'ui.select2',
  'selectn',
  'inflection',

  // CleverStack modules
  'cs_common',
  'cs_modal',
  'cs_messenger',
  'auth',
  'roles',

  // Main app module
  'app',
], function (angular, chai) {
  'use strict';

  window.angular = angular;
  window.chai = chai;
  should = chai.should();
  window.expect = chai.expect;

  angular.element(document).ready(function () {
    angular.bootstrap( document, [ 'app' ] );
    window.__karma__.start();
  });
});
