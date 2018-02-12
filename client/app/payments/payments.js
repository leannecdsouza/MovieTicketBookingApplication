'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/payments', {
        template: '<payments></payments>'
      });
  });
