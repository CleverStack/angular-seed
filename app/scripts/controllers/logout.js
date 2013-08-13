define(['app'], function (app) {
  'use strict';

  app.controller('Logout', ['$scope','$auth', function ($scope, $auth) {
    $auth.logout();
  }]);
});