import { getMinutes, convertToLocalDateString } from '../time';

describe('getMinutes time helper', () => {
  it('returns 0.0 when passed 0', () => {
    expect(getMinutes(0)).toEqual('0.0');
  });

  it('returns 1.30 when passed 90', () => {
    expect(getMinutes(90)).toEqual('1.30');
  });

  it('returns 5.45 when passed 345', () => {
    expect(getMinutes(345)).toEqual('5.45');
  });
});

describe('convertToLocalDateString time helper', () => {
  it('returns the correct date when passed a valid ISO string', () => {
    const dateString = '2024-02-02T00:00:00.000Z';
    expect(convertToLocalDateString(dateString)).toEqual('02/02/2024');
  });

  it('returns "Invalid Date" when passed an invalid date string', () => {
    const dateString = 'not a date';
    expect(convertToLocalDateString(dateString)).toEqual('Invalid Date');
  });
});
