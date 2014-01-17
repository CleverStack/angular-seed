define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_datatables.directives')
    .directive('datatableTextFilter',
    [
      function(){

        return {
          scope: {
            col: '=col',
            settings: '=settings'
          },
          replace: true,
          template: '<input type="text" ng-model="query" class="form-control input-sm" placeholder="Filter by {{col.sTitle}} ..." />',
          link: function ($scope) {

            $scope.$watch('query', function (query) {
              if (ng.isUndefined(query)) {
                return;
              }
              $scope.settings.oInstance.fnFilter(query, $scope.col.index);
            });

            $scope.$on('dataTable:resetFilters', function() {
              $scope.query = '';
            });

          }
        };
      }
    ]
  );

});
