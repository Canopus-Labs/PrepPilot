import { describe, it, expect, vi, beforeEach } from 'vitest';
const LoginUser = require('./LoginUser');
const { ValidationError } = require('../../../shared/domain/BaseError');
const bcrypt = require('bcryptjs');

describe('LoginUser Use Case', () => {
    let userRepositoryMock;
    let tokenServiceMock;
    let loginUser;

    beforeEach(() => {
        userRepositoryMock = {
            findByEmail: vi.fn(),
            save: vi.fn(),
        };
        tokenServiceMock = {
            generateAccessToken: vi.fn().mockReturnValue('access-token'),
            generateRefreshToken: vi.fn().mockReturnValue('refresh-token'),
        };
        loginUser = new LoginUser(userRepositoryMock, tokenServiceMock);
    });

    it('should throw ValidationError if email or password missing', async () => {
        await expect(loginUser.execute({ email: 'a@b.com' })).rejects.toThrow(ValidationError);
        await expect(loginUser.execute({ password: 'pwd' })).rejects.toThrow(ValidationError);
    });

    it('should return invalid_credentials if user not found', async () => {
        userRepositoryMock.findByEmail.mockResolvedValue(null);
        const res = await loginUser.execute({ email: 'a@b.com', password: 'pwd' });
        expect(res).toEqual({ success: false, reason: 'invalid_credentials' });
    });

    it('should return invalid_credentials if password mismatch', async () => {
        userRepositoryMock.findByEmail.mockResolvedValue({ password: 'hashed' });
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);
        const res = await loginUser.execute({ email: 'a@b.com', password: 'pwd' });
        expect(res).toEqual({ success: false, reason: 'invalid_credentials' });
    });

    it('should return email_not_verified if not verified', async () => {
        userRepositoryMock.findByEmail.mockResolvedValue({ password: 'hashed', isEmailVerified: false });
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        const res = await loginUser.execute({ email: 'a@b.com', password: 'pwd' });
        expect(res).toEqual({ success: false, reason: 'email_not_verified' });
    });

    it('should return success and tokens if verified', async () => {
        const user = { id: '123', password: 'hashed', isEmailVerified: true, tokenVersion: 1 };
        userRepositoryMock.findByEmail.mockResolvedValue(user);
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        vi.spyOn(bcrypt, 'hash').mockResolvedValue('refresh-hash');
        
        const res = await loginUser.execute({ email: 'a@b.com', password: 'pwd' });
        expect(res.success).toBe(true);
        expect(res.accessToken).toBe('access-token');
        expect(res.refreshToken).toBe('refresh-token');
        expect(userRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({
            refreshTokenHash: 'refresh-hash'
        }));
    });
});
