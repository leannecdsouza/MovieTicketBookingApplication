'use strict';

var app = require('../..');
import request from 'supertest';

var newRatingsendpoint;

describe('Ratingsendpoint API:', function() {

  describe('GET /api/ratingsendpoints', function() {
    var ratingsendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratingsendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingsendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ratingsendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/ratingsendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ratingsendpoints')
        .send({
          name: 'New Ratingsendpoint',
          info: 'This is the brand new ratingsendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRatingsendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created ratingsendpoint', function() {
      expect(newRatingsendpoint.name).to.equal('New Ratingsendpoint');
      expect(newRatingsendpoint.info).to.equal('This is the brand new ratingsendpoint!!!');
    });

  });

  describe('GET /api/ratingsendpoints/:id', function() {
    var ratingsendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratingsendpoints/' + newRatingsendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingsendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      ratingsendpoint = {};
    });

    it('should respond with the requested ratingsendpoint', function() {
      expect(ratingsendpoint.name).to.equal('New Ratingsendpoint');
      expect(ratingsendpoint.info).to.equal('This is the brand new ratingsendpoint!!!');
    });

  });

  describe('PUT /api/ratingsendpoints/:id', function() {
    var updatedRatingsendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/ratingsendpoints/' + newRatingsendpoint._id)
        .send({
          name: 'Updated Ratingsendpoint',
          info: 'This is the updated ratingsendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRatingsendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRatingsendpoint = {};
    });

    it('should respond with the updated ratingsendpoint', function() {
      expect(updatedRatingsendpoint.name).to.equal('Updated Ratingsendpoint');
      expect(updatedRatingsendpoint.info).to.equal('This is the updated ratingsendpoint!!!');
    });

  });

  describe('DELETE /api/ratingsendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ratingsendpoints/' + newRatingsendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ratingsendpoint does not exist', function(done) {
      request(app)
        .delete('/api/ratingsendpoints/' + newRatingsendpoint._id)
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
