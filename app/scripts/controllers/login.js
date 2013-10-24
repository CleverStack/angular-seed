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
      $digitalFingerprint.runPrints($digitalFingerprint.grade, function()
      {
          //incude the users front fingerprint to the login credentials used to create session token
          $auth.login( $scope.sanitizeCredentials($scope.credentials) );
      });
    }

    //testing only
    $scope.fill = function () {
       $scope.credentials = { "username" : "admin", "password" : "abc123" }; //6367c48dd193d56ea7b0baad25b19455e529f5ee
    }

    //set session
    $scope.$on('$auth:loginSuccess', function (event, data) {
        console.log("LoginController:",event,data);
        console.log("LoginController: session token received.");
        webStorage.add('SESSION', data.token);
    });

    $scope.$on('$auth:loginFailure', function (event, data) {
      console.log("LoginController:",event,data);
      if(data === '403') {
        alert('Invalid username/password');
      }
    });
  }]);
});
