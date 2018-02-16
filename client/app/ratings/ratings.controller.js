'use strict';

(function() {

    class RatingsComponent {
      constructor($http, $scope, socket, Auth) {
        this.$http = $http;
        this.socket = socket;
        this.Movie = [];
        this.Rated = [];
        this.Rating = [];
        this.isAdmin = Auth.isAdmin;
        this.isLoggedIn = Auth.isLoggedIn;
        this.getCurrentUser = Auth.getCurrentUser;

        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('ratingsendpoint');
        });
      }

      $onInit() {

        this.$http.get('/api/moviesendpoints')
          .then(response => {
            this.Movie = response.data;
            this.socket.syncUpdates('moviesendpoint', this.Movie);
          });
        this.$http.get('/api/ratingsendpoints')
          .then(response => {
            this.Rated = response.data;
            console.log(this.Rated);
            this.socket.syncUpdates('ratingsendpoint', this.Rated);
        });
            // for (var i = 1; i < this.Movie.length; i++) {
            //   var avg = 0; var sum = 0; var count = 0;
            //
            //   this.$http.get('/api/ratingsendpoints/search/' + this.Movie[i].MovieName)
            //     .then(response => {
            //       this.Rating = response.data;
            //       this.socket.syncUpdates('ratingsendpoint', this.Rating);
            //
            //       if (this.Rating.length > 0) {
            //         sum = sum + this.Rating.Rating;
            //         count = +count + 1;
            //       } else {
            //         count = 1;
            //       }
            //
            //     });
            //
            //   name = this.Movie[i].MovieName;
            //   avg = +sum / +count;
            //
            //   this.Rated.push({name, avg});
            //   console.log(this.Rated);
            // }

          }

        addRating(usr) {
          this.$http.post('/api/ratingsendpoints', {
            MovieName: this.Movie,
            Rating: this.Rating,
            UserId: usr
          });
          this.Movie = '';
          this.Rating = '';
          usr = '';
        }

      }
    

      angular.module('movieAppApp')
        .component('ratings', {
          templateUrl: 'app/ratings/ratings.html',
          controller: RatingsComponent,
          controllerAs: 'ratingsCtrl'
        });

    })();
