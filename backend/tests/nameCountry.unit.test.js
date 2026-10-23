import { describe, it, expect } from 'vitest';
const { isValidCountry } = require('../utils/nameCountry');

describe('isValidCountry', () => {
  it.each([
    'Antigua and Barbuda',
    'Congo',
    'Democratic Republic of the Congo',
  ])('accepts UN member state %s', (country) => {
    expect(isValidCountry(country)).toBe(true);
  });

  it('matches case-insensitively and ignores surrounding spaces', () => {
    expect(isValidCountry('  democratic republic of the congo ')).toBe(true);
  });

  it('still rejects names that are not countries', () => {
    expect(isValidCountry('Narnia')).toBe(false);
    expect(isValidCountry('12345')).toBe(false);
    expect(isValidCountry('')).toBe(false);
  });
});
