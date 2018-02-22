'use strict';

(function() {

  class RatingsComponent {
    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.Movie = [];
      this.Rate = [];
      this.Rated = [];
      this.Ratings = [];
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

          for (var i = 0; i < this.Movie.length; i++) {
            var name = this.Movie[i].MovieName;

            this.$http.get('/api/ratingsendpoints/search/' + this.Movie[i].MovieName)
              .then(response => {
                this.Ratings = response.data;
                this.socket.syncUpdates('ratingsendpoint', this.Ratings);

                var count = 0;
                var sum = 0;
                var avg = 0;
                if (this.Ratings.length > 0) {

                  for (var j = 0; j < this.Ratings.length; j++) {
                    sum = sum + this.Ratings[j].Rating;
                    count = count + 1;

                    name = this.Ratings[j].MovieName;
                  }
                } else {
                  count = 1;
                }

                avg = sum / count;
                this.Rate.push({name, avg});
                
              });
            console.log(this.Rate);
          }
        });
    }

    addRating(usr) {
      this.$http.post('/api/ratingsendpoints', {
        MovieName: this.Movie,
        Rating: this.RateNo,
        UserId: usr
      });
      this.Movie = '';
      this.RateNo = '';
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
