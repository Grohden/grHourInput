describe('Test format conversions', function () {

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

  it('sums wrong minutes values', function () {
    expect(floatToHourFormat("1h 90m")).toBe('2h 30m');
  });
});