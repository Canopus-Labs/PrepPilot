// Optimized implementation (1 DB roundtrip)
const pastSessions = await Session.find({
  user: req.user._id,
  role,
  topicsToFocus,
})
  .select("questions")
  .populate({
    path: "questions",
    select: "question",
  })
  .lean();

const seenQuestions = pastSessions.flatMap((session) =>
  (session.questions || []).map((q) => q.question).filter(Boolean)
);