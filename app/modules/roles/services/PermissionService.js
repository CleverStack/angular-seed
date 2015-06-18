define(['angular', '../module'], function(ng) {
  'use strict';

  ng
  .module('roles.services')
  .factory('PermissionService', function(PermissionModel) {
    var PermissionService = {

      model: PermissionModel,

      data: null,

      list: function(findOptions) {
        return PermissionModel.list(findOptions).$promise.then(function(permissions) {
          PermissionService.data = permissions;
          return PermissionService.data;
        });
      },

      get: function(findOptions) {
        return PermissionModel.get(findOptions).$promise;
      },

      create: function(data) {
        return PermissionModel.create(data).$promise;
      }
    };

    return PermissionService;
  });
});
