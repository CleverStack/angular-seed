require.config({
  baseUrl: '/modules/application',
  packages: [
    {
      name: 'cs_account',
      location: '../cs_account'
    },
    {
      name: 'cs_common',
      location: '../cs_common'
    },
    {
      name: 'cs_session',
      location: '../cs_session'
    },
    {
      name: 'users',
      location: '../users'
    },
    {
      name: 'cs_browserdetect',
      location: '../cs_browserdetect'
    }
  ],
  paths: {
    angular: '../../components/angular/angular'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});
