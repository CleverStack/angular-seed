require.config({
  packages: [
    {
      name: 'cs_common',
      location: '/modules/cs_common'
    }
  ],
  baseUrl: '/modules/cs_session',
  paths: {
    underscore: '/components/underscore/underscore'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

define([
  './module',

  'cs_common',

  // Controllers
  'controllers/cs_login_controller',
  'controllers/cs_logout_controller',

  // Providers
  'providers/cs_session_provider',
  'providers/cs_session_helpers_provider',

  // Services
  'services/cs_session_service'
]);
