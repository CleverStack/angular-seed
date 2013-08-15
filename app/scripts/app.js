define(['angular', 'ngResource', 'http-auth-interceptor']
  ,function (angular) {

    'use strict';

    var services = angular.module('app.services',
      [ 'ngResource',
        'http-auth-interceptor'
      ]);

    var directives = angular.module('app.directives',
      [ 
      ]);

    var filters = angular.module('app.filters',
      [
      ]);

    var resources = angular.module('app.resources',
      [
      ]);

    var app = angular.module('app',
      [ 'app.services',
        'app.directives',
        'app.filters',
        'app.resources'
      ]);

    return app;
});