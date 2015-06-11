define( [ 'angular' ], function( ng ) {
  'use strict';

  ng.module( 'cs_accounts.providers', [] );
  ng.module( 'cs_accounts.controllers', [] );
  ng.module( 'cs_accounts.services', [] );
  ng.module( 'cs_accounts.filters', [] );
  ng.module( 'cs_accounts.models', [] );
  ng.module( 'cs_accounts.directives', [] );

  var module = ng.module( 'cs_accounts', [
    'cs_common',
    'cs_accounts.providers',
    'cs_accounts.filters',
    'cs_accounts.controllers',
    'cs_accounts.models',
    'cs_accounts.services'
  ]);

  module.config( function( $routeProvider, $injector, TemplateProvider, NavbarProvider ) {
    var settingsMenu;

    // Define menu structure for this module
    if ( ( settingsMenu = _.findWhere( NavbarProvider.getNavbar().right, { label: 'Settings' } ) ) !== undefined ) {
      settingsMenu.subMenu.push({
        label               : 'Accounts',
        href                : '/settings/accounts',
        class               : 'fa-institution',
        requiresSignIn      : true,
        order               : 2,
        requiresPermission  : 'Account.list'
      });
    }

    $routeProvider
      .when( '/settings/accounts', {
        templateUrl : TemplateProvider.view( 'cs_accounts', 'list' ),
        controller  : 'AccountsListController',
        public      : false
      });

  });

  return module;
});
