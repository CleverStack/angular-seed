define(['angular', '../module'], function(ng) {
	'use strict';

	ng.module('users.controllers')
	.controller('UsersController', [
			'$scope',
		function($scope) {
			$scope.welcome = 'This is a private area.';
		}

		]);
});
