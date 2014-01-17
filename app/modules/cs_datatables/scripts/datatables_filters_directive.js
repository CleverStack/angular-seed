define(['angular', 'underscore', '../module'], function (angular, _) {
  'use strict';

  angular
    .module('cs_datatables.directives')
    .directive('datatableFilters',
    [
      '$compile',
      '$log',
      function($compile, $log){
        var globalFilterWrapper;

        return {
          controller: function($scope){
            this.resetFilters = $scope.resetFilters = function(){
              $scope.$broadcast('dataTable:resetFilters');
              globalFilterWrapper.find('input').val('').keyup();
            };
          },
          require: 'datatable',
          link: function ($scope) {
            $scope.search = {};

            function renderFilters(event, oSettings){
              $scope.oSettings = oSettings;
              angular.forEach($scope.oSettings.aoColumns, function(aoColumn, key){
                aoColumn.index = key;
              });

              var tpl = '<tr role="row">' +
                          '<td ng-repeat="col in oSettings.aoColumns" rowspan="1" colspan="1" ng-show="col.bVisible !== false">' +
                            '<span datatable-text-filter col="col" settings="oSettings" ng-if="col.filterControl === \'text\'"></span>' +
                            '<span datatable-date-filter col="col" settings="oSettings" ng-if="col.filterControl === \'date\'"></span>' +
                            '<span datatable-select-filter col="col" settings="oSettings" ng-if="col.filterControl === \'select\'"></span>' +
                            '<span datatable-range-filter col="col" settings="oSettings" ng-if="col.filterControl === \'range\'"></span>' +
                            '<span datatable-global-filter col="col" settings="oSettings" ng-if="col.filterControl === \'global\'"></span>' +
                          '</td>' +
                        '</tr>';

              var html = $compile(tpl)($scope);
              angular.element(oSettings.nTHead).append(html);

              appendResetFiltersButton(oSettings);
            }

            function appendResetFiltersButton(oSettings){
              globalFilterWrapper = angular.element(oSettings.nTableWrapper).find('.dataTables_filter');
              var tpl = '<button type="button" class="btn btn-link btn-sm" ng-click="resetFilters()" data-toggle="tooltip" title="Reset Filters"><i class="fa fa-lg fa-times-circle"></i></button>';
              globalFilterWrapper.prepend($compile(tpl)($scope));
            }

            var once = _.once(renderFilters);
            $scope.$on('dataTable:renderFilters', once);
            $scope.$on('dataTable:reloadFilters', renderFilters);

          }
        };
      }
    ]
  );

});
