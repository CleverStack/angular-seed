require.config({
  baseUrl: '/modules/cs_common',
  paths: {
    angular: '/components/angular-unstable/angular',
    async: '/components/async/lib/async',
    jquery: '/components/jquery/jquery',
    underscore: '/components/underscore/underscore',
    ngResource: '/components/angular-resource-unstable/angular-resource',
    'http-auth-interceptor': '/components/angular-http-auth/src/http-auth-interceptor'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    ngResource: {
      deps: ['angular']
    },
    'http-auth-interceptor': {
      deps: ['angular']
    }
  }
});

define([
  'angular',
  'ngResource',

  './module',
  './config',

  // Controllers
  'controllers/cs_home',

  // Providers
  'providers/cs_template',
  'providers/cs_http_options',

  'http-auth-interceptor'
]);
