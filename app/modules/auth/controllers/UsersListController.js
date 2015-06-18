define(['angular', '../module'], function(ng) {
  'use strict';

  ng
  .module('auth.controllers')
  .controller('UsersListController', function($scope, Helpers, dateFilter) {
    $scope.helpers          = Helpers;
    $scope.welcome          = 'This page lists all of the Users available in your account, you can add as many as you want';
    $scope.actionsTemplate  = '/modules/auth/views/users/table_actions.html';
    $scope.sorting = {
      id: 'asc'
    };
    $scope.columns = [
      {
        name:       'id',
        title:      'ID',
        filter:     true,
        filterType: 'text',
        glyph:      'slack',
        sortable:   true,
        visible:    true
      },
      {
        name:       'firstName',
        title:      'First Name',
        filter:     true,
        filterType: 'text',
        glyph:      'user',
        sortable:   true,
        visible:    true,
        filterData: {}
      },
      {
        name:       'lastName',
        title:      'Last Name',
        filter:     true,
        filterType: 'text',
        glyph:      'user',
        visible:    true
      },
      {
        name:       'email',
        title:      'Email',
        filter:     true,
        filterType: 'text',
        glyph:      'envelope',
        visible:    true
      },
      {
        name:       'accessedAt',
        title:      'Last Login',
        filter:     true,
        // filterType: 'calendar',
        visible:    true,
        display:     function(val) {
          if (val) {
            return dateFilter(val, 'short');
          }
          return 'Never';
        }
      },
      {
        name:       'createdAt',
        title:      'Date Registered',
        filter:     true,
        // filterType: 'calendar',
        glyph:      'calendar',
        width:      100,
        visible:    true,
        display: function(val) {
          return dateFilter(val, 'short');
        }
      }
    ];

  });
});
