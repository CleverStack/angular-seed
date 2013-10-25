define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserService',['$http', '$q', 'webStorage'
  , function ($http, $q, webStorage) {

    return {

      register: function (credentials) {
        var def = $q.defer();

        $http.post('/user', credentials)
        .success(function (res) {
          def.resolve(res);
        }).error(function (err) {
          def.reject(err);
        });

        return def.promise;
      },

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

        var securityCreds = { fingerprint:webStorage.get('fingerprint'), token:webStorage.get('token') };
        console.log('security token = '+securityCreds.token);
        console.log(securityCreds);

        $http.post('/user/current', securityCreds)
        .then(function (res) {
          if(Object.keys(res.data).length !== 0) {
            def.resolve(res.data.user);
          } else {
            def.reject({error: "Empty object"});
          }
        }, function (err) {
          def.reject(err);
        });

        return def.promise;
      }

    }

  }]);
});
