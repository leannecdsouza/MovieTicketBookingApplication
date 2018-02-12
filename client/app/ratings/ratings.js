'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ratings', {
        template: '<ratings></ratings>'
        // authenticate: 'user'
      });
  });
