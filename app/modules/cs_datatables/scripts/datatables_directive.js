define(['angular', 'underscore', 'dataTables', '../module'], function (angular, _) {
  'use strict';

  angular
    .module('cs_datatables.directives')
    .directive('datatable',
    [
      '$q',
      '$log',
      function($q, $log) {

        function styleTableControls($element) {
          var searchInput = $element.closest('.dataTables_wrapper').find('.dataTables_filter input');
          searchInput.attr('placeholder', 'Search ...');
          searchInput.addClass('form-control input-sm');

          var lengthSelect = $element.closest('.dataTables_wrapper').find('.dataTables_length select');
          lengthSelect.addClass('form-control input-sm');
        }

        function applyDefaultFiltering(oSettings) {
          var params = {}, filterMap = {}, pairs, parts;
          var defaultFilter = oSettings.oInit.defaultFilter;

          if(!defaultFilter){
            return;
          }

          pairs = defaultFilter.split('&');
          angular.forEach(pairs, function(pair){
            parts = pair.split('=');
            params[parts[0]] = parts[1];
          });


          angular.forEach(oSettings.aoColumns, function(col, iCol){
            angular.forEach(params, function(value, key){
              if(key === col.mData || key === col.virtualName){
                filterMap[iCol] = value;
              }
            });
          });

          angular.forEach(filterMap, function(value, iCol){
            // $log.log('Filtering by', typeof value, value, 'on column', iCol);
            oSettings.oInstance.fnFilter(value, iCol);
          });
        }

        return {
          require: '?datatableFilters',
          controller: function(){},
          link: function ($scope, $element, $attrs, dtFiltersCtrl) {
            var table;
            angular.element.fn.dataTableExt.afnFiltering = [];
            angular.element.fn.dataTableExt.sErrMode = 'throw';

            function appendFilters($scope, $attrs, oSettings) {
              if(_($attrs).has('datatableFilters')){
                return $scope.$broadcast('dataTable:reloadFilters', oSettings);
              }
            }


            var defaultOptions = {
              // sPaginationType: 'bs_full'
              sPaginationType: 'bs_normal',
              // bStateSave: true,
              // bScrollInfinite: true,
              // bScrollCollapse: true,
              // sScrollY: '333px',
              fnDrawCallback: function(){
                styleTableControls($element);
              },
              fnInitComplete: function(oSettings){
                applyDefaultFiltering(oSettings);
                appendFilters($scope, $attrs, oSettings);
              }
            };


            $scope.$watch($attrs.datatable, function(options){
              if(!options){
                return;
              }
              options = angular.extend({}, defaultOptions, options, {bDestroy: true});

              if(_(options).has('aaData') && !options.aaData.length){
                return;
              }

              if(angular.isFunction(options.dataProvider)){
                var promise = options.dataProvider();
                var method = angular.isFunction(promise.then) ? 'then' : '$then';
                return promise[method](function(response){
                  options.aaData = response.data ? response.data : response;
                  if(table){
                    dtFiltersCtrl && dtFiltersCtrl.resetFilters();
                    table.fnDestroy();
                    $element.empty();
                    $element.css('width', '');
                  }
                  table = $element.dataTable(options);
                });

              }

              if(table){
                dtFiltersCtrl && dtFiltersCtrl.resetFilters();
                table.fnDestroy();
              }
              table = $element.dataTable(options);
            }, true);


            $scope.$on('dataTable:reload', function(event, tableId){
              if ( !table || $element.attr('id') !== tableId) {
                return;
              }

              var settings = table.fnSettings();
              var options = settings && settings.oInit;
              if(!options){
                $log.error('Unable to retrieve table options');
                return;
              }

              if(!angular.isFunction(options.dataProvider)){
                $log.warn('Received reload event for "' + tableId + '" table but table does not have dataProvider. Aborting.');
                return;
              }

              var promise = options.dataProvider();
              var method = angular.isFunction(promise.then) ? 'then' : '$then';
              promise[method](function(response){
                table.fnClearTable();
                table.fnAddData(response.data ? response.data : response);
              });

            });

            $scope.$on('$destroy', function(){
              table && table.fnDestroy();
            });

          }
        };
      }
    ]
  );

});
