define(['angular', '../module'], function(ng) {
  ng
  .module('cs_common.directives')
  .directive('ngLoad', [ '$parse', function($parse) {
    return {
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.ngLoad);

        return function(scope, element, attr) {
          element.on('load', function(event) {
            scope.$apply(function() {
              fn(scope, {$event:event});
            });
          });
        };

      }
    };
  }]);
});
