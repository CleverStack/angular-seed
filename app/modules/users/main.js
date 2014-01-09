require.config({
	baseUrl: window.__karma__ ? '/base/app/modules/users' : 'modules/users',
	packages: [
		{
			name: 'cs_common',
			location: '../cs_common'
		}
		],
	paths: {
		angular: '../../components/angular/angular'
	},
	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

define([
		'angular',
		'./module',
		'cs_common',

		// Controllers
		'scripts/users_controller'

	]);
