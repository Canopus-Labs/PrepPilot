const Session = require("../models/Session");
const Question = require("../models/Question");


const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 50;;


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
  try {
  const {role , experience , topicsToFocus , description , question }= req.body;
    const userId = req.user._id || req.user.id;

    // Count existing sessions for this user
    const sessionCount = await Session.countDocuments({
      user: userId,
    });

    // Check session limit
    if (sessionCount >= MAX_SESSIONS) {
      return res.status(403).json({
        success: false,
        message: `Session limit reached. You already have ${sessionCount} sessions. Please delete old sessions before creating new ones.`,
        currentCount: sessionCount,
        maxLimit: MAX_SESSIONS,
      });
    }

  const session = await Session.create({
    user : userId,
    role,
    experience,
    topicsToFocus,
    description
  });
    const questionDocs = await Promise.all(
        (question || []).map(async (q)=>{
            const questionDoc = await Question.create({
                session:session._id,
                question:q.question,
                answer:q.answer,
            });
            return questionDoc._id;
        })
    );

    session.questions=questionDocs;
    await session.save();
    res.status(201).json({success:true, session});
  } catch (error) {
    console.error("CreateSession error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
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
      const userId = req.user._id || req.user.id;
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
    try {
    const session = await Session.findById(req.params.id);

    if(!session){
        return res.status(404).json({message:"Session not found"});
        
    }
    
    const userId = req.user._id || req.user.id;

    // Check if logged-in user owns this session
    if(session.user.toString() !== userId.toString()){
        return res.status(401)
        .json({message:"Not authorized to delete this session"})
    }
    // First , delete all question linked to this session
    await Question.deleteMany({session : session._id});

    // then delete the session 
    await session.deleteOne();

    res.status(200).json({message:"Session delete sucessfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
