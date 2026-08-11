import { describe, it, expect, vi, beforeEach } from 'vitest';
const RegisterUser = require('./RegisterUser');
const { ValidationError } = require('../../../shared/domain/BaseError');

describe('RegisterUser Use Case', () => {
    let userRepositoryMock;
    let emailServiceMock;
    let registerUser;

    beforeEach(() => {
        userRepositoryMock = {
            findByEmail: vi.fn(),
            save: vi.fn(),
        };
        emailServiceMock = {
            sendVerificationEmail: vi.fn(),
        };
        registerUser = new RegisterUser(userRepositoryMock, emailServiceMock);
    });

    it('should throw ValidationError if email is invalid', async () => {
        const req = { name: 'John', email: 'invalid-email', password: 'pwd', frontendUrl: 'http://test' };
        await expect(registerUser.execute(req)).rejects.toThrow(ValidationError);
    });

    it('should handle existing user without revealing it (alreadyRegistered: true)', async () => {
        userRepositoryMock.findByEmail.mockResolvedValue({ isEmailVerified: true });
        const req = { name: 'John', email: 'john@example.com', password: 'pwd', frontendUrl: 'http://test' };
        
        const result = await registerUser.execute(req);
        
        expect(result.alreadyRegistered).toBe(true);
        expect(userRepositoryMock.save).not.toHaveBeenCalled();
    });

    it('should resend verification if existing user is unverified', async () => {
        const existingUser = { email: 'john@example.com', isEmailVerified: false };
        userRepositoryMock.findByEmail.mockResolvedValue(existingUser);
        userRepositoryMock.save.mockResolvedValue(existingUser);
        const req = { name: 'John', email: 'john@example.com', password: 'pwd', frontendUrl: 'http://test' };
        
        const result = await registerUser.execute(req);
        
        expect(result.alreadyRegistered).toBe(true);
        expect(userRepositoryMock.save).toHaveBeenCalled();
        expect(emailServiceMock.sendVerificationEmail).toHaveBeenCalled();
    });

    it('should create new user and send email (alreadyRegistered: false)', async () => {
        userRepositoryMock.findByEmail.mockResolvedValue(null);
        userRepositoryMock.save.mockResolvedValue();
        const req = { name: 'John', email: 'john@example.com', password: 'pwd', frontendUrl: 'http://test' };
        
        const result = await registerUser.execute(req);
        
        expect(result.alreadyRegistered).toBe(false);
        expect(userRepositoryMock.save).toHaveBeenCalled();
        expect(emailServiceMock.sendVerificationEmail).toHaveBeenCalled();
    });
});
