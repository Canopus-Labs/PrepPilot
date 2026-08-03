import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Module Mocks ─────────────────────────────────────────────────────────────

vi.mock("../models/User.js", () => ({
  findById: vi.fn(),
  findByIdAndDelete: vi.fn(),
}));

vi.mock("../models/Session.js", () => ({
  find: vi.fn(),
  deleteMany: vi.fn(),
}));

vi.mock("../models/Question.js", () => ({
  deleteMany: vi.fn(),
}));

vi.mock("../models/Flashcard.js", () => ({
  deleteMany: vi.fn(),
}));

vi.mock("../models/Resume.js", () => ({
  deleteMany: vi.fn(),
}));

vi.mock("../models/NotesSummary.js", () => ({
  deleteMany: vi.fn(),
}));

vi.mock("../models/RoadmapProject.js", () => ({
  deleteMany: vi.fn(),
}));

vi.mock("../models/UserSheetProgress.js", () => ({
  deleteMany: vi.fn(),
}));

// ─── Test Variables ───────────────────────────────────────────────────────────

let deleteUserAccount;
let User;
let Session;
let Question;
let Flashcard;
let Resume;
let NotesSummary;
let RoadmapProject;
let UserSheetProgress;

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();

  process.env.JWT_SECRET = "test-secret";
  process.env.NODE_ENV = "test";

  const ctrl = await import("../controllers/authController.js");
  deleteUserAccount = ctrl.deleteUserAccount ?? ctrl.default?.deleteUserAccount;

  const UserModule = await import("../models/User.js");
  User = UserModule.default ?? UserModule;

  const SessionModule = await import("../models/Session.js");
  Session = SessionModule.default ?? SessionModule;

  const QuestionModule = await import("../models/Question.js");
  Question = QuestionModule.default ?? QuestionModule;

  const FlashcardModule = await import("../models/Flashcard.js");
  Flashcard = FlashcardModule.default ?? FlashcardModule;

  const ResumeModule = await import("../models/Resume.js");
  Resume = ResumeModule.default ?? ResumeModule;

  const NotesSummaryModule = await import("../models/NotesSummary.js");
  NotesSummary = NotesSummaryModule.default ?? NotesSummaryModule;

  const RoadmapProjectModule = await import("../models/RoadmapProject.js");
  RoadmapProject = RoadmapProjectModule.default ?? RoadmapProjectModule;

  const UserSheetProgressModule = await import("../models/UserSheetProgress.js");
  UserSheetProgress = UserSheetProgressModule.default ?? UserSheetProgressModule;
});

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Build a minimal Express-style res mock with chainable .status() */
const makeRes = () => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
    clearCookie: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
};

// ─────────────────────────────────────────────────────────────────────────────
// deleteUserAccount
// ─────────────────────────────────────────────────────────────────────────────

describe("deleteUserAccount", () => {
  it("returns 404 when user is not found", async () => {
    User.findById.mockResolvedValueOnce(null);

    const req = { user: { _id: "non-existent-user-id" } };
    const res = makeRes();

    await deleteUserAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "User not found",
      })
    );
  });

  it("deletes user and all associated data when account is deleted", async () => {
    const userId = "user-to-delete-id";
    const mockUser = {
      _id: userId,
      name: "Test User",
      email: "test@example.com",
    };

    User.findById.mockResolvedValueOnce(mockUser);
    User.findByIdAndDelete.mockResolvedValueOnce(mockUser);

    // Mock sessions with questions
    const mockSessions = [
      { _id: "session-1" },
      { _id: "session-2" },
    ];
    Session.find.mockResolvedValueOnce(mockSessions);
    Session.deleteMany.mockResolvedValueOnce({ deletedCount: 2 });
    Question.deleteMany.mockResolvedValueOnce({ deletedCount: 5 });

    // Mock other collections
    Flashcard.deleteMany.mockResolvedValueOnce({ deletedCount: 3 });
    Resume.deleteMany.mockResolvedValueOnce({ deletedCount: 2 });
    NotesSummary.deleteMany.mockResolvedValueOnce({ deletedCount: 1 });
    RoadmapProject.deleteMany.mockResolvedValueOnce({ deletedCount: 4 });
    UserSheetProgress.deleteMany.mockResolvedValueOnce({ deletedCount: 6 });

    const req = { user: { _id: userId } };
    const res = makeRes();

    await deleteUserAccount(req, res);

    // Verify cascade deletions were called
    expect(Session.find).toHaveBeenCalledWith({ user: userId });
    expect(Question.deleteMany).toHaveBeenCalledWith({
      session: { $in: ["session-1", "session-2"] },
    });
    expect(Session.deleteMany).toHaveBeenCalledWith({ user: userId });
    expect(Flashcard.deleteMany).toHaveBeenCalledWith({ userId: userId });
    expect(Resume.deleteMany).toHaveBeenCalledWith({ user: userId });
    expect(NotesSummary.deleteMany).toHaveBeenCalledWith({ user: userId });
    expect(RoadmapProject.deleteMany).toHaveBeenCalledWith({ userId: userId });
    expect(UserSheetProgress.deleteMany).toHaveBeenCalledWith({ userId: userId });

    // Verify user account deletion
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);

    // Verify cookie clearing
    expect(res.clearCookie).toHaveBeenCalledWith(
      "refreshToken",
      expect.objectContaining({
        httpOnly: true,
        path: "/api/auth",
      })
    );

    // Verify success response
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Account and all associated data deleted successfully",
      })
    );
  });

  it("handles deletion when user has no associated data", async () => {
    const userId = "user-with-no-data-id";
    const mockUser = {
      _id: userId,
      name: "New User",
      email: "new@example.com",
    };

    User.findById.mockResolvedValueOnce(mockUser);
    User.findByIdAndDelete.mockResolvedValueOnce(mockUser);

    // User has no sessions
    Session.find.mockResolvedValueOnce([]);
    // No other data exists
    Flashcard.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    Resume.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    NotesSummary.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    RoadmapProject.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    UserSheetProgress.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });

    const req = { user: { _id: userId } };
    const res = makeRes();

    await deleteUserAccount(req, res);

    // Verify user account was still deleted
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);

    // Verify success response
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Account and all associated data deleted successfully",
      })
    );
  });

  it("returns 500 when database error occurs during deletion", async () => {
    const userId = "user-id";
    const mockUser = {
      _id: userId,
      name: "Test User",
      email: "test@example.com",
    };

    User.findById.mockResolvedValueOnce(mockUser);
    User.findByIdAndDelete.mockRejectedValueOnce(new Error("Database connection lost"));

    // Mock cascade deletions
    Session.find.mockResolvedValueOnce([]);
    Flashcard.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    Resume.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    NotesSummary.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    RoadmapProject.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });
    UserSheetProgress.deleteMany.mockResolvedValueOnce({ deletedCount: 0 });

    const req = { user: { _id: userId } };
    const res = makeRes();

    await deleteUserAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error occurred",
      })
    );
  });
});
