import { describe, it, expect, vi, beforeEach } from 'vitest';
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginUser, refreshToken } = require('../controllers/authController');

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  return res;
}

function makeUser() {
  const user = new User();
  user.name = 'Jane';
  user.email = 'jane@example.com';
  user.tokenVersion = 0;
  user.isValidPassword = vi.fn().mockResolvedValue(true);
  user.save = vi.fn().mockResolvedValue(user);
  return user;
}

const issuedCookie = (res) => res.cookie.mock.calls[0][1];

beforeEach(() => {
  vi.restoreAllMocks();
  process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
});

describe('refresh token rotation', () => {
  it('rotates the token and rejects the old one (reuse detection)', async () => {
    const user = makeUser();
    vi.spyOn(User, 'findOne').mockResolvedValue(user);
    vi.spyOn(User, 'findById').mockResolvedValue(user);

    const loginRes = makeRes();
    await loginUser({ body: { email: 'jane@example.com', password: 'x' } }, loginRes);
    const oldToken = issuedCookie(loginRes);

    // Rotate once: the old token is now superseded.
    const rotateRes = makeRes();
    await refreshToken({ cookies: { refreshToken: oldToken } }, rotateRes);
    const newToken = issuedCookie(rotateRes);
    expect(newToken).not.toBe(oldToken);
    expect(rotateRes.status).not.toHaveBeenCalled();

    // Replaying the superseded token must fail.
    const replayRes = makeRes();
    await refreshToken({ cookies: { refreshToken: oldToken } }, replayRes);
    expect(replayRes.status).toHaveBeenCalledWith(401);
  });

  it('issues unique refresh tokens even within the same second', async () => {
    const user = makeUser();
    vi.spyOn(User, 'findOne').mockResolvedValue(user);
    const r1 = makeRes();
    const r2 = makeRes();
    await loginUser({ body: { email: 'jane@example.com', password: 'x' } }, r1);
    await loginUser({ body: { email: 'jane@example.com', password: 'x' } }, r2);
    expect(issuedCookie(r1)).not.toBe(issuedCookie(r2));
    expect(jwt.decode(issuedCookie(r1)).jti).toBeTruthy();
  });
});
