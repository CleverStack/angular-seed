define(['angular', 'application'], function (ng) {
  'use strict';

  ng.module('app.controllers')
  .controller('NavbarCtrl', [
    '$rootScope',
    '$scope',
    'Helpers',
    'CSTemplate',
    'CSSession',
    '$location',
    '$route',
    function ($rootScope, $scope, HelpersProvider, CSTemplateProvider, CSSessionProvider, $location, $route) {

      $scope.$watch(CSSessionProvider.getCurrentUser, function (user) {
        $scope.currentUser = user || false;
      });

      //navbar menu items
      //glyphs: http://getbootstrap.com/components/#glyphicons
      $scope.navbarItems = {

        //these items appear in the navbar on the left
        "left": [
          {
            "label": "Users",
            "href": "/users",
            "glyph": "user",
            "requiresLogin": true,
            "order": 1
          }
        ],

        //these items appear on the navbar on the right
        "right": [
          {
            "label": "Login",
            "href": "/login",
            "glyph": "log-in",
            "requiresLogin": false,
            "order": 1
          },
          {
            "label": "Logout",
            "href": "/logout",
            "glyph": "log-out",
            "requiresLogin": true,
            "order": 1
          },
          {
            "label": "Register",
            "href": "/register",
            "glyph": "list-alt",
            "requiresLogin": false,
            "order": 2
          }
        ]
      };

      /* sub menu (dropdown) example

          {
            "label": "Menu Item 2",
            "href": "",
            "glyph": "list-alt",
            "requiresLogin": false,
            "order": 2,
            "subMenu": [
              {
                "label": "Sub Menu Item 1",
                "href": "",
                "glyph": "list-alt",
                "requiresLogin": false,
                "order": 1
              },
              {
                "label": "Sub Menu Item 2",
                "href": "",
                "glyph": "list-alt",
                "requiresLogin": false,
                "order": 2
              },
              {
                "label": "Sub Menu Item 3",
                "href": "",
                "glyph": "list-alt",
                "requiresLogin": false,
                "order": 3
              }
            ]
          }

      */

    }

  ]);
});
