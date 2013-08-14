define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserService',['$http', '$q',
    function ($http, $q) {
    
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

        $http.get('/user/current')
        .then(function (res) {
          if(Object.keys(res.data).length !== 0) {
            def.resolve(res.data);
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
