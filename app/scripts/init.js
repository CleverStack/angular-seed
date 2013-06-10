'use strict';

window.app = angular.module('app',
  [ 'app.directives',
    'app.services',
    'app.filters',
    'http-auth-interceptor',
    'ngResource'
  ]);

window.services = angular.module('app.services',
  [ 'http-auth-interceptor',
    'ngResource'
  ]);

window.directives = angular.module('app.directives',
  [ 'http-auth-interceptor'
  ]);

window.filters = angular.module('app.filters', []);