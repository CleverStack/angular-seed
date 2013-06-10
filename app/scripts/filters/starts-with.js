'use strict';

var filters = angular.module('app.filters');

filters.filter('startsWith', function() {
  return function(str, letter, prop){
    letter = letter || undefined;
    if(!letter){
      return str;
    }
    var filtered = [];
    str.forEach(function (i) {
      if((new RegExp('^['+letter.toLowerCase()+letter.toUpperCase()+']')).test(i[prop])) {
        filtered.push(i);
      }
    });
    return filtered;
  };
});