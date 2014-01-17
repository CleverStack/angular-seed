define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_datatables.directives')
    .directive('datatableGlobalFilter',
    [
      function(){

        return {
          scope: {
            col: '=col',
            settings: '=settings'
          },
          replace: true,
          template: '<input type="text" ng-model="query" class="form-control input-sm" placeholder="Keyword search ..." />',
          link: function ($scope) {

            $scope.$watch('query', function (query, oldQuery) {
              if (ng.equals(query, oldQuery)) {
                return;
              }
              $scope.settings.oInstance.fnFilter(query);
            });

            $scope.$on('dataTable:resetFilters', function(){
              $scope.query = '';
            });

          }
        };
      }
    ]
  );

});
