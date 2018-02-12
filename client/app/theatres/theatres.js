'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatres', {
        template: '<theatres></theatres>'
      });
  });
