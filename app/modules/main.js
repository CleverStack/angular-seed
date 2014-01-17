require.config({
  baseUrl: 'modules',
  packages: [
    {
      name: 'app',
      location: 'application',
      main: 'main'
    },
    'cs_account',
    'cs_common',
    'cs_session',
    'cs_calendar',
    'users'
  ],
  paths: {
    angular: '../components/angular/angular',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngCookies: '../components/angular-cookies/angular-cookies',
    ngResource: '../components/angular-resource/angular-resource',
    ngRoute: '../components/angular-route/angular-route',
    ngSanitize: '../components/angular-sanitize/angular-sanitize',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    'jquery-ui': '../components/jquery-ui/ui/minified/jquery-ui.min',
    'angular-ui-calendar': '../components/angular-ui-calendar/src/calendar',
    'fullcalendar': '../components/fullcalendar/fullcalendar.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    ngCookies: {
      deps: ['angular']
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    },
    'http-auth-interceptor': {
      deps: ['angular']
    },
    underscore: {
      exports: '_'
    },
    'angular-ui-calendar': {
      deps: ['angular', 'fullcalendar', 'jquery-ui', 'jquery']
    },
    'fullcalendar': {
      deps: ['jquery']
    },
    'jquery-ui': {
      deps: ['jquery']
    }
  }
});

require([
  'angular',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',
  'angular-ui-calendar',
  'jquery',

  // Init
  'app'

  // @todo More stuff here!
  // 'cs_account',
  // 'cs_session',
  // 'users',
  // 'cs_common'
  // 'cs_calendar'

], function (angular) {
  'use strict';

  console.log('booting')

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
  });
});
