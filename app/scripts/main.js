(function () {
  // body...
var deps = [
    // Init
    'app',

    // Controllers
    'controllers/home',
    'controllers/login',
    'controllers/logout',
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

    // Config
    'config',
    'routes'
  ];

require.config({
  pathUrl: '/app/scripts',
  paths: {
    angular: '../components/angular-unstable/angular',
    async: '../components/async/lib/async',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngResource: '../components/angular-resource-unstable/angular-resource',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    'app': './app',
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
  },

  deps: deps,

});

deps = ['angular', 'ngResource', 'http-auth-interceptor'].concat(deps);

require(deps, function (angular) {
  'use strict';

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
  });
});

}());
