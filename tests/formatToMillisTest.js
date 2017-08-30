describe('Test format to millis filter', function () {

  beforeEach(module('GRHI'));

  var formatToMillis;
  beforeEach(inject(function (formatToMillisFilter) {
    formatToMillis = formatToMillisFilter;
  }));

  it('convert the format to millis', function () {
    expect(formatToMillis("1h 00m")).toBe(3600000);
  });

  it('suport zeroes', function () {
    expect(formatToMillis("00001h 00000m")).toBe(3600000);
  });

});