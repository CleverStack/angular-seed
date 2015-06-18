define(['angular', '../module'], function(ng) {
  'use strict';

  ng
  .module('auth.services')
  .factory('UserService', function(UserModel) {
    var UserService = {
      model: UserModel,

      data: null,

      list: function(findOptions) {
        return UserModel.list(findOptions).$promise.then(function(users) {
          UserService.data = users;
          return UserService.data;
        });
      },

      get: function(findOptions) {
        return UserModel.get(findOptions).$promise;
      },

      create: function(data) {
        return UserModel.create(data).$promise;
      },

      confirm: function(data) {
        return UserModel.confirm(data).$promise;
      }
    };

    return UserService;
  });

});
