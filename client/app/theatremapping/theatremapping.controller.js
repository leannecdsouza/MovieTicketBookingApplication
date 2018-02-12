'use strict';

(function() {

  class TheatremappingComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.Theatre = [];
      this.Movie = [];
      this.Map = [];
      this.Time = [];

      this.Hrs = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
      this.Min = ['00', '15', '30', '45'];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('/api/moviesintheatres');
      });
    }

    $onInit() {
      this.$http.get('/api/theatresendpoints')
        .then(response => {
          this.Theatre = response.data;
          this.socket.syncUpdates('/api/theatresendpoints', this.Theatre);
        });

      this.$http.get('/api/moviesendpoints')
        .then(response => {
          this.Movie = response.data;
          this.socket.syncUpdates('/api/moviesendpoints', this.Movie);
        });

      this.$http.get('/api/moviesintheatres')
        .then(response => {
          this.Map = response.data;
          this.socket.syncUpdates('/api/moviesintheatres', this.Map);
        });
    }

    addTime() {
      this.t = this.mapHrs + ':' + this.mapMin;
      this.Time.push(this.t);
    }

    addMapping() {
      var d = this.mapDate;
      alert(this.mapDate.toString());
      this.mapDate = d.toString().substring(0, 10);
      var name = this.mapMovie;

      this.$http.post('/api/moviesintheatres', {
        TheatreName: this.mapTheatre,
        MovieName: this.mapMovie,
        Dates: this.mapDate,
        Timings: this.Time
      });
      this.TheatreName = '';
      this.MovieName = '';
      this.mapDate = '';
      this.mapHrs = '';
      this.mapMin = '';

      this.$http.put('/api/moviesendpoints/status/' + name, {
        Status: 'True'
      });
      alert("Movie is now showing in theatres.");
    }

    removeMapping(id) {
      this.$http.delete('/api/moviesintheatres/' + id);
    }
  }

  angular.module('movieAppApp')
    .component('theatremapping', {
      templateUrl: 'app/theatremapping/theatremapping.html',
      controller: TheatremappingComponent,
      controllerAs: 'theatremappingCtrl'
    });

})();
