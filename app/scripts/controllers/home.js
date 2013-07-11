var app = angular.module('app');

app.controller( 'HomeCtrl',
  ['$scope',
  function( $scope ) {

  'use strict';  
  
  $scope.welcome = 'Hello!';
  
}]);