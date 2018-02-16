'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isAdmin = Auth.isAdmin;
      this.moviess = [];
      this.passOn = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }

    $onInit() {
      this.$http.get('/api/moviesendpoints/')
        .then(response => {
          this.moviess = response.data;
          this.socket.syncUpdates('moviesendpoints', this.moviess);
        });
    }

    getMovie(id) {
      this.$http.get('/api/moviesendpoints/' + id)
        .then(response => {
          this.movie = response.data;
          sessionStorage.setItem('MovieName', this.movie.MovieName);
          sessionStorage.setItem('MoviePoster', this.movie.Poster);
          sessionStorage.setItem('MovieDesc', this.movie.Description);
          sessionStorage.setItem('MovieID', id);

          this.socket.syncUpdates('moviesendpoints', this.movie);
          document.getElementById('title').innerHTML = this.movie.MovieName;
          document.getElementById('pos').src = 'https://image.tmdb.org/t/p/w500/' + this.movie.Poster;
          document.getElementById('desc').innerHTML = this.movie.Description;
          document.getElementById('dur').innerHTML = this.movie.Duration;
          $("#id").attr('value', this.movie._id);
          $("#genre").empty();
          for (var i = 0; i < this.movie.Genre.length; i++) {
            var n = '<div class="label label-warning">' + this.movie.Genre[i].name + '</div>&nbsp;';
            $('#genre').append(n);
          }
        });
      $('#myModal').modal();

    }

    movieDone() {
      location.href = "/theatres";
    }
  }

  angular.module('movieAppApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
