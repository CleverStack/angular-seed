require.config({
    paths: {
        angular: '../components/angular-unstable/angular',
        async: '../components/async/lib/async',
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        ngResource: '../components/angular-resource-unstable/angular-resource',
        'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor'
    },
    shim: {
        app: {
            deps: [
                'angular',
                'ngResource',
                'http-auth-interceptor'
            ]
        },

        angular: {
            exports: 'angular'
        },

        'http-auth-interceptor': {
            deps: ['angular']
        },

        ngResource: {
            deps: ['angular']
        },

        underscore: {
            exports: '_'
        },


        // Controllers
        controllers: {
            deps: [
                'controllers/home',
                'controllers/login',
                'controllers/users'
            ]
        },

        // Directives
        directives: {
            deps: [
                'directives/string-to-number'
            ]
        },

        // Filters
        filters: {
            deps: [
                // 'filters/starts-with'
            ]
        },

        // Services
        services: {
            deps: [
                'services/debug',
                'services/http-options',
                'services/auth',
                'services/user',
                // 'services/browser-detect',
                // 'services/generic'
            ]
        }
    }
});

require([
    'angular',
    'app',
    'services',
    'controllers',
    'directives',
    'filters',
    'config',
    'routes'
], function (angular) {
    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
});
