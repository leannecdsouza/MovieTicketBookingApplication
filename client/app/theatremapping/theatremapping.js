'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatremapping', {
        template: '<theatremapping></theatremapping>',
        // authenticate: 'admin'
      });
  });
