'use strict';

(function() {

  class TheatresComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.Theatres = [];
      this.ThisWeek = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('theatresendpoint');
      });
    }

    $onInit() {
      var tday = new Date();
      this.DatePicked = tday.toString().substr(0,10);

      this.MovieName = sessionStorage.getItem('MovieName');
      this.$http.get('/api/moviesintheatres/search/' + this.MovieName)
      .then(response => {
        this.Theatresm = response.data;
        this.socket.syncUpdates('moviesintheatres', this.Theatresm);
      });
      this.$http.get('/api/theatresendpoints')
      .then(response => {
        this.Theatres = response.data;
        this.socket.syncUpdates('theatresendpoint', this.Theatres);
      });

      var d = new Date();
      this.ThisWeek[0] = d.toString().substr(0,10);
      
      for(var a = 1; a < 7; a++){
        d.setDate(d.getDate() + 1);
        this.ThisWeek[a] = d.toString().substr(0,10);
      }
    }

    addTheatre() {
      this.$http.post('/api/theatresendpoints', {
        TheatreName: this.TheatreName,
        City: this.City
      });
      this.TheatreName = '';
      this.City = '';
    }

    removeTheatre(id) {
      confirm("Are you sure you want to delete this theatre?");
      this.$http.delete('/api/theatresendpoints/' + id);
    }

    getSeating(x,n) {
      sessionStorage.setItem('Time', x);
      sessionStorage.setItem('Date', this.DatePicked);
      sessionStorage.setItem('Theatre', n);
      location.href = "/seatselection";
    }

  }

  angular.module('movieAppApp')
    .component('theatres', {
      templateUrl: 'app/theatres/theatres.html',
      controller: TheatresComponent,
      controllerAs: 'theatresCtrl'
    });

})();
