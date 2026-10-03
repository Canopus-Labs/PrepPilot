import { describe, it, expect, vi, beforeEach } from 'vitest';
const csrfTokenCheck = require('../middlewares/csrfHeaderCheck');
const { issueCsrfToken, tokensMatch } = require('../middlewares/csrfHeaderCheck');

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('issueCsrfToken', () => {
  it('sets an httpOnly csrfToken cookie and returns the same token in the body', () => {
    const res = makeRes();
    issueCsrfToken({ cookies: {} }, res);

    const [name, value, options] = res.cookie.mock.calls[0];
    expect(name).toBe('csrfToken');
    expect(value).toMatch(/^[a-f0-9]{64}$/);
    expect(options.httpOnly).toBe(true);
    expect(options.path).toBe('/api/auth');
    expect(res.json).toHaveBeenCalledWith({ success: true, csrfToken: value });
  });

  it('reuses a valid existing cookie value so concurrent tabs keep working', () => {
    const existing = 'a'.repeat(64);
    const res = makeRes();
    issueCsrfToken({ cookies: { csrfToken: existing } }, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, csrfToken: existing });
  });

  it('replaces a malformed cookie value with a fresh token', () => {
    const res = makeRes();
    issueCsrfToken({ cookies: { csrfToken: 'not-a-token' } }, res);
    expect(res.json.mock.calls[0][0].csrfToken).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe('csrfTokenCheck', () => {
  const token = 'b'.repeat(64);

  it('allows a request whose header matches the cookie (full issue -> verify round trip)', () => {
    const issueRes = makeRes();
    issueCsrfToken({ cookies: {} }, issueRes);
    const issued = issueRes.json.mock.calls[0][0].csrfToken;

    const next = vi.fn();
    const res = makeRes();
    csrfTokenCheck(
      { cookies: { csrfToken: issued }, headers: { 'x-csrf-token': issued } },
      res,
      next,
    );
    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it.each([
    ['no cookie and no header', {}, {}],
    ['cookie but no header', { csrfToken: token }, {}],
    ['header but no cookie', {}, { 'x-csrf-token': token }],
    ['mismatched values', { csrfToken: token }, { 'x-csrf-token': 'c'.repeat(64) }],
    ['different lengths', { csrfToken: token }, { 'x-csrf-token': 'b' }],
    ['empty cookie and header', { csrfToken: '' }, { 'x-csrf-token': '' }],
  ])('rejects %s with 403', (_label, cookies, headers) => {
    const next = vi.fn();
    const res = makeRes();
    csrfTokenCheck({ cookies, headers }, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects the old X-Requested-With-only request the frontend used to send', () => {
    const next = vi.fn();
    const res = makeRes();
    csrfTokenCheck({ cookies: {}, headers: { 'x-requested-with': 'XMLHttpRequest' } }, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
  });
});

describe('tokensMatch', () => {
  it('never matches empty or non-string values', () => {
    expect(tokensMatch('', '')).toBe(false);
    expect(tokensMatch(undefined, undefined)).toBe(false);
    expect(tokensMatch('abc', undefined)).toBe(false);
    expect(tokensMatch('abc', 'abc')).toBe(true);
  });
});
