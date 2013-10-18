require.config({
  packages: [
    {
      name: 'cs_common',
      location: '/modules/cs_common'
    }
  ],
  baseUrl: '/modules/users',
  paths: {
    angular: '/components/angular-unstable/angular'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});

define([
  'angular',
  './module',
  'cs_common',

  // Controllers
  'controllers/users_controller'

]);
