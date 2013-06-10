'use strict';

var directives = angular.module('app.directives');

directives.directive('href',
  ['$location', '$route', '$window',
  function ($location, $route, $window) {
    var prevent = function (e) {
      e.preventDefault();
    }

    var dirObj = {
      restrict: 'A',

      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            $(iElement).bind('click', prevent);
          },
          post: function postLink (scope, iElement, iAttrs, controller) {
            $(iElement).unbind('click', prevent);
          }
        }
      },
      
      link: function postLink(scope, iElement, iAttrs) {
        var match = _.find($route.routes, function (route) {
          return route.redirectTo === iAttrs.href;
        });

        if(match.length) {
          $(iElement).click(function (event) {
            event.preventDefault();
            $location.path(iAttrs.href);
          })
        }
      }
    };
    return dirObj;
  }]);