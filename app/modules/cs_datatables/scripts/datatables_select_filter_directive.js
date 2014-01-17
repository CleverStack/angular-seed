define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_datatables.directives')
    .directive('datatableSelectFilter',
    [
      'DataTableHelpers',
      function(DataTableHelpers){

        return {
          scope: {
            col: '=col',
            settings: '=settings'
          },
          // replace: true,
          template: '<select ng-model="search.query" class="form-control input-sm" ng-options="val for val in options" ng-if="options.length > 0"></select>',
          link: {
            pre: function ($scope) {
              $scope.options = [''].concat(DataTableHelpers.getColumnData($scope.settings, $scope.col.mData, true, false, true));
            },
            post: function($scope) {
              $scope.search = {}; // circumventing isolated scope from ngIf

              $scope.$watch('search.query', function(query, oldQuery){
                if (ng.equals(query, oldQuery)) {
                  return;
                }
                $scope.settings.oInstance.fnFilter(query, $scope.col.index);
              }, true);

              $scope.$on('dataTable:resetFilters', function(){
                $scope.search.query = '';
              });

            }
          }

        };

      }
    ]
  );

});
