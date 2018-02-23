'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/confirmation', {
        template: '<confirmation></confirmation>'
      });
  });
