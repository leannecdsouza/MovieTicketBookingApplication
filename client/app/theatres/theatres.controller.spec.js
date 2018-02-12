'use strict';

describe('Component: TheatresComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var TheatresComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheatresComponent = $componentController('theatres', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
