define(['app'], function (app) {
  'use strict';

  app.controller('Login', ['$scope','$auth', '$location', '$digitalFingerprint', 'webStorage', '$sanitize'
  , function ($scope, $auth, $location, $digitalFingerprint, webStorage, $sanitize) {

    //sanitize everything to protect data
    $scope.sanitizeCredentials = function(credentials) {
        return {
            "username" : $sanitize(credentials.username),
            "password" : $sanitize(credentials.password),
            "fingerprint" : $sanitize($digitalFingerprint.fingerprint.front)
        }
    }

    $scope.login = function () {
      $digitalFingerprint.runPrints(function()
      {
          //incude the users front fingerprint to the login credentials used to create session token
          $auth.login( $scope.sanitizeCredentials($scope.credentials) );
      });
    }

    //testing only
    $scope.fill = function () {
       $scope.credentials = { "username" : "admin@clevertech.biz", "password" : "abc123" }; //6367c48dd193d56ea7b0baad25b19455e529f5ee
    }

    //set session
    $scope.$on('$auth:loginSuccess', function (event, data) {
        console.log("LoginController:",event,data);
        if (data && data.token) {
          console.log("LoginController: session token received: "+data.token);
          webStorage.add('token', data.token);
          webStorage.add('fingerprint', $digitalFingerprint.fingerprint.front);
        }
    });

    $scope.$on('$auth:loginFailure', function (event, data) {
      console.log("LoginController:",event,data);
      if(data === '403') {
        alert('Invalid username/password');
      }
    });
  }]);
});
