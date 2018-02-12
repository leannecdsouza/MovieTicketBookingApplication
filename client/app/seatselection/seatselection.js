'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seatselection', {
        template: '<seatselection></seatselection>'
      });
  });
