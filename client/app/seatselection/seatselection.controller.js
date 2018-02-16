'use strict';

(function() {

  class SeatselectionComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.Booking = [];
      var SeatsTaken = [];
      var SeatNo = [];
      var Amt = 0;

      $(document).ready(function() {
        $(".seat").click(function() {
          var seatid = $(this).attr("id");
          var p = SeatNo.indexOf(seatid);
          if (p == -1) {
            SeatNo.push(seatid);
            if ($(this).hasClass('gold')) {
              Amt = Amt + 500;
            } else {
              Amt = Amt + 300;
            }
          } else {
            SeatNo.splice(p, 1);
            if ($(this).hasClass('gold')) {
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
        socket.unsyncUpdates('seatbooking');
      });
    }

    $onInit() {
      this.MovieName = sessionStorage.getItem('MovieName');
      this.MovieTheatre = sessionStorage.getItem('Theatre');
      this.MovieDate = sessionStorage.getItem('Date');
      this.MovieTime = sessionStorage.getItem('Time');

      this.$http.get('/api/seatbookings/search/' + this.MovieName + '/' + this.MovieTheatre + '/' + this.MovieDate + '/' + this.MovieTime)
        .then(response => {
          this.Booking = response.data;
          this.socket.syncUpdates('seatbooking', this.Booking);

          var SeatsTaken = this.Booking[0].Seats;
          // alert(SeatsTaken);

          console.log(SeatsTaken);
          for (var i = 0; i < SeatsTaken.length; i++) {
            var s = SeatsTaken[i];
            $('#' + s).addClass('disabled');
          }
        });


    }

    checkOut() {
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
