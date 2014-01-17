define(['angular', 'underscore', 'moment', '../module'], function(angular, _, moment){
  'use strict';

  angular
    .module('cs_datatables.directives')
    .directive('bsDatepickerRangeInput',
    [
      function(){
        return {
          require: 'ngModel',
          link: function($scope, $element, $attrs, $ngModelCtrl){
            angular.element($element)
              .on('change', function(event){
                $scope.$apply(function(){
                  $ngModelCtrl.$setViewValue($element.val());
                });
              });
          }
        };

      }
    ]
  );

  angular
    .module('cs_datatables.directives')
    .directive('datatableDateFilter',
    [
      'DataTableHelpers',
      function(DataTableHelpers){

        return {
          scope: {
            col: '=col',
            settings: '=settings'
          },
          // replace: true,
          template: '<div class="input-daterange" bs-datepicker data-date-format="mm/dd/yyyy" start-date="{{min}}" end-date="{{max}}" week-start="1">'+
                      '<div class="input-group">'+
                        '<input type="text" bs-datepicker-range-input class="form-control input-sm" '+
                          'name="start" ng-model="date.from" placeholder="{{min || \'Date from ...\'}}" min="0" max="0" style="width: 90px;" />'+
                        '<span class="input-group-addon">to</span>'+
                        '<input type="text" bs-datepicker-range-input class="form-control input-sm" '+
                          'name="end" ng-model="date.to" placeholder="{{max || \'Date to ...\'}}" min="0" max="0" style="width: 87px;" />'+
                      '</div>'+
                    '</div>',
          link: {
            pre: function($scope){
              var data = DataTableHelpers.getColumnData($scope.settings, $scope.col.mData, true, false, true);
              var uniqueDateValues = DataTableHelpers.getUniqueDateValues(data);
              $scope.min = moment(_(uniqueDateValues).first(), 'YYYY-MM-DD').format('MM/DD/YYYY');
              $scope.max = moment(_(uniqueDateValues).last(), 'YYYY-MM-DD').format('MM/DD/YYYY');
            },
            post: function ($scope) {
              var from, to, momentFrom, momentTo, momentCell;
              $scope.date = {};

              function filterFactory(iCol){
                return function(oSettings, aData){
                  momentCell = aData[iCol] && moment(aData[iCol]);
                  momentFrom = from && moment(from, 'MM/DD/YYYY');
                  momentTo = to && moment(to, 'MM/DD/YYYY');

                  if(!momentCell){
                    return false;
                  }

                  if ( _(momentFrom).isEmpty() && _(momentTo).isEmpty() ){
                    return true;
                  }
                  else if ( _(momentFrom).isEmpty() && (momentCell.isBefore(momentTo) || momentCell.isSame(momentTo, 'day')) ){
                    return true;
                  }
                  else if ( (momentFrom.isBefore(momentCell) || momentFrom.isSame(momentCell, 'day')) && _(momentTo).isEmpty() ){
                    return true;
                  }
                  else if ( (momentFrom.isBefore(momentCell) || momentFrom.isSame(momentCell, 'day')) && (momentCell.isBefore(momentTo) || momentCell.isSame(momentTo, 'day')) ){
                    return true;
                  }
                  return false;
                };
              }

              angular.element.fn.dataTableExt.afnFiltering.push(filterFactory($scope.col.index));

              $scope.$watch('date', function(){
                from = $scope.date.from;
                to = $scope.date.to;
                $scope.settings.oInstance.fnDraw();
              }, true);

              $scope.$on('dataTable:resetFilters', function(){
                $scope.date = {};
              });

            }
          }

        };

      }
    ]
  );

});
