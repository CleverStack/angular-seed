define(['angular', '../module'], function(ng) {
  'use strict';

  ng
  .module('roles.services')
  .factory('RoleService', function(RoleModel) {
    var RoleService = {

      model: RoleModel,

      data: null,

      list: function(findOptions) {
        return RoleModel.list(findOptions).$promise.then(function(roles) {
          RoleService.data = roles;
          return RoleService.data;
        });
      },

      get: function(findOptions) {
        return RoleModel.get(findOptions).$promise;
      },

      create: function(data) {
        return RoleModel.create(data).$promise;
      }
    };

    return RoleService;
  });
});
