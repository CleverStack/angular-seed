require.config({
  packages: [
    {
      name: 'cs_common',
      location: '/modules/cs_common'
    }
  ],
  baseUrl: '/modules/cs_account',
  paths: {
    underscore: '/components/underscore/underscore'
  },
  shim: {}
});

define([
  './module',

  'cs_common',

  // Controllers
  'controllers/cs_account_create_controller',
  // 'controllers/cs_account_confirm_controller',

  // Providers
  'providers/cs_account_provider',

  // Services
  'services/cs_account_service'
]);
