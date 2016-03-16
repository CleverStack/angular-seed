define(['angular', 'jquery', 'app'], function(ng, $) {
  'use strict';

  ng
  .module('app.controllers')
  .controller('HelpController', function($scope, $window, Helpers) {
    $scope.helpers = Helpers;
    $('#forum_embed').get(0).src = 'http://groups.google.com/forum/embed/?place=forum/clever-stack&showsearch=true&showpopout=true&hidesubject=false&hidetitle=false&parenturl=' + encodeURIComponent($window.location.origin) + '#!forum/clever-stack';
  });
});
