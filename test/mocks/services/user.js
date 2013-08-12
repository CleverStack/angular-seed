define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('UserServiceMock',['$http', '$httpOptions', '$q', '$timeout'
    ,function ($http, $httpOptions, $q, $timeout) {
    
    var loggedIn = false;

    return {

      login: function (credentials) {
        var def = $q.defer();

        $timeout(function () {
          if(credentials.username === 'root'
            && credentials.password === 'root') {
            loggedIn = true;
            def.resolve({status: 200, user: credentials});
          } else {
            def.reject({status: 401, user: credentials, error: "Username or password invalid."})
          }
        });

        return def.promise;
      },

      logout: function () {
        var def = $q.defer();

        $timeout(function () {
          if(loggedIn) {
            def.resolve({});
            loggedIn = false;
          } else {
            def.reject({error: "No user logged in"});
          }
        });

        return def.promise;
      },

      getCurrentUser: function () {
        var def = $q.defer();

        $timeout(function () {
          if(loggedIn) {
            def.resolve({username: 'root', password: 'root'});
          } else {
            def.reject({error: "No user logged in"});
          }
        });

        return def.promise;
      }

    }

  }]);
});