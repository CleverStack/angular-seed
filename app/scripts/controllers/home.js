'use strict';

var app = angular.module('app');

app.controller( 'HomeCtrl',
  ['$scope',
  function( $scope ) {
  
  $scope.welcome = 'Hello!';
  
}]);