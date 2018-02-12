'use strict';

(function(){

class PaymentsComponent {
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.isAdmin = Auth.isAdmin;
    this.moviess = [];
    this.passOn = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('/api/seatbookings');
    });
  }

  $onInit() {
    this.MovieName = sessionStorage.getItem('MovieName');
    this.MoviePoster = sessionStorage.getItem('MoviePoster');
    this.MovieDesc = sessionStorage.getItem('MovieDesc');
    this.MovieTheatre = sessionStorage.getItem('Theatre');
    this.MovieTime = sessionStorage.getItem('Time');
    this.MovieSeats = sessionStorage.getItem('Seats');
    this.MovieAmt = sessionStorage.getItem('Amount');

    this.$http.get('/api/seatbookings')
      .then(response => {
        this.Booking = response.data;
        this.socket.syncUpdates('/api/seatbookings', this.Booking);
      });
    }
}

angular.module('movieAppApp')
  .component('payments', {
    templateUrl: 'app/payments/payments.html',
    controller: PaymentsComponent,
    controllerAs: 'paymentsCtrl'
  });

})();
