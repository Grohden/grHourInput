describe('Format converter,', function () {

  beforeEach(module('GRHI'));

  var floatToHourFormat;
  beforeEach(inject(function (floatToHourFormatFilter) {
    floatToHourFormat = floatToHourFormatFilter;
  }));

  it('correct float conversion', function () {
    expect(floatToHourFormat(1.5)).toBe('1h 30m');
  });

  it('support for comma', function () {
    expect(floatToHourFormat("1,5")).toBe('1h 30m');
  });

  it('preserve format', function () {
    expect(floatToHourFormat("1h 50m")).toBe('1h 50m');
  });

  it('return zero for negative float', function () {
    expect(floatToHourFormat(-1.45)).toBe('0h 0m');
  });

  it('preserve value if invalid', function () {
    expect(floatToHourFormat("a145")).toBe('a145');
  });

  it('supports custom hours convertions', function () {
    expect(floatToHourFormat(1.5, {
      customHours: {"1h 30m": "hello word!"} 
    })).toBe('hello word!');
  });

});