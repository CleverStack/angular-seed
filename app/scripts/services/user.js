define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserService',['$http', '$httpOptions', '$q',
    function ($http, $httpOptions, $q) {
    
    return {

      login: function (credentials) {
        var def = $q.defer();

        $http.post($httpOptions.domain+'/login', credentials,
          {withCredentials: $httpOptions.withCredentials})
        .success(function (res) {
          def.resolve(res.user);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

      logout: function () {
        var def = $q.defer();

        $http.get($httpOptions.domain+'/logout',
          {withCredentials: $httpOptions.withCredentials})
        .then(function (res) {
          def.resolve(res.user);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

      getCurrentUser: function () {
        var def = $q.defer();

        $http.get($httpOptions.domain+'/current',
          {withCredentials: $httpOptions.withCredentials})
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