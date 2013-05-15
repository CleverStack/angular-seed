'use strict';

angular.module('appgular', []).config(

function ($routeProvider, $locationProvider) {

  var views = '/views/';
  var partials = '/views/partials/';

  function view (viewName) {
    return views+viewName;
  }

  function partial (partialName) {
    return partial+partialName;
  }

  $locationProvider.html5Mode( true );

  $routeProvider
    .when('/', {
      templateUrl: view('home.html')
    })
    .otherwise({
      redirectTo: '/'
    });

  }
);
