'use strict';

(function() {

  class TheatresComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.Theatres = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('/api/theatresendpoints');
      });
    }

    $onInit() {
      this.MovieName = sessionStorage.getItem('MovieName');
      if(this.MovieName != 'null'){
        this.$http.get('/api/moviesintheatres/search/' + this.MovieName)
          .then(response => {
            this.Theatres = response.data;
            this.socket.syncUpdates('/api/moviesintheatres', this.Theatres);
          });
      } else {
        this.$http.get('/api/theatresendpoints')
          .then(response => {
            this.Theatres = response.data;
            this.socket.syncUpdates('/api/theatresendpoints', this.Theatres);
          });
        }
    }

    addTheatre() {
      this.$http.post('/api/theatresendpoints', {
        TheatreName: this.TheatreName,
        City: this.City
      });
      this.TheatreName = '';
      this.City = '';
      alert("Theatre has been successfully added.");
    }

    removeTheatre(id) {
      confirm("Are you sure you want to delete this theatre?");
      this.$http.delete('/api/theatresendpoints/' + id);
    }

    getSeating(x,n) {
      sessionStorage.setItem('Time', x);
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
