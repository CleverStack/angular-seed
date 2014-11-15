define( [ 'angular', 'underscore', 'selectn', '../module' ], function( ng, _, selectn ) {
  'use strict';

  ng
  .module( 'cs_common.controllers' )
  .controller( 'CleverTableController', function( $scope, $element, $attrs, $rootScope, $injector, $log, $filter, ngTableParams, Template ) {
    var NgTableParams = ngTableParams;

    $scope.service      = $injector.has( $attrs.service ) ? $injector.get( $attrs.service ) : false;
    if ( !$scope.service ) {
      throw 'You didn\'t provide a service to use with this clever-table';
    }

    $scope.data         = [];
    $scope.filters      = {};
    $scope.messenger    = $injector.has( 'Messenger' ) ? $injector.get( 'Messenger' ) : $log;
    $scope.columnTitles = '';
    $scope.hasFilters   = false;
    $scope.rowTemplate      = $scope.rowTemplate !== undefined ? $scope.rowTemplate : Template.view( 'cs_common', 'tableRow' );
    $scope.showClearFilters = $scope.showClearFilters !== undefined ? $scope.showClearFilters : true;
    $scope.showClearSorting = $scope.showClearSorting !== undefined ? $scope.showClearSorting : true;

    $scope.columns.forEach( function( column ) {
      $scope.columnTitles += column.title ? column.title : column.name;
      $scope.columnTitles += ',';
      $scope.filters[ column.name ] = '';
      if ( !!column.filter ) {
        $scope.hasFilters = true;
      }
    });
    $scope.columnTitles.substr( 0, $scope.columnTitles.length - 1 );

    $scope.defaultSorting = $scope.defaultSorting || { id: 'asc' };
    $scope.sorting      = $scope.defaultSorting;
    $scope.page         = $scope.page || 1;
    $scope.count        = $scope.count || 10;

    $scope.filterClass = function( column ) {
      if ( $scope.tableParams.isSortBy( column, 'asc' ) ) {
        return 'sort-asc';
      } else if ( $scope.tableParams.isSortBy( column, 'desc' ) ) {
        return 'sort-desc';
      }
      return '';
    };

    $scope.setSorting = function( column ) {
      var sort = {};
      sort[ column ] = $scope.tableParams.isSortBy(column, 'asc') ? 'desc' : 'asc';
      $scope.tableParams.sorting( sort );
    };

    $scope.resetFilters = function() {
      $scope.filters = {};
      $scope.tableParams.filter($scope.filters);
    };

    $scope.outputRow = function( row, columnName ) {
      return selectn( columnName, row );
    };

    $scope.selectFilter = function( column ) {
      var values = [];
      $scope.data.forEach( function( row ) {
        values.push( { id: selectn( column.name, row ), title: selectn( column.name, row ) } );
      });
      return values;
    };

    $scope.$on( 'reload', function() {
      $scope.tableParams.reload();
    });

    $rootScope.$on( 'table:reload', function() {
      $scope.tableParams.reload();
    });

    $scope.filters = {};

    // Directive tableParams
    $scope._params       = {
      page:     $scope.page,
      count:    $scope.count,
      sorting:  $scope.sorting,
      filter:   $scope.filters
    };

    $scope.tableParams = new NgTableParams(
      $scope._params,
      {
        // debugMode: true,
        data: $scope.data,
        getData: function( $defer, params ) {

          $scope.service
          .list( $scope.getDataOptions ? $scope.getDataOptions() : _.extend( { /* _page: params.page(), _pageSize: params.count(), _sorting: params.sorting()*/ } /*, params.filter() */ ) )
          .then( function( data ) {
            if ( params.sorting() ) {
              data = $filter( 'orderBy' )( data, params.orderBy() );
            }

            if ( Object.keys( params.filter() ).length ) {
              var _filters = {};

              Object.keys( params.filter() ).forEach( function( filterName ) {
                if ( params.filter()[ filterName ] !== undefined && params.filter()[ filterName ] !== '' ) {
                  var fil = selectn( filterName, _filters );
                  fil = selectn( filterName, params.filter() );
                }
              });

              if ( Object.keys( _filters ).length ) {
                data = _.where( data, _filters );
              }
            }

            params.total( data.length );

            data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $scope.data = data;

            $defer.resolve( data );
          }, function( err ) {
              throw err;
            })
          .catch( function( err ) {
            $defer.reject( err );
            $scope.messenger.error( ' ' + err.message ? err.message : err );
          });
        }
      }
    );
  });
});
