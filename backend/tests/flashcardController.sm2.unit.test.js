import { describe, it, expect } from 'vitest';

const { calculateSM2 } = require('../controllers/flashcardController');

describe('calculateSM2 rating mapping (issue #1627)', () => {
  it('maps again/1 -> quality 1 and resets repetition', () => {
    const result = calculateSM2({ interval: 30, repetition: 5, efactor: 2.5 }, 'again');
    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
  });

  it('maps hard/2 -> quality 2 (failure branch, repetition not incremented)', () => {
    const result = calculateSM2({ interval: 30, repetition: 5, efactor: 2.5 }, 'hard');
    expect(result.repetition).toBe(5);
    expect(result.repetition).not.toBe(6);
  });

  it('maps medium/3 -> quality 3 (success branch)', () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, 'medium');
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
  });

  it('maps good/4 -> quality 4 (success branch)', () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, 'good');
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(2);
  });

  it('maps easy/5 -> quality 5 (success branch)', () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, 'easy');
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(2);
  });

  it('maps numeric ratings onto the same scale as words', () => {
    const byNumber3 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, '3');
    const byNumber4 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, '4');
    expect(byNumber3.repetition).toBe(1);
    expect(byNumber4.repetition).toBe(1);
    expect(byNumber3.interval).toBe(1); // medium
    expect(byNumber4.interval).toBe(2); // good
  });

  it('does not treat medium and good identically at repetition 1', () => {
    const medium = calculateSM2({ interval: 1, repetition: 1, efactor: 2.5 }, 'medium');
    const good = calculateSM2({ interval: 1, repetition: 1, efactor: 2.5 }, 'good');
    expect(medium.interval).toBe(3);
    expect(good.interval).toBe(6);
    expect(medium.interval).toBeLessThan(good.interval);
  });

  it('schedules medium shorter than good at higher repetitions', () => {
    const medium = calculateSM2({ interval: 10, repetition: 2, efactor: 2.5 }, 'medium');
    const good = calculateSM2({ interval: 10, repetition: 2, efactor: 2.5 }, 'good');
    expect(medium.interval).toBeLessThan(good.interval);
  });

  it('keeps the pass/fail boundary at score >= 3', () => {
    const fail = calculateSM2({ interval: 10, repetition: 2, efactor: 2.5 }, 'hard');
    const pass = calculateSM2({ interval: 10, repetition: 2, efactor: 2.5 }, 'medium');
    expect(fail.repetition).toBe(2); // not incremented
    expect(pass.repetition).toBe(3); // incremented
  });
});
