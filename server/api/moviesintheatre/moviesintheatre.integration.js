'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviesintheatre;

describe('Moviesintheatre API:', function() {

  describe('GET /api/moviesintheatres', function() {
    var moviesintheatres;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesintheatres')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesintheatres = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviesintheatres).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviesintheatres', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviesintheatres')
        .send({
          name: 'New Moviesintheatre',
          info: 'This is the brand new moviesintheatre!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviesintheatre = res.body;
          done();
        });
    });

    it('should respond with the newly created moviesintheatre', function() {
      expect(newMoviesintheatre.name).to.equal('New Moviesintheatre');
      expect(newMoviesintheatre.info).to.equal('This is the brand new moviesintheatre!!!');
    });

  });

  describe('GET /api/moviesintheatres/:id', function() {
    var moviesintheatre;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesintheatres/' + newMoviesintheatre._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesintheatre = res.body;
          done();
        });
    });

    afterEach(function() {
      moviesintheatre = {};
    });

    it('should respond with the requested moviesintheatre', function() {
      expect(moviesintheatre.name).to.equal('New Moviesintheatre');
      expect(moviesintheatre.info).to.equal('This is the brand new moviesintheatre!!!');
    });

  });

  describe('PUT /api/moviesintheatres/:id', function() {
    var updatedMoviesintheatre;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviesintheatres/' + newMoviesintheatre._id)
        .send({
          name: 'Updated Moviesintheatre',
          info: 'This is the updated moviesintheatre!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviesintheatre = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviesintheatre = {};
    });

    it('should respond with the updated moviesintheatre', function() {
      expect(updatedMoviesintheatre.name).to.equal('Updated Moviesintheatre');
      expect(updatedMoviesintheatre.info).to.equal('This is the updated moviesintheatre!!!');
    });

  });

  describe('DELETE /api/moviesintheatres/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviesintheatres/' + newMoviesintheatre._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviesintheatre does not exist', function(done) {
      request(app)
        .delete('/api/moviesintheatres/' + newMoviesintheatre._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
