'use strict';

var app = angular.module('app');

app.config(
  ['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  var views = 'views/';
  var partials = 'views/partials/';

  function view (viewName) {
    return views+viewName+'.html';
  }

  function partial (section, partialName) {
    var url;
    if(partialName === undefined) {
      url = partials+section;
    } else {
      url = section+'/partials/'+partialName;
    }
    url += '.html';
    return url;
  }

  $locationProvider.html5Mode( true );

  $routeProvider
    .when('/', {
      templateUrl: view('home'),
      controller: 'HomeCtrl'
    })
    .when('/error', {
      templateUrl: partial('error')
    })
    .otherwise({
      redirectTo: '/'
    });

}]);