define(['angular', 'underscore', 'moment', '../module'],function (ng, _, moment) {
  'use strict';

  ng.module('cs_datatables.services')
    .factory('DataTableHelpers',
    [
      '$compile',
      '$http',
      '$q',
      function($compile, $http, $q){
        var helpers = {};

        /*
         * Function: fnGetColumnData
         * Purpose:  Return an array of table values from a particular column.
         * Returns:  array string: 1d data array
         * Params:   object:oSettings - dataTable settings object. This is always the last argument past to the function
         *           string:mData - the mData property value of the aoColumn object
         *           bool:bUnique - optional - if set to false duplicated values are not filtered out
         *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
         *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
         * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
         */
        helpers.getColumnData = function(oSettings, mData, bUnique, bFiltered, bIgnoreEmpty){
          if (typeof mData === 'undefined') { // check that we have a column id
            return [];
          }

          if (typeof bUnique === 'undefined') { // by default we only want unique data
            bUnique = true;
          }

          if (typeof bFiltered === 'undefined') { // by default we do want to only look at filtered data
            bFiltered = true;
          }

          if (typeof bIgnoreEmpty === 'undefined') { // by default we do not want to include empty values
            bIgnoreEmpty = true;
          }

          var aiRows; // list of rows which we're going to loop through

          // use only filtered rows OR use all rows
          aiRows = bFiltered === true ? oSettings.aiDisplay : oSettings.aiDisplayMaster;

          // set up data array
          var asResultData = [],
              len = aiRows.length,
              iRow,
              aData,
              sValue;

          for (var i = 0, c = len; i < c; i++) {
            iRow = aiRows[i];
            aData = oSettings.oInstance.fnGetData(iRow);
            sValue = aData[mData];

            if (bIgnoreEmpty === true && (!sValue ||sValue.length === 0) ) { // ignore empty values?
              continue;
            }

            else if ( bUnique === true && _(asResultData).contains(sValue) ) { // ignore unique values?
              continue;
            }

            else { // else push the value onto the result data array
              asResultData.push(sValue);
            }
          }

          return asResultData;
        };

        helpers.getUniqueDateValues = function(datesList){
          return _.chain(datesList)
            .sortBy(function(stringDate){
              return moment(stringDate).unix();
            })
            .map(function(stringDate){
              return moment(stringDate).format('YYYY-MM-DD');
            })
            .uniq().value();

        };

        helpers.bindTemplate = function(nTd, sData, oData, $scope, tpl, tplUrl){
          if(tplUrl){
            tpl = $http.get(tplUrl);
          }

          $q.when(tpl)
            .then(function(response){
              tpl = response.data ? response.data : response;
              var scope = $scope.$new();
              scope.oData = oData;
              scope.sData = sData;
              var html = $compile(tpl)(scope);
              ng.element(nTd).html(html);
              $scope.$on('$destroy', function(){scope.$destroy();});
            });
        };


        return helpers;

      }
    ]
  );
});
