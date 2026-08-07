import { describe, it, expect, vi } from 'vitest';

process.env.GOOGLE_CLIENT_ID = 'client-id';
process.env.GOOGLE_CLIENT_SECRET = 'client-secret';
process.env.GOOGLE_REDIRECT_URI = 'http://localhost:8000/api/google-calendar/callback';

const {
  connectGoogleCalendar,
  getGoogleCalendarStatus,
  syncGoogleCalendarEvent,
} = await import('../controllers/googleCalendarController.js');

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.redirect = vi.fn().mockReturnValue(res);
  return res;
}

function makeReq(body = {}, user = { _id: 'user-123' }) {
  return { body, user };
}

describe('google calendar controller', () => {
  it('returns an auth URL for a connected user', async () => {
    const res = makeRes();
    await connectGoogleCalendar(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, authUrl: expect.any(String) }));
  });

  it('rejects sync requests that are missing required event details', async () => {
    const res = makeRes();
    await syncGoogleCalendarEvent(makeReq({ title: 'Mock Interview' }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });

  it('returns status for the current user', async () => {
    const res = makeRes();
    await getGoogleCalendarStatus(makeReq({}, { _id: 'user-123', googleCalendarConnected: true, googleCalendarEmail: 'test@example.com' }), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, connected: true }));
  });
});
