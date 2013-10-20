require.config({
  packages: [
    {
      name: 'cs_account',
      location: '/modules/cs_account'
    },
    {
      name: 'cs_common',
      location: '/modules/cs_common'
    },
    {
      name: 'cs_session',
      location: '/modules/cs_session'
    },
    {
      name: 'users',
      location: '/modules/users'
    }
  ],
  baseUrl: '/modules/application',
  paths: {
    angular: '/components/angular-unstable/angular'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});
