describe('Test format to millis filter', function () {

  beforeEach(module('GRHI'));

  var formatToMillis;
  beforeEach(inject(function (formatToMillisFilter) {
    formatToMillis = formatToMillisFilter;
  }));

  it('convert the format to millis', () => {
    expect(formatToMillis("1h 00m")).toBe(3600000);
  });

  it('suport zeroes', () => {
    expect(formatToMillis("00001h 00000m")).toBe(3600000);
    expect(formatToMillis("00001h 00010m")).toBe(4200000);
  });

  it('is insenstive case', () => {
    expect(formatToMillis("1H 0m")).toBe(3600000);
    expect(formatToMillis("1h 10M")).toBe(4200000);
  });

  it('return undefined for invalid string', () => {
    expect(formatToMillis("000 00000m")).toBe(undefined);
  });

});