const Session = require("../models/Session");
const Question = require("../models/Question");
const mongoose = require("mongoose");


const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 50;;
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
            const experience = Number(req.body.experience);
 
            if (isNaN(experience)) {
              return res.status(400).json({
                    success: false,
                    message: "Years of experience must be a valid number.",
           });
         }

          if (experience < 0 || experience > MAX_EXPERIENCE) {
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
                        ...req.body,
                    },
                ],
                {
                    session: mongoSession,
                }
            );

            res.status(201).json({
                success: true,
                session: createdSession[0],
            });
        });
    } catch (err) {
        if (err.message === "SESSION_LIMIT_REACHED") {
            return res.status(400).json({
                success: false,
                error: `Maximum of ${MAX_SESSIONS} sessions reached.`,
            });
        }

        return res.status(500).json({
            success: false,
            error: err.message,
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
                error: "Session not found.",
            });
        }

        return res.status(500).json({
            success: false,
            error: err.message,
        });
    } finally {
        await transaction.endSession();
    }
};
