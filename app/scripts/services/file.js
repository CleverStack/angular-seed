'use strict';

var services = angular.module('app.services');

services
  .factory('FileService', ['$http','httpOptions',function ($http, httpOptions) {
    var file = {};

    file.upload = function (file, resource) {
      return $http.post(httpOptions.domain+'/'+resource+'/upload', file);
    };

    return file;
  }]);