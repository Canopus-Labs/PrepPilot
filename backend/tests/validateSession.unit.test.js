const { describe, it, expect, vi, beforeEach } = require('vitest');

const { validateCreateSession, validateGetSessionById, validateDeleteSession } = require('../Input_validators/ValidateSession');

beforeEach(() => {
  vi.restoreAllMocks();
});

function makeReq(body, params) {
  return { body: body || {}, params: params || {} };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('ValidateSession middleware', () => {
  describe('validateCreateSession', () => {
    it('passes with valid session body', () => {
      const req = makeReq({
        role: 'Backend Engineer',
        experience: '3 years',
        topicsToFocus: ['Node.js', 'Databases'],
      });
      const res = makeRes();
      const next = vi.fn();

      validateCreateSession(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('rejects missing role', () => {
      const req = makeReq({ experience: '2 years', topicsToFocus: ['Python'] });
      const res = makeRes();
      const next = vi.fn();
      validateCreateSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    it('rejects missing experience', () => {
      const req = makeReq({ role: 'Data Scientist', topicsToFocus: ['ML'] });
      const res = makeRes();
      const next = vi.fn();
      validateCreateSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    it('rejects empty topicsToFocus', () => {
      const req = makeReq({ role: 'DevOps', experience: '4', topicsToFocus: [] });
      const res = makeRes();
      const next = vi.fn();
      validateCreateSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    it('rejects experience exceeding max length', () => {
      const req = makeReq({ role: 'QA', experience: 'a'.repeat(101), topicsToFocus: ['Testing'] });
      const res = makeRes();
      const next = vi.fn();
      validateCreateSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateGetSessionById', () => {
    it('passes with a valid ObjectId', () => {
      const req = makeReq({}, { id: '507f1f77bcf86cd799439011' });
      const res = makeRes();
      const next = vi.fn();
      validateGetSessionById(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('rejects an invalid ObjectId', () => {
      const req = makeReq({}, { id: 'not-a-valid-id' });
      const res = makeRes();
      const next = vi.fn();
      validateGetSessionById(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    it('rejects an empty id', () => {
      const req = makeReq({}, { id: '' });
      const res = makeRes();
      const next = vi.fn();
      validateGetSessionById(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateDeleteSession', () => {
    it('passes with a valid ObjectId', () => {
      const req = makeReq({}, { id: '507f1f77bcf86cd799439012' });
      const res = makeRes();
      const next = vi.fn();
      validateDeleteSession(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('rejects an invalid ObjectId', () => {
      const req = makeReq({}, { id: 'bad-id' });
      const res = makeRes();
      const next = vi.fn();
      validateDeleteSession(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
