'use strict';

(function(){

class ConfirmationComponent {
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.isAdmin = Auth.isAdmin;
  }

  $onInit() {
    this.MovieName = sessionStorage.getItem('MovieName');
    this.MoviePoster = sessionStorage.getItem('MoviePoster');
    this.MovieDesc = sessionStorage.getItem('MovieDesc');
    this.MovieTheatre = sessionStorage.getItem('Theatre');
    this.MovieDate = sessionStorage.getItem('Date');
    this.MovieTime = sessionStorage.getItem('Time');
    this.MovieSeats = sessionStorage.getItem('Seats');
    this.MovieAmt = sessionStorage.getItem('Amount');
  }
}

angular.module('movieAppApp')
  .component('confirmation', {
    templateUrl: 'app/confirmation/confirmation.html',
    controller: ConfirmationComponent,
    controllerAs: 'confirmationCtrl'
  });

})();
