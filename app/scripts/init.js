window.ngSeed = angular.module('ngSeed',
  [ 'ngSeed.directives',
    'ngSeed.services',
    'ngSeed.filters',
    'http-auth-interceptor',
    'ngResource'
  ]);

window.ngSeed.services = angular.module('ngSeed.services',
  [ 'http-auth-interceptor',
    'ngResource'
  ]);

window.ngSeed.directives = angular.module('ngSeed.directives',
  [ 'http-auth-interceptor'
  ]);

window.ngSeed.filters = angular.module('ngSeed.filters', []);

window.app = angular.module('app', 
  [ 'ngSeed'
  ]);