define( [ 'angular', 'underscore' ], function( ng, _ ) {
  'use strict';

  ng.module( 'roles.providers', [] );
  ng.module( 'roles.controllers', [] );
  ng.module( 'roles.models', [] );
  ng.module( 'roles.services', [] );
  ng.module( 'roles.directives', [] );
  ng.module( 'roles.filters', [] );

  var module = ng.module( 'roles', [
    'cs_common',
    'cs_messenger',
    'cs_modal',
    'auth',
    'ui.bootstrap',
    'ui',
    'roles.providers',
    'roles.controllers',
    'roles.models',
    'roles.services',
    'roles.directives',
    'roles.filters'
  ]);

  module.config( function( $routeProvider, TemplateProvider, HelpersProvider, NavbarProvider ) {
    var settingsMenu;

    // Create helpers for this module
    HelpersProvider.extend( 'RoleHelpers' );

    // Define menu structure for this module
    if ( ( settingsMenu = _.findWhere( NavbarProvider.getNavbar().right, { label: 'Settings' } ) ) !== undefined ) {
      settingsMenu.subMenu.push({
        label               : 'Roles',
        href                : '/settings/roles',
        class               : 'fa-group',
        requiresSignIn      : true,
        order               : 5,
        requiresPermission  : 'Role.list'
      });

      settingsMenu.subMenu.push({
        label               : 'Permissions',
        href                : '/settings/permissions',
        class               : 'fa-legal',
        requiresSignIn      : true,
        order               :  6,
        requiresPermission  : 'Permission.list'
      });
    }

    // Define routes provided by this module
    $routeProvider
      .when( '/settings/roles', {
        templateUrl         : TemplateProvider.view( 'roles', 'role/list' ),
        controller          : 'RoleListController',
        public              : false,
        requiresPermission  : 'Role.list'
      })
      .when( '/settings/role/:id', {
        templateUrl         : TemplateProvider.view( 'roles', 'role/form' ),
        controller          : 'RoleEditController',
        public              : false,
        requiresPermission  : 'Role.edit'
      })
      .when( '/settings/permissions', {
        templateUrl         : TemplateProvider.view( 'roles', 'permission/list' ),
        controller          : 'PermissionListController',
        public              : false,
        requiresPermission  : 'Permission.list'
      })
      .when( '/settings/permission/:id', {
        templateUrl         : TemplateProvider.view( 'roles', 'permission/form' ),
        controller          : 'PermissionEditController',
        public              : false,
        requiresPermission  : 'Permission.edit'
      });
  });

  return module;
});
