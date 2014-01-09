// console.log(window.__karma__);
require.config({
	baseUrl: window.__karma__ ? '/base/app/modules/cs_common' : 'modules/cs_common',
	paths: {
		angular: '../../components/angular/angular',
		async: '../../components/async/lib/async',
		jquery: '../../components/jquery/jquery',
		underscore: '../../components/underscore/underscore',
		ngCookies: '../../../components/angular-cookies/angular-cookies',
		ngResource: '../../components/angular-resource/angular-resource',
		ngRoute: '../../components/angular-route/angular-route',
		ngSanitize: '../../components/angular-sanitize/angular-sanitize',
		'http-auth-interceptor': '../../components/angular-http-auth/src/http-auth-interceptor'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		ngCookies: {
			deps: ['angular']
		},
		ngResource: {
			deps: ['angular']
		},
		ngRoute: {
			deps: ['angular']
		},
		ngSanitize: {
			deps: ['angular']
		},
		'http-auth-interceptor': {
			deps: ['angular']
		}
	}
});

define([
		// 'angular',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',

		'./module',

		// // Providers
		'scripts/cs_common_helpers_provider',
		'scripts/cs_template_provider',
		'scripts/cs_http_options_provider',

		'http-auth-interceptor',

		// // Directives
		'scripts/string_to_number',
		'scripts/must_equal_to',

		// Filters
		'scripts/starts_with',

		// Services
		'scripts/cs_browser_detect',
		'scripts/cs_resource_factory'

	]);
