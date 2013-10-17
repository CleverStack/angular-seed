define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_session.controllers')
  .controller('CSLogout', [
    'CSAuth',
    function (CSAuth) {
      CSAuth.logout();

    }
  ]);

});
