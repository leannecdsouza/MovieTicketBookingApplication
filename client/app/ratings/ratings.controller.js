'use strict';

(function(){

class RatingsComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.Rating = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('/api/ratingsendpoints');
    });
  }

  $onInit() {
    this.$http.get('/api/ratingsendpoints').then(response => {
      this.Rating = response.data;
      this.socket.syncUpdates('/api/ratingsendpoints', this.Rating);
    });
  }

  addRating() {
    this.$http.post('/api/ratingsendpoints', {
      MovieId : this.MovieId ,
      MovieName: this.MovieName,
      Rating: this.Rating,
      UserId : this.UserId
    });
    this.MovieId = '';
    this.MovieName = '';
    this.Rating = '';
    this.UserId = '';
    alert("Movie has been rated.");
  }

}

angular.module('movieAppApp')
  .component('ratings', {
    templateUrl: 'app/ratings/ratings.html',
    controller: RatingsComponent,
    controllerAs: 'ratingsCtrl'
  });

})();
