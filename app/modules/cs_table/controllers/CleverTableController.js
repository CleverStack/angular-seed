define(['angular', 'underscore', 'selectn', '../module'], function(ng, _, selectn) {

  ng
  .module('cs_table.controllers')
  .controller('CleverTableController', function($scope, $element, $attrs, $rootScope, $injector, $log, $filter, $timeout, ngTableParams, Template) {

    $scope.messenger = $injector.has('Messenger') ? $injector.get('Messenger') : $log;

    if (!$injector.has($attrs.service) || !($scope.service = $injector.get($attrs.service))) {
      var error = 'You didn\'t provide a service to use with this clever-table';
      $scope.messenger.error(error)
      throw error;
    }

    _.defaults($scope, {
      data       : [],
      page       : 1,
      count      : 10,
      filter     : {},
      sorting    : {id: 'asc'},
      hasFilters : false,

      filtersEnabled  : false,

      rowTemplate     : Template.view('cs_table', 'partials/row'),
      pagerTemplate   : Template.view('cs_table', 'partials/pager'),
      headerTemplate  : Template.view('cs_table', 'partials/header'),
      filtersTemplate : Template.view('cs_table', 'partials/filters'),
      toolbarTemplate : Template.view('cs_table', 'partials/toolbar'),

      columnTitles: '' // @todo do i still need this?
    });

    $scope.columns.forEach(function(column) {
      _.defaults(column, {
        title: column.name,
        filter: false,
        sortable: false,
        visible: true
      })
      $scope.columnTitles += column.title ? column.title : column.name;
      $scope.columnTitles += ',';
      if (!!column.filter) {
        $scope.hasFilters = true;
      }
      $scope.filter[column.name] = '';
    });

    $scope.columnTitles.substr(0, $scope.columnTitles.length - 1);

    $scope.filterClass = function(column) {
      if ($scope.tableParams.isSortBy(column, 'asc')) {
        return 'sort-asc';
      } else if ($scope.tableParams.isSortBy(column, 'desc')) {
        return 'sort-desc';
      }
      return '';
    };

    $scope.setSorting = function(column) {
      var sort = {};
      sort[ column ] = $scope.tableParams.isSortBy(column, 'asc') ? 'desc' : 'asc';
      $scope.tableParams.sorting(sort);
    };

    $scope.resetFilters = function() {
      $scope.filter = Object.keys($scope.filter).map(function(filterName) {
        $scope.filter[filterName] = '';
      });
      $scope.tableParams.filter($scope.filters);
    };

    $scope.outputRow = function(row, columnName) {
      return selectn(columnName, row);
    };

    $scope.selectFilter = function(column) {
      var values = [];
      $scope.data.forEach(function(row) {
        values.push({ id: selectn(column.name, row), title: selectn(column.name, row) });
      });
      return values;
    };

    $scope.reload = function() {
      $scope.tableParams.reload();
      $timeout(function() {
        $element.trigger('resize.rc');
      }, 0);
    };

    $scope.toggleFilters = function() {
      $scope.filtersEnabled = !$scope.filtersEnabled;
    };

    $scope.$on('reload', $scope.reload);
    $rootScope.$on('table:reload', $scope.reload);

    Object.defineProperty($scope, '_params', {
      value: {
        page    : $scope.page,
        count   : $scope.count,
        sorting : $scope.sorting,
        filter  : $scope.filter
      }
    });

    $scope.tableParams = new ngTableParams(
      $scope._params,
      {
        data      : $scope.data,
        getData   : function($defer, params) {

          // $scope.toggleFilter = function(params) {
          //   params.settings().$scope.show_filter = !params.settings().$scope.show_filter;
          // };

          $scope.service
          .list($scope.getDataOptions ? $scope.getDataOptions() : _.extend({ /* _page: params.page(), _pageSize: params.count(), _sorting: params.sorting()*/ } /*, params.filter() */))
          .then(function(data) {
            if (params.sorting()) {
              data = $filter('orderBy')(data, params.orderBy());
            }

            if (Object.keys(params.filter()).length) {
              var _filters = {};

              Object.keys(params.filter()).forEach(function(filterName) {
                if (params.filter()[ filterName ] !== undefined && params.filter()[ filterName ] !== '') {
                  var fil = selectn(filterName, _filters);
                  fil = selectn(filterName, params.filter());
                }
              });

              if (Object.keys(_filters).length) {
                data = _.where(data, _filters);
              }
            }

            params.total(data.length);

            data = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $scope.data = data;

            $defer.resolve(data);
          }, function(err) {
              throw err;
            })
          .catch(function(err) {
            $defer.reject(err);
            $scope.messenger.error(' ' + err.message ? err.message : err);
          });
        },
        debugMode : true
      }
   );
  });
});
