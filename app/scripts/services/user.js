define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserService',['$http', '$httpOptions', '$q',
    function ($http, $httpOptions, $q) {
    
    return {

      login: function (credentials) {
        var def = $q.defer();

        $http.post($httpOptions.domain + '/user/login', credentials)
        .success(function (res) {
          def.resolve(res.user);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

      logout: function () {
        var def = $q.defer();

        $http.get($httpOptions.domain + '/user/logout')
        .then(function (res) {
          def.resolve(res.user);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

      getCurrentUser: function () {
        var def = $q.defer();

        $http.get($httpOptions.domain + '/user/current')
        .success(function (res) {
          def.resolve(res.user);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      }

    }

  }]);
});