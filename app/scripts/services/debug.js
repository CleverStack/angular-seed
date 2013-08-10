define(['angular', 'app'],function (angular) {
  'use strict';

  angular
  .module('app.services')
  .service('$debug',['$rootScope',
    function ($rootScope) {

    $rootScope.$on('$debug:msg', function (event, data) {
      console.log(arguments);
    })

  }]);
});