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
    }
  ],
  paths: {
    jquery: '../../components/jquery/jquery',
    angular: '../../components/angular/angular',
    ngResource: '../../components/angular-resource/angular-resource',
    ngRoute: '../../components/angular-route/angular-route',
    ngSanitize: '../../components/angular-sanitize/angular-sanitize',
  },
  shim: {
    jquery: {
      exports: '$'
    },
    angular: {
      exports: 'angular'
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    }
  }
});
