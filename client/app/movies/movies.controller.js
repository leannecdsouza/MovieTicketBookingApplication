'use strict';

(function() {

class MoviesComponent {

  constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.Movies = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
  }

  $onInit() {
    this.$http.get('/api/moviesendpoints').then(response => {
      this.Movies = response.data;
      this.socket.syncUpdates('moviesendpoint', this.Movies);
    });
  }

  removeMovie(id) {
    this.$http.delete('/api/moviesendpoints/' + id);
  }

  addMovie(MovieData) {
    this.$http.post('/api/moviesendpoints', {
      MovieName: MovieData.title,
      Genre: MovieData.genres,
      Duration: MovieData.runtime,
      Language: MovieData.original_language,
      Description: MovieData.overview,
      R_date: MovieData.release_date,
      Poster: MovieData.poster_path,
      Status: false

    });
    MovieData.title = '';
    MovieData.genre = '';
    MovieData.runtime = '';
    MovieData.original_language = '';
    MovieData.overview = '';
    MovieData.release_date = '';
    MovieData.poster_path = '';
    // alert('Record Saved Successfully');
  }

    searchMovie() {
      this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=bfd408cddb324d1f0530bf9a65129408&query=' + this.MovieName + '&year=' + this.Year)
      // this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=bfd408cddb324d1f0530bf9a65129408&query=' + this.MovieName)
      .then(response => {
          var MovieID = response.data.results[0].id;
          this.$http.get('https://api.themoviedb.org/3/movie/' + MovieID + '?api_key=bfd408cddb324d1f0530bf9a65129408')
          .then(response => {
              console.log(response.data);
              this.MovieData = response.data;
          });
      });
  }

}

angular.module('movieAppApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
