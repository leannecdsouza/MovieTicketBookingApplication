'use strict';

describe('Component: SeatselectionComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var SeatselectionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SeatselectionComponent = $componentController('seatselection', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
