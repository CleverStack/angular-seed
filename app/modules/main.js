require.config({
  baseUrl: 'modules',
  packages: [
    'app',
    'cs_common',
    'cs_modal',
    'cs_messenger',
    'auth',
    'roles'
  ],
  paths: {
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
    bootstrap:                '../scripts/bootstrap',
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
  waitSeconds: 15
});

require([
  'angular',
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

  // Custom modules


], function( angular ) {
  'use strict';

  angular.element( document ).ready( function() {
    angular.bootstrap( document, [ 'app' ] );
  });
});
