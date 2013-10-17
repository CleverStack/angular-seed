require.config({
  baseUrl: '/modules/cs_session',
  paths: {},
  shim: {}
});

define([
  './module',
  './config',

  // Controllers
  'controllers/cs_login',
  'controllers/cs_logout',

  // Providers
  'providers/cs_auth'
]);
