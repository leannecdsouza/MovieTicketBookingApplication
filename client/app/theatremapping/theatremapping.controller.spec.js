'use strict';

describe('Component: TheatremappingComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var TheatremappingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TheatremappingComponent = $componentController('theatremapping', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
