define(['angular', 'underscore', '../module'], function (ng, _) {
  'use strict';

  ng.module('cs_session.services')
  .service('CSSessionService', [
    '$http',
    '$q',
    function ($http, $q) {

      return {

        login: function (credentials) {
          return $http.post('/user/login', credentials)
            .then(function(response){
              return response.data;
            });
        },

        logout: function () {
          return $http.get('/user/logout');
        },

        getCurrentUser: function () {
          var def = $q.defer();

          $http.get('/user/current')
            .then(function (response) {
              if(_(response.data).has('id')) {
                def.resolve(response.data);
              } else {
                def.reject();
              }
            }, function (err) {
              def.reject(err);
            });

          return def.promise;
        }

      };

    }

  ]);

});
