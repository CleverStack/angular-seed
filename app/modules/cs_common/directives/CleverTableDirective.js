define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  ng
  .module( 'cs_common.directives' )
  .directive( 'cleverTable', function() {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: '/modules/cs_common/views/table.html',
      controller: 'CleverTableController'
    };
  });

});