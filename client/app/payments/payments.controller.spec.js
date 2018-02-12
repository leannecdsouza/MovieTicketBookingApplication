'use strict';

describe('Component: PaymentsComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var PaymentsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PaymentsComponent = $componentController('payments', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
