'use strict';

(function() {

  class SeatselectionComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.Booking = [];
      var SeatNo = [];
      var Amt = 0;

      $(document).ready(function() {
        $(".seat").click(function() {
          var seatid = $(this).attr("id");
          var p = SeatNo.indexOf(seatid);
          if (p == -1) {
            SeatNo.push(seatid);
            if($(this).hasClass('gold')){
              Amt = Amt + 500;
            } else {
              Amt = Amt + 300;
            }
          } else {
            SeatNo.splice(p, 1);
            if($(this).hasClass('gold')){
              Amt = Amt - 500;
            } else {
              Amt = Amt - 300;
            }
          }
          $("#seatselected").text(SeatNo);
          $("#totalAmt").text('Rs. ' + Amt);
          $(this).toggleClass("sselected");
          this.SeatNo = SeatNo;
        });
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('/api/seatbookings');
      });
    }

    $onInit() {
      this.MovieName = sessionStorage.getItem('MovieName');
      this.$http.get('/api/moviesintheatres')
        .then(response => {
          this.Booking = response.data;
          this.socket.syncUpdates('/api/seatbookings', this.Booking);
        });

      var SeatsTaken = this.Booking.Seats;
      // for (var i = 0; i < SeatsTaken.length; i++) {
      //   var s = this.Booking.Seats[i];
      //   document.getElementbyId(s).setClass("disabled");
      // }
      this.MovieName = sessionStorage.getItem('MovieName');
      this.MovieTheatre = sessionStorage.getItem('Theatre');
      this.MovieTime = sessionStorage.getItem('Time');
    }

    checkOut(){
      var amt = document.getElementById("totalAmt").innerHTML;
      sessionStorage.setItem('Amount', amt);

      var a = document.getElementById("seatselected").innerHTML;
      this.SeatNo = a.split(",");
      sessionStorage.setItem('Seats', this.SeatNo);
      
      location.href = "/payments";
    }
  }

  angular.module('movieAppApp')
    .component('seatselection', {
      templateUrl: 'app/seatselection/seatselection.html',
      controller: SeatselectionComponent,
      controllerAs: 'seatselectionCtrl'
    });

})();
