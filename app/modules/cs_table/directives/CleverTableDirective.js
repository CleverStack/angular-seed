define(['angular', '../module'], function(ng) {
  ng
  .module('cs_table.directives')
  .directive('cleverTable', function($timeout) {
    var directive = {};

    directive.scope       = true;
    directive.restrict    = 'A';
    directive.controller  = 'CleverTableController';
    directive.templateUrl = '/modules/cs_table/views/table.html';

    directive.link = function(elem, attrs, transclude) {
      $timeout(function() {
        ng.element(window).trigger('resize');
      }, 0);
    };

    return directive;
  });

});
