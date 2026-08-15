import { describe, it, expect, vi, beforeEach } from 'vitest';
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/authController');

beforeEach(() => {
  vi.restoreAllMocks();
  process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
});

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  return res;
}

describe('Auth Password Hashing & Login Integration', () => {
  it('hashes raw registration password exactly once via pre-save hook and passes isValidPassword', async () => {
    const rawPassword = 'Password123!';

    const userDoc = new User();
    userDoc.name = 'Jane Doe';
    userDoc.email = 'jane@example.com';
    userDoc.password = rawPassword;

    vi.spyOn(userDoc, 'isModified').mockReturnValue(true);

    // Find the password hashing pre-save hook registered on UserSchema
    const saveHooks = User.schema.s.hooks._pres.get('save') || [];
    const pwHook = saveHooks.find(h => h.fn.toString().includes('password'))?.fn;
    expect(pwHook).toBeDefined();

    await pwHook.call(userDoc);

    // 1. Password must be hashed exactly once (bcrypt format)
    expect(userDoc.password).not.toBe(rawPassword);
    expect(userDoc.password).toMatch(/^\$2[aby]\$\d+\$/);

    // 2. Raw password must match the hashed password via isValidPassword
    const isMatch = await userDoc.isValidPassword(rawPassword);
    expect(isMatch).toBe(true);

    // 3. Incorrect password must fail isValidPassword
    const isWrongMatch = await userDoc.isValidPassword('WrongPassword123!');
    expect(isWrongMatch).toBe(false);
  });

  it('registerUser passes raw password to User.create and returns 201', async () => {
    vi.spyOn(User, 'findOne').mockResolvedValue(null);

    let createdUserData = null;
    vi.spyOn(User, 'create').mockImplementation(async (data) => {
      createdUserData = data;
      return {
        _id: '507f1f77bcf86cd799439011',
        ...data,
      };
    });

    const req = {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123!',
      },
    };
    const res = makeRes();

    await registerUser(req, res);

    expect(createdUserData).not.toBeNull();
    // Raw password is passed to User.create so pre("save") hook handles single hashing
    expect(createdUserData.password).toBe('Password123!');
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('loginUser succeeds for a verified user with correct password', async () => {
    const rawPassword = 'Password123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const mockUser = new User({
      _id: '507f1f77bcf86cd799439011',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: hashedPassword,
      isEmailVerified: true,
      tokenVersion: 0,
    });
    mockUser.save = vi.fn().mockResolvedValue(true);

    vi.spyOn(User, 'findOne').mockResolvedValue(mockUser);

    const req = {
      body: {
        email: 'jane@example.com',
        password: rawPassword,
      },
    };
    const res = makeRes();

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        accessToken: expect.any(String),
      })
    );
  });
});
