require.config({
  baseUrl: window.__karma__ ? '/base/app/modules/cs_account' : 'modules/cs_account',
  packages: [
    {
      name: 'cs_common',
      location: '../cs_common'
    }
  ],
  paths: {
    underscore: '../../components/underscore/underscore'
  }
});

define([
  './module',

  'cs_common',

  // Controllers
  'scripts/cs_account_create_controller',
  // 'controllers/cs_account_confirm_controller',

  // Providers
  'scripts/cs_account_provider',
  'scripts/cs_account_helpers_provider',

  // Services
  'scripts/cs_account_service'
]);
