'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatbookingCtrlStub = {
  index: 'seatbookingCtrl.index',
  show: 'seatbookingCtrl.show',
  create: 'seatbookingCtrl.create',
  update: 'seatbookingCtrl.update',
  destroy: 'seatbookingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatbookingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seatbooking.controller': seatbookingCtrlStub
});

describe('Seatbooking API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatbookingIndex).to.equal(routerStub);
  });

  describe('GET /api/seatbookings', function() {

    it('should route to seatbooking.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatbookingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seatbookings/:id', function() {

    it('should route to seatbooking.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatbookingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seatbookings', function() {

    it('should route to seatbooking.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatbookingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seatbookings/:id', function() {

    it('should route to seatbooking.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatbookingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seatbookings/:id', function() {

    it('should route to seatbooking.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatbookingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seatbookings/:id', function() {

    it('should route to seatbooking.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatbookingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
