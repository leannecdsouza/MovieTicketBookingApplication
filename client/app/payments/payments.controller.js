'use strict';

(function() {

  class PaymentsComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.moviess = [];
      this.passOn = [];
      this.Seats = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('seatbooking');
      });
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

      this.$http.get('/api/seatbookings')
        .then(response => {
          this.Booking = response.data;
          this.socket.syncUpdates('seatbooking', this.Booking);
        });
    }

    bookTickets() {
      var a = sessionStorage.getItem('Seats');
      this.Seats = a.split(",");
      console.log("anything1");

      this.$http.post('/api/seatbookings', {
        Movie: sessionStorage.getItem('MovieName'),
        Theatre: sessionStorage.getItem('Theatre'),
        ShowDate: sessionStorage.getItem('Date'),
        ShowTime: sessionStorage.getItem('Time'),
        Seats: this.Seats,
        Amount: sessionStorage.getItem('Amount'),
        UserName: this.MoviePerson,
        UserEmail: this.MovieEmail,
        UserCardNumber: this.MovieCard
      });

      console.log("anything2");
      this.MoviePerson = '';
      this.Seats = '';
      this.MovieEmail = '';
      this.MovieCard = '';
      location.href = "/";

    }
  }

  angular.module('movieAppApp')
    .component('payments', {
      templateUrl: 'app/payments/payments.html',
      controller: PaymentsComponent,
      controllerAs: 'paymentsCtrl'
    });

})();
