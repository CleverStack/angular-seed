'use strict';

describe('Directive: stringToNumber', function () {
  beforeEach(angular.mock.module('app'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<string-to-number></string-to-number>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the stringToNumber directive');
  }));
});
