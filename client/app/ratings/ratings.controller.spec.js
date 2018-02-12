'use strict';

describe('Component: RatingsComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var RatingsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    RatingsComponent = $componentController('ratings', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
