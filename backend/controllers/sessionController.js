const Session = require("../models/Session");
const Question = require("../models/Question");
const mongoose = require("mongoose");
const User = require("../models/User");
const { applyStreakForActivity } = require("../utils/streakTracker");

const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 50;
const MAX_EXPERIENCE = 50;

exports.createSession = async (req, res) => {
    const mongoSession = await mongoose.startSession();

    try {
        await mongoSession.withTransaction(async () => {
            const userId = req.user._id;
            const { role, company, experience, topicsToFocus, description } = req.body;
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
                        company,
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
            if (user) {
                applyStreakForActivity(user);
                await user.save({ session: mongoSession });
            }

            res.status(201).json({
                success: true,
                session: createdSession[0],
            });
        });
    } catch (err) {
        if (err.message === "SESSION_LIMIT_REACHED") {
            return res.status(400).json({
                success: false,
                message: `Maximum of ${MAX_SESSIONS} sessions reached.`,
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