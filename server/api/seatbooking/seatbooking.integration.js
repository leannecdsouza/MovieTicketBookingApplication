'use strict';

var app = require('../..');
import request from 'supertest';

var newSeatbooking;

describe('Seatbooking API:', function() {

  describe('GET /api/seatbookings', function() {
    var seatbookings;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbookings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seatbookings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seatbookings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seatbookings')
        .send({
          name: 'New Seatbooking',
          info: 'This is the brand new seatbooking!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeatbooking = res.body;
          done();
        });
    });

    it('should respond with the newly created seatbooking', function() {
      expect(newSeatbooking.name).to.equal('New Seatbooking');
      expect(newSeatbooking.info).to.equal('This is the brand new seatbooking!!!');
    });

  });

  describe('GET /api/seatbookings/:id', function() {
    var seatbooking;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatbookings/' + newSeatbooking._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatbooking = res.body;
          done();
        });
    });

    afterEach(function() {
      seatbooking = {};
    });

    it('should respond with the requested seatbooking', function() {
      expect(seatbooking.name).to.equal('New Seatbooking');
      expect(seatbooking.info).to.equal('This is the brand new seatbooking!!!');
    });

  });

  describe('PUT /api/seatbookings/:id', function() {
    var updatedSeatbooking;

    beforeEach(function(done) {
      request(app)
        .put('/api/seatbookings/' + newSeatbooking._id)
        .send({
          name: 'Updated Seatbooking',
          info: 'This is the updated seatbooking!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeatbooking = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeatbooking = {};
    });

    it('should respond with the updated seatbooking', function() {
      expect(updatedSeatbooking.name).to.equal('Updated Seatbooking');
      expect(updatedSeatbooking.info).to.equal('This is the updated seatbooking!!!');
    });

  });

  describe('DELETE /api/seatbookings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seatbookings/' + newSeatbooking._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seatbooking does not exist', function(done) {
      request(app)
        .delete('/api/seatbookings/' + newSeatbooking._id)
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
