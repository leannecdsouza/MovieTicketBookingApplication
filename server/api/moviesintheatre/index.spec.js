'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviesintheatreCtrlStub = {
  index: 'moviesintheatreCtrl.index',
  show: 'moviesintheatreCtrl.show',
  create: 'moviesintheatreCtrl.create',
  update: 'moviesintheatreCtrl.update',
  destroy: 'moviesintheatreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviesintheatreIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviesintheatre.controller': moviesintheatreCtrlStub
});

describe('Moviesintheatre API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviesintheatreIndex).to.equal(routerStub);
  });

  describe('GET /api/moviesintheatres', function() {

    it('should route to moviesintheatre.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviesintheatreCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviesintheatres/:id', function() {

    it('should route to moviesintheatre.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviesintheatreCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviesintheatres', function() {

    it('should route to moviesintheatre.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviesintheatreCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviesintheatres/:id', function() {

    it('should route to moviesintheatre.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviesintheatreCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviesintheatres/:id', function() {

    it('should route to moviesintheatre.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviesintheatreCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviesintheatres/:id', function() {

    it('should route to moviesintheatre.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviesintheatreCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
