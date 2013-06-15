'use strict';

var filters = angular.module('app.filters');

/**
 * Filter a collection by checking if a property starts with a
 * symbol.
 * @return {Collection} The filtered collection.
 */
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