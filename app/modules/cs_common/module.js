define( [ 'angular' ], function( ng ) {
  'use strict';

  ng.module( 'cs_common.providers', [] );
  ng.module( 'cs_common.controllers', [] );
  ng.module( 'cs_common.services', [] );
  ng.module( 'cs_common.directives', [] );
  ng.module( 'cs_common.filters', [] );

  var module = ng.module( 'cs_common', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTable',
    'ngTableResizableColumns',
    'ui.bootstrap',
    'ui',
    'auth.directives',
    'http-auth-interceptor',
    'cs_common.providers',
    'cs_common.controllers',
    'cs_common.services',
    'cs_common.directives',
    'cs_common.filters'
  ]);

  module.config( function( $routeProvider, TemplateProvider ) {

    TemplateProvider.setPath( '/modules/:moduleName/views' );

    $routeProvider
      .when( '/error/page_not_found', {
        templateUrl: TemplateProvider.view( 'cs_common', 'page_not_found' ),
        public: true
      })
      .when( '/error', {
        templateUrl: TemplateProvider.view( 'cs_common', 'error' ),
        public: true
      })
      .otherwise({
        redirectTo: '/error/page_not_found'
      });

  });

  return module;
});
