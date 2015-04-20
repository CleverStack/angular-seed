define(['angular','app'], function(ng) {
  ng
  .module('app.controllers')
  .controller('HelpController', function($scope, Helpers) {
    $scope.helpers = Helpers;
  });
});
