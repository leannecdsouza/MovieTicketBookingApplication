'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ratingsendpointCtrlStub = {
  index: 'ratingsendpointCtrl.index',
  show: 'ratingsendpointCtrl.show',
  create: 'ratingsendpointCtrl.create',
  update: 'ratingsendpointCtrl.update',
  destroy: 'ratingsendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ratingsendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ratingsendpoint.controller': ratingsendpointCtrlStub
});

describe('Ratingsendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(ratingsendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/ratingsendpoints', function() {

    it('should route to ratingsendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ratingsendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/ratingsendpoints/:id', function() {

    it('should route to ratingsendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ratingsendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/ratingsendpoints', function() {

    it('should route to ratingsendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ratingsendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/ratingsendpoints/:id', function() {

    it('should route to ratingsendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ratingsendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ratingsendpoints/:id', function() {

    it('should route to ratingsendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ratingsendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ratingsendpoints/:id', function() {

    it('should route to ratingsendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ratingsendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
