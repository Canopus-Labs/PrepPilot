const Session = require("../models/Session");
const Question = require("../models/Question");
const User = require("../models/User");
const mongoose = require("mongoose");
const { getInterviewStreakUpdate } = require("../utils/interviewStreak");

const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 50;
const MAX_EXPERIENCE = 50;

/**
 * Create a new practice session and associated questions.
 * @route POST /api/sessions/create
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When required fields are missing or user exceeds session limits.
 * @example
 * POST /api/sessions/create
 * Authorization: Bearer eyJhb...
 * {
 *   "role": "Backend Engineer",
 *   "experience": "3 years",
 *   "topicsToFocus": ["Node.js","Databases"],
 *   "description": "Prepare for backend interview",
 *   "question": [{"question":"Explain ACID properties","answer":"..."}]
 * }
 * @example
 * 201 {"success": true, "session": {"_id":"...","role":"Backend Engineer",...}}
 */

exports.createSession = async (req, res) => {
    const mongoSession = await mongoose.startSession();

    try {
        await mongoSession.withTransaction(async () => {
            const userId = req.user._id;
            const { role, experience, topicsToFocus, description } = req.body;
            const experienceNumber = Number(experience);
 
            if (!role || role.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Role is required.",
                });
            }

            if (Number.isNaN(experienceNumber)) {
              return res.status(400).json({
                    success: false,
                    message: "Years of experience must be a valid number.",
           });
         }

          if (experienceNumber < 0 || experienceNumber > MAX_EXPERIENCE) {
             return res.status(400).json({
                   success: false,
                   message: `Years of experience must be between 0 and ${MAX_EXPERIENCE}.`,
             });
            }
            const sessionCount = await Session.countDocuments({
                user: userId,
            }).session(mongoSession);

            if (sessionCount >= MAX_SESSIONS) {
                throw new Error("SESSION_LIMIT_REACHED");
            }

            const createdSession = await Session.create(
                [
                    {
                        user: userId,
                        role,
                        experience,
                        topicsToFocus,
                        description,
                    },
                ],
                {
                    session: mongoSession,
                }
            );
            const createdQuestions = await Question.insertMany(
  (req.body.question || []).map((q) => ({
    session: createdSession[0]._id,
    question: q.question,
    answer: q.answer,
  })),
  { session: mongoSession }
);
createdSession[0].questions = createdQuestions.map((q) => q._id);

await createdSession[0].save({
  session: mongoSession,
});

            const user = await User.findById(userId).session(mongoSession);
            if (!user) {
                throw new Error("USER_NOT_FOUND");
            }

            const practiceDate = new Date().toISOString().split("T")[0];
            const streakUpdate = getInterviewStreakUpdate(
                {
                    interviewStreak: Number(user.interviewStreak || 0),
                    longestInterviewStreak: Number(user.longestInterviewStreak || 0),
                    interviewStreakBadges: Array.isArray(user.interviewStreakBadges) ? user.interviewStreakBadges : [],
                    interviewStreakLastPracticeDate: user.interviewStreakLastPracticeDate,
                },
                practiceDate
            );

            if (streakUpdate.changed) {
                user.interviewStreak = Math.max(0, streakUpdate.streak);
                user.longestInterviewStreak = Math.max(0, streakUpdate.longestStreak);
                user.interviewStreakBadges = streakUpdate.badges;
                user.interviewStreakLastPracticeDate = practiceDate;
                await user.save({ session: mongoSession });
            }

            res.status(201).json({
                success: true,
                session: createdSession[0],
                streakSummary: {
                    current: user.interviewStreak,
                    longest: user.longestInterviewStreak,
                    badges: user.interviewStreakBadges,
                },
            });
        });
    } catch (err) {
        if (err.message === "SESSION_LIMIT_REACHED") {
            return res.status(400).json({
                success: false,
                message: `Maximum of ${MAX_SESSIONS} sessions reached.`,
            });
        }

        if (err.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        console.error("Create session error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error occurred",
        });
    } finally {
        await mongoSession.endSession();
    }
};

/**
 * Get all sessions for the authenticated user.
 * @route GET /api/sessions/my-sessions
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When fetch fails.
 * @example
 * GET /api/sessions/my-sessions
 * Authorization: Bearer eyJhb...
 * @example
 * 200 [{"_id":"...","role":"...","questions":[...]}]
 */
exports.getMySessions = async (req, res) => {
    try {
      const userId = req.user._id;
      const session = await Session.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("questions");
      res.status(200).json(session);
    } catch (error) {
      console.error("Error in getMySessions:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
};

/**
 * Get a specific session by ID with populated questions.
 * @route GET /api/sessions/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When session is not found.
 * @example
 * GET /api/sessions/6426c5a5...
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"success": true, "session": {"_id":"...","questions":[...]}}
 */
exports.getSessionById = async (req, res) => {
    try {
  const session = await Session.findById(req.params.id)
  .populate({
    path: "questions",
    options: { sort: { isPinned: -1, createdAt: 1 } },
  })
  .exec();
    if(!session){
        return res
        .status(404)
        .json({success:false , message:"Session not found"});
    }
    if (session.user.toString() !== req.user._id.toString()) {
        return res
        .status(403)
        .json({ success: false, message: "Unauthorized access to this session" });
    }
    res.status(200).json({ success:true , session })
  } catch (error) {
    console.error("Error in getSessionById:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Delete a session and all linked questions for the authenticated user.
 * @route DELETE /api/sessions/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When session is missing or not owned by user.
 * @example
 * DELETE /api/sessions/6426c5a5...
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"message":"Session delete sucessfully"}
 */

exports.deleteSession = async (req, res) => {
    const transaction = await mongoose.startSession();
    try {
        await transaction.withTransaction(async () => {
            const { id } = req.params;
            const userId = req.user._id;

          const session = await Session.findOne({
              _id: id,
              user: userId,
          }).session(transaction);

            if (!session) {
                throw new Error("SESSION_NOT_FOUND");
            }

            await Question.deleteMany(
                { session: session._id },
                { session: transaction }
            );

            await Session.deleteOne(
                { _id: session._id },
                { session: transaction }
            );
        });

        return res.json({
            success: true,
            message: "Session deleted successfully.",
        });
    } catch (err) {
        if (err.message === "SESSION_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Session not found.",
            });
        }

        console.error("Delete session error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error occurred",
        });
    } finally {
        await transaction.endSession();
    }
};
