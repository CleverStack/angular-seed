define(['angular', 'module'], function(ng) {
	'use strict';

	ng.module('cs_account.services')
	.service('CSAccountService', [
			'$http',
		function($http) {

			return {

				register: function(credentials) {
					return $http.post('/user', credentials)
					.then(function(response) {
						return response.data;
					});
				}

			};

		}

		]);

});
