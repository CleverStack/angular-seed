define(['angular', 'underscore', '../module'], function (angular, _) {
  'use strict';

  angular
    .module('cs_datatables.directives')
    .directive('datatableRangeFilter',
    [
      'DataTableHelpers',
      function(DataTableHelpers){

        return {
          scope: {
            col: '=col',
            settings: '=settings'
          },
          // replace: true,
          template: '<div class="input-range">'+
                      '<div class="input-group">'+
                        '<input type="number" class="form-control input-sm" ng-model="range.from" '+
                          'placeholder="{{min !== undefined ? min : \'Lowest ...\'}}" min="{{min}}" max="{{max}}" style="width: 90px;" />'+
                        '<span class="input-group-addon">to</span>'+
                        '<input type="number" class="form-control input-sm" ng-model="range.to" ' +
                          'placeholder="{{max || \'Highest ...\'}}" min="{{min}}" max="{{max}}" style="width: 87px;" />'+
                      '</div>'+
                    '</div>',
          link: {
            pre: function($scope){
              var data = DataTableHelpers.getColumnData($scope.settings, $scope.col.mData, true, false, false);
              var uniqueNumbers = _.chain(data).sortBy(function(num){return num;}).uniq().value();
              $scope.min = _(uniqueNumbers).first();
              $scope.max = _(uniqueNumbers).last();
            },
            post: function ($scope) {
              var from, to;
              $scope.range = {};

              function filterFactory(iCol){
                return function(oSettings, aData){
                  var cellValue = aData[iCol] !== undefined ? parseInt(aData[iCol], 10) : undefined;

                  if ( !_(from).isNumber() && !_(to).isNumber() ){
                    return true;
                  }
                  else if ( !_(from).isNumber() && cellValue <= to ){
                    return true;
                  }
                  else if ( from <= cellValue && !_(to).isNumber() ){
                    return true;
                  }
                  else if ( from <= cellValue && cellValue <= to ){
                    return true;
                  }
                  return false;
                };
              }

              angular.element.fn.dataTableExt.afnFiltering.push(filterFactory($scope.col.index));

              $scope.$watch('range', function(){
                from = $scope.range.from;
                to = $scope.range.to;
                $scope.settings.oInstance.fnDraw();
              }, true);

              $scope.$on('dataTable:resetFilters', function(){
                $scope.range = {};
              });

            }
          }

        };

      }
    ]
  );

});
