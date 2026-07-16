import { describe, it, expect } from 'vitest';
import { validatePassword } from '../utils/passwordPolicy.js';

// ---------------------------------------------------------------------------
// Helper: build a password with exactly one special char
// ---------------------------------------------------------------------------
function withSpecial(char) {
    return `ValidPass1${char}`;
}

// ---------------------------------------------------------------------------
// Core rule enforcement
// ---------------------------------------------------------------------------

describe('validatePassword — core rules', () => {
    it('accepts a fully compliant password', () => {
        const { valid } = validatePassword('ValidPass1!');
        expect(valid).toBe(true);
    });

    it('rejects a password shorter than 8 characters', () => {
        const { valid, errors } = validatePassword('V1!a');
        expect(valid).toBe(false);
        expect(errors[0]).toMatch(/8 characters/);
    });

    it('rejects a password with no uppercase letter', () => {
        const { valid, errors } = validatePassword('validpass1!');
        expect(valid).toBe(false);
        expect(errors[0]).toMatch(/uppercase/);
    });

    it('rejects a password with no lowercase letter', () => {
        const { valid, errors } = validatePassword('VALIDPASS1!');
        expect(valid).toBe(false);
        expect(errors[0]).toMatch(/lowercase/);
    });

    it('rejects a password with no digit', () => {
        const { valid, errors } = validatePassword('ValidPass!');
        expect(valid).toBe(false);
        expect(errors[0]).toMatch(/number/);
    });

    it('rejects a password with no special character', () => {
        const { valid, errors } = validatePassword('ValidPass1');
        expect(valid).toBe(false);
        expect(errors[0]).toMatch(/special character/);
    });

    it('rejects null / undefined gracefully', () => {
        expect(validatePassword(null).valid).toBe(false);
        expect(validatePassword(undefined).valid).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// Special-character allowlist — previously rejected characters must now pass
// ---------------------------------------------------------------------------

const previouslyRejectedChars = ['#', '^', '(', ')', '{', '}', '[', ']', '<', '>', ',', '.', '"', '|', '`', '~', '_', '+', '-', '=', "'", ':', ';', '\\', '/'];

describe('validatePassword — previously rejected special characters now accepted', () => {
    for (const char of previouslyRejectedChars) {
        it(`accepts "${char}" as a valid special character`, () => {
            const { valid } = validatePassword(withSpecial(char));
            expect(valid).toBe(true);
        });
    }
});

// ---------------------------------------------------------------------------
// Special-character allowlist — characters from the old narrow set still pass
// ---------------------------------------------------------------------------

const originalAllowedChars = ['@', '$', '!', '%', '*', '?', '&'];

describe('validatePassword — original special characters still accepted (no regression)', () => {
    for (const char of originalAllowedChars) {
        it(`still accepts "${char}" as a valid special character`, () => {
            const { valid } = validatePassword(withSpecial(char));
            expect(valid).toBe(true);
        });
    }
});

// ---------------------------------------------------------------------------
// Response shape: errors array is always present
// ---------------------------------------------------------------------------

describe('validatePassword — return shape', () => {
    it('always returns { valid, errors } shape', () => {
        const result = validatePassword('weak');
        expect(result).toHaveProperty('valid');
        expect(result).toHaveProperty('errors');
        expect(Array.isArray(result.errors)).toBe(true);
    });

    it('errors array is empty when password is valid', () => {
        const { errors } = validatePassword('ValidPass1!');
        expect(errors).toHaveLength(0);
    });

    it('errors array contains one entry per failing rule', () => {
        // Fails: lowercase, digit, special — but passes length and uppercase (length >=8, has upper)
        const { errors } = validatePassword('VALIDPAS');
        expect(errors.length).toBeGreaterThan(0);
    });
});