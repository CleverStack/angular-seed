'use strict';

var directives = angular.module('app.directives');

directives.directive('go',
  ['$location', '$route', '$window',
  function ($location, $route, $window) {
    var dirObj = {
      restrict: 'A',      
      link: function postLink(scope, iElement, iAttrs) {
        $(iElement).click(function (e) {
          $scope.$apply( function () {
            $location.path(iAttrs.go);
          });
        });
      }
    };
    return dirObj;
  }]);