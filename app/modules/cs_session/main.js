require.config({
  baseUrl: window.__karma__ ? '/base/app/modules/cs_session' : 'modules/cs_session',
  packages: [
    {
      name: 'cs_common',
      location: '../cs_common'
    }
  ],
  paths: {
    underscore: '../../components/underscore/underscore'
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
  'scripts/cs_login_controller',
  'scripts/cs_logout_controller',

  // Providers
  'scripts/cs_session_provider',
  'scripts/cs_session_helpers_provider',

  // Services
  'scripts/cs_session_service'
]);
