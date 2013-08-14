define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserService',['$http', '$q',
    function ($http, $q) {
    
    return {

      login: function (credentials) {
        var def = $q.defer();

        $http.post('/user/login', credentials)
        .success(function (res) {
          def.resolve(res);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

      logout: function () {
        var def = $q.defer();

        $http.get('/user/logout')
        .then(function (res) {
          def.resolve(res);
        });

        return def.promise;
      },

      getCurrentUser: function () {
        var def = $q.defer();

        $http.get('/user/current')
        .then(function (res) {
          def.resolve(res.data);
        }, function (err) {
          def.reject(err);
        });

        return def.promise;
      }

    }

  }]);
});
